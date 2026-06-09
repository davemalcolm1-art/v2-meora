import { useEffect, useState, ReactNode } from "react";

import { useQuiz } from "./quizContext";
import { supabase } from "@/integrations/supabase/client";

type SubmitState = "idle" | "loading" | "success" | "error";

type QuizModalProps = {
  open: boolean;
  onClose: () => void;
};

const GOALS = ["Energy", "Performance", "Balance", "Recovery", "Longevity", "Beauty"];

const PRIOR_OPTIONS = [
  "No — this would be my first time",
  "Yes — I've used peptides before",
  "Yes — I'm currently on TRT or HRT",
  "Yes — I've used GLP-1 medications (Ozempic, Mounjaro, Wegovy)",
];

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", "Prefer not to say"];

const MEDICAL_FLAGS = [
  "Active or recent cancer diagnosis (last 5 years)",
  "Pregnancy or breastfeeding",
  "Severe or unstable cardiac condition",
  "Active kidney or liver disease",
  "Diagnosed pituitary disorder or tumour",
];
const NONE_FLAG = "None of the above";

const REFERRAL_OPTIONS = [
  "Instagram or social media",
  "Google search",
  "Friend or family referral",
  "A health or fitness professional",
  "Podcast or YouTube",
  "News article or editorial",
  "Other",
];

const TOTAL_STEPS = 6;


const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: "var(--text-dim)",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontFamily: "'DM Mono', monospace",
  marginBottom: 12,
};

const subCopy: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-dimmer)",
  fontFamily: "'DM Mono', monospace",
  marginBottom: 12,
};

const divider: React.CSSProperties = {
  height: 1,
  background: "rgba(245,240,232,0.1)",
  margin: "24px 0",
};

const fieldLabel: React.CSSProperties = {
  fontSize: 13,
  color: "var(--cream)",
  marginBottom: 6,
  display: "block",
};

const helperText: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-dim)",
  lineHeight: 1.5,
  margin: "0 0 12px",
};

const subLabel: React.CSSProperties = {
  fontSize: 11,
  color: "var(--text-dim)",
  marginTop: 6,
  fontFamily: "'DM Mono', monospace",
};

type Tile = { value: string; label: ReactNode };

const CheckTile = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    className={`quiz-option ${selected ? "selected" : ""}`}
    onClick={onClick}
  >
    <div className="quiz-option-checkbox">{selected ? "✓" : ""}</div>
    <span style={{ textAlign: "left" }}>{children}</span>
  </button>
);

const QuizModal = ({ open, onClose }: QuizModalProps) => {
  const { selectedProtocol } = useQuiz();
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showStop, setShowStop] = useState(false);

  const [goals, setGoals] = useState<string[]>([]);
  const [priorExperience, setPriorExperience] = useState("");
  const [priorCompounds, setPriorCompounds] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [stateField, setStateField] = useState("");
  const [medicalFlags, setMedicalFlags] = useState<string[]>([]);
  const [medications, setMedications] = useState("");
  const [noMedications, setNoMedications] = useState(false);
  const [sleepScore, setSleepScore] = useState(5);
  const [sleepTouched, setSleepTouched] = useState(false);
  const [injectionComfort, setInjectionComfort] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [referralOther, setReferralOther] = useState("");
  const [consent, setConsent] = useState(false);

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState<string>("");

  const handleSubmit = async () => {
    if (submitState === "loading") return;
    setSubmitState("loading");
    setSubmitError("");

    const payload = {
      goals,
      prior_experience: priorExperience,
      prior_compounds: priorCompounds,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      state: stateField,
      medical_flags: medicalFlags,
      medications: noMedications ? "" : medications.trim(),
      sleep_score: sleepScore,
      injection_comfort: injectionComfort,
      referral_source: referralSource,
      referral_other: referralOther,
      consent,
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-cliniko-patient",
        { body: payload }
      );
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSubmitState("success");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitState("error");
    }
  };

  useEffect(() => {
    if (open) {
      setStep(0);
      setShowResult(false);
      setShowStop(false);
      setGoals(
        selectedProtocol && GOALS.includes(selectedProtocol) ? [selectedProtocol] : []
      );
      setPriorExperience("");
      setPriorCompounds("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setStateField("");
      setMedicalFlags([]);
      setMedications("");
      setNoMedications(false);
      setSleepScore(5);
      setSleepTouched(false);
      setInjectionComfort("");
      setReferralSource("");
    setReferralOther("");
      setConsent(false);
      setSubmitState("idle");
      setSubmitError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open, selectedProtocol]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggleArr = (
    arr: string[],
    setArr: (v: string[]) => void,
    val: string
  ) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const togglePeptide = (val: string) => {
    if (val === PEPTIDE_GUIDE) {
      setSpecificPeptides(specificPeptides.includes(val) ? [] : [val]);
    } else {
      const without = specificPeptides.filter((v) => v !== PEPTIDE_GUIDE);
      setSpecificPeptides(
        without.includes(val) ? without.filter((v) => v !== val) : [...without, val]
      );
    }
  };

  const toggleMedicalFlag = (val: string) => {
    if (val === NONE_FLAG) {
      setMedicalFlags(medicalFlags.includes(val) ? [] : [val]);
    } else {
      const without = medicalFlags.filter((v) => v !== NONE_FLAG);
      setMedicalFlags(
        without.includes(val) ? without.filter((v) => v !== val) : [...without, val]
      );
    }
  };

  const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const isYes = priorExperience.startsWith("Yes");

  const canProceed = (() => {
    if (step === 0) return goals.length >= 1;
    if (step === 1) return true;
    if (step === 2) return firstName.trim() && lastName.trim() && validEmail(email);
    if (step === 3) return medicalFlags.length >= 1;
    if (step === 4)
      return (
        (noMedications || medications.trim()) &&
        injectionComfort &&
        referralSource
      );
    if (step === 5) return consent;
    return false;
  })();

  const handleNext = () => {
    if (step === 3) {
      const hasFlag = medicalFlags.some((f) => f !== NONE_FLAG);
      if (hasFlag) {
        setShowStop(true);
        return;
      }
    }
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else setShowResult(true);
  };

  const isLast = step === TOTAL_STEPS - 1;

  const renderGoalList = () => {
    if (goals.length === 0) return null;
    return goals.map((g, i) => {
      const sep =
        i === 0
          ? ""
          : i === goals.length - 1
          ? goals.length === 2
            ? " and "
            : ", and "
          : ", ";
      return (
        <span key={g}>
          {sep}
          <span style={{ color: "var(--cream)" }}>{g}</span>
        </span>
      );
    });
  };

  return (
    <div
      className={`quiz-overlay ${open ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quiz-modal">
        <button className="quiz-close" onClick={onClose}>
          ✕
        </button>

        {!showResult && !showStop && (
          <div
            style={{
              fontSize: 11,
              color: "var(--text-dimmer)",
              fontFamily: "'DM Mono', monospace",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Takes less than 2 minutes · No commitment
          </div>
        )}

        <div className="quiz-progress">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`quiz-progress-bar ${
                showResult || i < step || (showStop && i <= step) ? "done" : ""
              }`}
            />
          ))}
        </div>

        {showStop ? (
          <div className="quiz-step active">
            <div className="quiz-result">
              <div
                className="quiz-result-icon"
                style={{ color: "var(--orange)" }}
              >
                ⚠
              </div>
              <h3>We'd recommend speaking with your GP first.</h3>
              <p>
                Based on your answers, a Meora protocol may not be appropriate
                right now. Please discuss your health history with your GP
                before proceeding.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  className="quiz-pill"
                  style={{ flex: 1 }}
                  onClick={onClose}
                >
                  Close
                </button>
                <a
                  href="https://www.healthdirect.gov.au/australian-health-services"
                  target="_blank"
                  rel="noreferrer"
                  className="quiz-next"
                  style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
                >
                  Find a GP →
                </a>
              </div>
            </div>
          </div>
        ) : !showResult ? (
          <div className="quiz-step active">
            {step === 0 && (
              <>
                <div className="quiz-eyebrow">
                  Assessment · Step 1 of 6 — What interests you
                </div>
                <div className="quiz-question">
                  What are you hoping to address?
                </div>

                <div style={labelStyle}>YOUR GOALS</div>
                <div className="quiz-options">
                  {GOALS.map((g) => (
                    <CheckTile
                      key={g}
                      selected={goals.includes(g)}
                      onClick={() => toggleArr(goals, setGoals, g)}
                    >
                      {g}
                    </CheckTile>
                  ))}
                </div>

                <div style={divider} />
                <div style={labelStyle}>PROTOCOLS — OPTIONAL</div>
                <div style={subCopy}>
                  If you have a protocol in mind, select it. Otherwise skip —
                  your doctor will recommend the right fit.
                </div>
                <div className="quiz-options">
                  {PROTOCOLS.map((p) => {
                    const isPre =
                      selectedProtocol && p === selectedProtocol;
                    return (
                      <CheckTile
                        key={p}
                        selected={protocols.includes(p)}
                        onClick={() =>
                          toggleArr(protocols, setProtocols, p)
                        }
                      >
                        <ProtocolName name={p} />
                        {isPre && (
                          <span
                            style={{
                              display: "block",
                              fontSize: 11,
                              fontStyle: "italic",
                              color: "var(--text-dim)",
                              marginTop: 4,
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            Pre-selected from protocols page — you can change this.
                          </span>
                        )}
                      </CheckTile>
                    );
                  })}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="quiz-eyebrow">
                  Assessment · Step 2 of 6 — Your experience
                </div>
                <div className="quiz-question">
                  Have you used peptides or hormone therapy before?
                </div>
                <div className="quiz-options">
                  {PRIOR_OPTIONS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      className={`quiz-option ${
                        priorExperience === o ? "selected" : ""
                      }`}
                      onClick={() => setPriorExperience(o)}
                    >
                      <div className="quiz-option-dot"></div>
                      <span style={{ textAlign: "left" }}>{o}</span>
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    maxHeight: isYes ? 2000 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <div style={{ marginTop: 16 }}>
                    <label style={fieldLabel}>
                      Which compounds or medications have you used?
                    </label>
                    <input
                      className="quiz-input quiz-input-accent"
                      type="text"
                      value={priorCompounds}
                      onChange={(e) => setPriorCompounds(e.target.value)}
                      placeholder="e.g. CJC-1295, BPC-157, semaglutide, testosterone — be as specific as you like"
                    />
                    <div style={subLabel}>
                      This helps your doctor understand your history and pick
                      the right next step.
                    </div>
                  </div>

                  <div style={divider} />
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-dim)",
                      marginBottom: 12,
                    }}
                  >
                    Any specific compounds you'd like to discuss?
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    {PEPTIDES.map((p) => (
                      <CheckTile
                        key={p}
                        selected={specificPeptides.includes(p)}
                        onClick={() => togglePeptide(p)}
                      >
                        {p}
                      </CheckTile>
                    ))}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <CheckTile
                      selected={specificPeptides.includes(PEPTIDE_GUIDE)}
                      onClick={() => togglePeptide(PEPTIDE_GUIDE)}
                    >
                      {PEPTIDE_GUIDE}
                    </CheckTile>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="quiz-eyebrow">
                  Assessment · Step 3 of 6 — About you
                </div>
                <div className="quiz-question">Tell us about yourself</div>

                <input
                  className="quiz-input"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
                <input
                  className="quiz-input"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
                <input
                  className="quiz-input quiz-input-accent"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                <input
                  className="quiz-input"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile number (optional)"
                />
                <select
                  className="quiz-input quiz-select"
                  value={stateField}
                  onChange={(e) => setStateField(e.target.value)}
                >
                  <option value="">State (optional)</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <div className="quiz-eyebrow">
                  Assessment · Step 4 of 6 — Medical history
                </div>
                <div className="quiz-question">
                  Do you have any of the following?
                </div>
                <div style={subCopy}>Select all that apply.</div>
                <div className="quiz-options">
                  {MEDICAL_FLAGS.map((f) => (
                    <CheckTile
                      key={f}
                      selected={medicalFlags.includes(f)}
                      onClick={() => toggleMedicalFlag(f)}
                    >
                      {f}
                    </CheckTile>
                  ))}
                  <CheckTile
                    selected={medicalFlags.includes(NONE_FLAG)}
                    onClick={() => toggleMedicalFlag(NONE_FLAG)}
                  >
                    {NONE_FLAG}
                  </CheckTile>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="quiz-eyebrow">
                  Assessment · Step 5 of 6 — A few more things
                </div>
                <div className="quiz-question">Almost done</div>

                <div style={labelStyle}>CURRENT MEDICATIONS</div>
                <textarea
                  className="quiz-input"
                  style={{ minHeight: 72, resize: "vertical", opacity: noMedications ? 0.4 : 1 }}
                  value={noMedications ? "" : medications}
                  onChange={(e) => setMedications(e.target.value)}
                  disabled={noMedications}
                  placeholder="Any medications or supplements — e.g. Metformin, Vitamin D, fish oil."
                />
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 12,
                    cursor: "pointer",
                    fontSize: 14,
                    color: "var(--text-dim)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={noMedications}
                    onChange={(e) => {
                      setNoMedications(e.target.checked);
                      if (e.target.checked) setMedications("");
                    }}
                    className="quiz-option-checkbox-input"
                    style={{ width: 18, height: 18, accentColor: "var(--orange)" }}
                  />
                  No — I'm not currently taking any medications or supplements
                </label>

                <div style={divider} />
                <div style={labelStyle}>LIFESTYLE</div>

                 <div className="quiz-field-group quiz-field-group-lg">
                  <label style={fieldLabel}>
                    Sleep quality (last 30 days) —{" "}
                    <span style={{ color: "var(--orange)" }}>{sleepScore}/10</span>
                  </label>
                   <p style={helperText}>
                    Sleep affects recovery, hormones and how your body responds to treatment. Your honest answer helps your doctor tailor the protocol.
                  </p>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={sleepScore}
                    onChange={(e) => {
                      setSleepScore(Number(e.target.value));
                      setSleepTouched(true);
                    }}
                    className="quiz-range"
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--text-dim)",
                      fontFamily: "'DM Mono', monospace",
                      marginTop: 6,
                    }}
                  >
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                 <div className="quiz-field-group">
                  <label style={fieldLabel}>
                    Comfortable with self-injection?
                  </label>
                   <div className="quiz-pill-row">
                    {["Yes", "No", "Not sure yet"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        className={`quiz-pill ${
                          injectionComfort === v ? "active" : ""
                        }`}
                        onClick={() => setInjectionComfort(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={divider} />
                <div style={labelStyle}>HOW DID YOU FIND US?</div>
                <div className="quiz-options">
                  {REFERRAL_OPTIONS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      className={`quiz-option ${
                        referralSource === o ? "selected" : ""
                      }`}
                      onClick={() => setReferralSource(o)}
                    >
                      <div className="quiz-option-dot"></div>
                      <span style={{ textAlign: "left" }}>{o}</span>
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    maxHeight: referralSource === "Other" ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <input
                    className="quiz-input"
                    type="text"
                    value={referralOther}
                    onChange={(e) => setReferralOther(e.target.value)}
                    placeholder="Tell us more (optional)"
                    style={{ marginTop: 12 }}
                  />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="quiz-eyebrow">
                  Assessment · Step 6 of 6 — Almost there
                </div>
                <div className="quiz-question">One last thing</div>
                 <p className="quiz-helper quiz-helper-lg">
                  Please confirm you understand how Meora works before we send your assessment to a doctor.
                </p>
                <button
                  type="button"
                  className={`quiz-option ${consent ? "selected" : ""}`}
                  onClick={() => setConsent(!consent)}
                   style={{ alignItems: "flex-start" }}
                >
                  <div
                    className="quiz-option-checkbox"
                    style={{ marginTop: 2 }}
                  >
                    {consent ? "✓" : ""}
                  </div>
                  <span style={{ textAlign: "left", lineHeight: 1.5 }}>
                    I understand that Meora is a clinical telehealth service.
                    Completing this assessment does not guarantee a
                    prescription. All treatment decisions are made by an
                    AHPRA-registered doctor.
                  </span>
                </button>
              </>
            )}

            <button
              className="quiz-next"
              onClick={handleNext}
              disabled={!canProceed}
            >
              {isLast ? "See my result →" : "Continue →"}
            </button>
          </div>
        ) : (
          <div className="quiz-step active">
            <div className="quiz-result">
              <div
                className="quiz-result-icon"
                style={{ color: "var(--orange)" }}
              >
                ✓
              </div>
              <h3>
                You're eligible<em> for Meora.</em>
              </h3>
              <p>
                Your slot is waiting — book your consultation below. Payment is
                completed as part of the booking confirmation.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                <a
                  href="https://meora.au5.cliniko.com/bookings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiz-next"
                  style={{ width: "100%", textAlign: "center", textDecoration: "none", display: "inline-block" }}
                  onClick={() => {
                    document.body.style.overflow = "";
                    onClose();
                  }}
                >
                  Book your consultation →
                </a>
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-dimmer)",
                  marginTop: 16,
                  lineHeight: 1.6,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Your details are used only to facilitate your clinical
                assessment. Handled in accordance with the Australian Privacy
                Act 1988 and AHPRA telehealth guidelines.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
