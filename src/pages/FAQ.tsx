import { Link } from "react-router-dom";
import Footer from "@/components/rill/Footer";
import FAQ from "@/components/rill/FAQ";

const FAQPage = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <Link to="/" className="privacy-back">← Back to home</Link>
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
