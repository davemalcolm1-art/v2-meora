import { Link } from "react-router-dom";
import Footer from "@/components/rill/Footer";

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <Link to="/" className="privacy-back">← Back to home</Link>

        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-meta">
          Effective Date: 28 April 2026<br />
          Last Updated: 5 May 2026
        </p>

        <section>
          <h2>1. Introduction</h2>
          <p>Your privacy matters to us. This Privacy Policy explains how MEORA ("we," "us," or "our") collects, uses, stores, and discloses your personal information when you access our website at meora.me ("Website") or use any of our services.</p>
          <p>We are committed to complying with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and, where applicable, relevant state health privacy legislation. Because our services involve health information, we take particular care in how we handle sensitive data.</p>
          <p>By using our Website or services, you agree to the collection and use of your information as described in this policy. If you do not agree, please do not use our Website. By continuing to use our Website, you consent to our use of cookies as described in Section 10.</p>
        </section>

        <section>
          <h2>2. Who We Are</h2>
          <p>MEORA is an Australian telehealth platform that connects patients with AHPRA-registered medical practitioners for consultations and clinical oversight. We do not manufacture or supply therapeutic goods directly — we facilitate access to regulated healthcare services.</p>
          <p>
            <strong>Privacy Officer</strong><br />
            MEORA (a trading name of Aaker Industries Pty Ltd ABN 58 697 722 357)<br />
            Rose Bay NSW 2029, Australia<br />
            Email: me@meora.me
          </p>
        </section>

        <section>
          <h2>3. What Personal Information We Collect</h2>
          <h3>Contact and Identity Information</h3>
          <p>Full name, date of birth, email address, phone number, and postal address</p>
          <h3>Account and Transaction Information</h3>
          <p>Login credentials, billing and payment details, and transaction history</p>
          <h3>Health Information</h3>
          <ul>
            <li>Medical history, current medications, lifestyle factors, and other health details you provide as part of a clinical consultation or intake questionnaire</li>
            <li>Blood test results or pathology reports you share with us or your treating practitioner</li>
          </ul>
          <h3>Technical Information</h3>
          <p>IP address, browser type, device identifiers, pages visited, and session data collected via cookies and analytics tools</p>
          <h3>Communications</h3>
          <p>Records of your correspondence with our team, including support enquiries</p>
          <p>We collect health information only with your explicit consent, or where otherwise permitted under the Privacy Act and applicable state health privacy laws.</p>
        </section>

        <section>
          <h2>4. How We Collect Your Information</h2>
          <p>We collect personal information:</p>
          <ul>
            <li>Directly from you when you create an account, complete an intake form, book a consultation, or contact us</li>
            <li>From AHPRA-registered practitioners involved in your care</li>
            <li>From third-party pathology providers (where you have been referred for testing)</li>
            <li>Automatically via cookies, analytics, and similar technologies when you use our Website</li>
          </ul>
        </section>

        <section>
          <h2>5. Why We Collect and Use Your Information</h2>
          <h3>Providing Services</h3>
          <ul>
            <li>Processing and managing your consultations and clinical referrals</li>
            <li>Facilitating communication between you and AHPRA-registered practitioners</li>
            <li>Coordinating with registered compounding pharmacies for prescription fulfilment where directed by your treating practitioner</li>
            <li>By booking a telehealth consultation through our platform, you consent to the collection and use of your health information for the purposes of that consultation and ongoing clinical management.</li>
          </ul>
          <h3>Clinical Safety and Governance</h3>
          <ul>
            <li>Ensuring appropriate clinical oversight and continuity of care</li>
            <li>Maintaining records required under applicable health legislation</li>
          </ul>
          <h3>Account and Billing Management</h3>
          <p>Processing payments, issuing receipts, and managing your account</p>
          <h3>Communications</h3>
          <ul>
            <li>Sending appointment reminders, care updates, and service notifications</li>
            <li>Responding to your enquiries and support requests</li>
            <li>Sending marketing communications where you have opted in (you may opt out at any time)</li>
          </ul>
          <h3>Improvement and Research</h3>
          <p>Analysing de-identified, aggregate data to improve our platform and services</p>
          <h3>Legal Compliance</h3>
          <p>Meeting our obligations under the Privacy Act, TGA regulations, AHPRA guidelines, and any other applicable laws</p>
        </section>

        <section>
          <h2>6. Health Information — Special Protections</h2>
          <p>Health information is sensitive information under the Privacy Act and is afforded additional protections. We will only collect, use, or disclose your health information:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>Where necessary to provide the healthcare services you have requested</li>
            <li>To lessen or prevent a serious threat to your life, health, or safety</li>
            <li>As required or authorised by law</li>
          </ul>
        </section>

        <section>
          <h2>7. Disclosure of Your Information</h2>
          <p>We do not sell your personal information. We may disclose it to:</p>
          <ul>
            <li>AHPRA-registered practitioners facilitating your consultations</li>
            <li>Registered compounding pharmacies for prescription fulfilment</li>
            <li>Pathology and diagnostic providers where clinical referrals are made</li>
            <li>Cloud and technology service providers supporting our platform</li>
            <li>Payment processors (such as Stripe) for transaction handling</li>
            <li>Professional advisors under confidentiality obligations</li>
            <li>Regulatory authorities where required by law</li>
          </ul>
          <p>Where we disclose personal information to overseas service providers, we take reasonable steps to ensure those providers maintain privacy protections consistent with the APPs. You acknowledge that APP 8.1 may not apply to such disclosures.</p>
        </section>

        <section>
          <h2>8. Data Security</h2>
          <p>We implement appropriate technical and organisational measures including:</p>
          <ul>
            <li>Encrypted data transmission (TLS/HTTPS)</li>
            <li>Access controls limiting data to authorised personnel only</li>
            <li>Secure cloud infrastructure with Australian data residency where practicable</li>
            <li>Regular security reviews</li>
          </ul>
          <p>No method of data transmission or storage is completely secure. While we take reasonable precautions, we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2>9. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfil the purposes described in this policy, or as required by law. Health records are retained in accordance with applicable state and territory legislation (typically a minimum of seven years for adult records, or until a minor turns 25).</p>
        </section>

        <section>
          <h2>10. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to understand how visitors use our Website and to improve your experience. By continuing to use our Website, you consent to our use of cookies. You can manage cookie preferences through your browser settings. Disabling cookies may affect some Website functionality.</p>
          <p>We may use analytics tools (such as Google Analytics) that process de-identified usage data.</p>
        </section>

        <section>
          <h2>11. Marketing Communications</h2>
          <p>You can opt out at any time by:</p>
          <ul>
            <li>Clicking the unsubscribe link in any email we send</li>
            <li>Replying STOP to any SMS we send</li>
            <li>Contacting us at me@meora.me</li>
          </ul>
          <p>Opting out of marketing does not affect service-related communications necessary for your care.</p>
        </section>

        <section>
          <h2>12. Accessing and Correcting Your Information</h2>
          <p>To request access to or correction of your personal information, contact our Privacy Officer at me@meora.me. We will respond within 30 days.</p>
        </section>

        <section>
          <h2>13. Complaints</h2>
          <p>Contact our Privacy Officer at me@meora.me in the first instance. If unsatisfied, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC):</p>
          <p>
            GPO Box 5218, Sydney NSW 2001<br />
            Telephone: 1300 363 992<br />
            Website: <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">https://www.oaic.gov.au</a>
          </p>
        </section>

        <section>
          <h2>14. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The effective date at the top of this page reflects the most recent version.</p>
        </section>

        <section>
          <h2>15. Contact Us</h2>
          <p>
            <strong>Privacy Officer</strong><br />
            MEORA (a trading name of Aaker Industries Pty Ltd ABN 58 697 722 357)<br />
            Rose Bay NSW 2029, Australia<br />
            Email: me@meora.me
          </p>
        </section>

        <p className="privacy-footnote">This Privacy Policy was prepared in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles, and relevant AHPRA guidelines applicable to telehealth services.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
