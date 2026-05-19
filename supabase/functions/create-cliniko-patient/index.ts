import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CLINIKO_API_KEY = Deno.env.get('CLINIKO_API_KEY')!
const CLINIKO_SHARD = Deno.env.get('CLINIKO_SHARD') ?? 'au1'
const CLINIKO_BASE = `https://api.${CLINIKO_SHARD}.cliniko.com/v1`
const CLINIKO_AUTH = btoa(`${CLINIKO_API_KEY}:`)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const cliniko = async (path: string, method: string, body?: object) => {
  const res = await fetch(`${CLINIKO_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${CLINIKO_AUTH}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Meora (hello@meora.me)',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Cliniko ${method} ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const assessment = await req.json()

  // 1. Save to Supabase first
  const { data: saved, error: dbError } = await supabase
    .from('patient_assessments')
    .insert(assessment)
    .select()
    .single()

  if (dbError) {
    return new Response(JSON.stringify({ error: dbError.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // 2. Create Cliniko patient
  let clinikoPatientId: string | null = null
  let syncError: string | null = null

  try {
    const patient = await cliniko('/patients', 'POST', {
      first_name: assessment.first_name,
      last_name: assessment.last_name,
      email: assessment.email,
      phone_numbers: [{ number: assessment.mobile, phone_type: 'Mobile' }],
      state: assessment.state,
      country_code: 'AU',
      accepted_privacy_policy: true,
      notes: [
        `Goals: ${(assessment.goals ?? []).join(', ')}`,
        `Protocols: ${(assessment.protocols ?? []).join(', ') || 'Not specified'}`,
        `Prior experience: ${assessment.prior_experience || 'None'}`,
        `Prior compounds: ${assessment.prior_compounds || 'None listed'}`,
        `Specific peptides: ${(assessment.specific_peptides ?? []).join(', ') || 'Not specified'}`,
        `Medications: ${assessment.medications || 'None listed'}`,
        `Sleep: ${assessment.sleep_score}/10 | Injection comfort: ${assessment.injection_comfort}`,
        `Referral source: ${assessment.referral_source}${assessment.referral_other ? ` (${assessment.referral_other})` : ''}`,
      ].join('\n'),
    })

    clinikoPatientId = patient.id

    await supabase
      .from('patient_assessments')
      .update({
        cliniko_patient_id: clinikoPatientId,
        cliniko_synced_at: new Date().toISOString(),
      })
      .eq('id', saved.id)
  } catch (err) {
    syncError = err instanceof Error ? err.message : String(err)
    await supabase
      .from('patient_assessments')
      .update({ cliniko_sync_error: syncError })
      .eq('id', saved.id)
  }

  return new Response(
    JSON.stringify({
      assessment_id: saved.id,
      cliniko_patient_id: clinikoPatientId,
      sync_error: syncError,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  )
})
