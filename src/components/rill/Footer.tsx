import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="rill-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo" style={{ display: "flex", alignItems: "center", height: "44px" }}>
          <svg viewBox="460 85 280 240" height="44" width="44" xmlns="http://www.w3.org/2000/svg">
            <circle cx="600" cy="220" fill="none" r="120" stroke="#E8571A" strokeWidth="14" />
            <path d="M 530 300 L 530 170 L 600 250 L 670 170 L 670 300" fill="none" stroke="#E8571A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <path d="M 600 310 C 560 260, 580 215, 600 195 C 620 215, 640 260, 600 310 Z" fill="none" stroke="#E8571A" strokeWidth="13" />
          </svg>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "18px", color: "#E8571A", letterSpacing: "0.08em", marginLeft: "10px" }}>
            MEORA
          </span>
        </div>
        <div className="footer-tagline" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontStyle: "italic", color: "#FFFFFF", fontSize: "16px" }}>
          It starts with ME.
        </div>
        <div className="footer-socials" aria-label="Social links">
          <a href="https://www.instagram.com/meora.health/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="footer-col">
        <h5>Protocols</h5>
        <ul>
          <li><a href="#">Foundation.ME</a></li>
          <li><a href="#">Radiance.ME</a></li>
          <li><a href="#">Repair.ME</a></li>
          <li><a href="#">Lean.ME</a></li>
          <li><a href="#">Vital.ME</a></li>
          <li><a href="#">Shield.ME</a></li>
          <li><a href="#">Peak.ME</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="#">About Meora</a></li>
          <li><a href="#">Our doctors</a></li>
          <li><a href="#">Our standards</a></li>
          <li><a href="#">Journal</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Support</h5>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Telehealth Disclaimer</a></li>
          <li><a href="#">Product Disclaimer</a></li>
          <li><a href="#">My Account</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-legal">
        Meora operates as an AHPRA-compliant telehealth service. All consultations are conducted by AHPRA-registered medical practitioners. Compounded therapeutic goods are prepared by a registered compounding pharmacy and dispensed only on lawful prescription. This website advertises a health service, not a therapeutic good. Results vary. Not a substitute for professional medical advice.
      </div>
      <div className="footer-copy">
        © 2025 MEORA · MEORA is a trading name of Aaker Industries Pty Ltd ABN 58 697 722 357 · <Link to="/privacy">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
