import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const Book = () => {
  // Ensure body scroll is restored (in case modal left it locked)
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const clinikoBookings = document.getElementById("cliniko-93936897") as HTMLIFrameElement | null;
      if (!clinikoBookings) return;
      if (typeof e.data !== "string") return;
      if (e.data.indexOf("cliniko-bookings-resize") > -1) {
        const height = Number(e.data.split(":")[1]);
        if (!Number.isNaN(height)) clinikoBookings.style.height = height + "px";
      }
      if (e.data.indexOf("cliniko-bookings-page") > -1) {
        clinikoBookings.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const iframeSrc = useMemo(() => {
    const base = "https://meora.au5.cliniko.com/bookings?embedded=true";
    try {
      const raw = localStorage.getItem("meora_booking_prefill");
      if (!raw) return base;
      const data = JSON.parse(raw) as Record<string, string>;
      const params = new URLSearchParams();
      if (data.first_name) params.set("first_name", data.first_name);
      if (data.last_name) params.set("last_name", data.last_name);
      if (data.email) params.set("email", data.email);
      if (data.phone) params.set("phone", data.phone);
      const qs = params.toString();
      return qs ? `${base}&${qs}` : base;
    } catch {
      return base;
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--deep-navy)",
        padding: "56px 24px 80px",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{
          position: "fixed",
          top: 16,
          left: 20,
          fontSize: 12,
          fontFamily: "'DM Mono', monospace",
          color: "var(--text-dim)",
          textDecoration: "none",
          padding: "8px 12px",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 999,
          backdropFilter: "blur(8px)",
          zIndex: 50,
        }}
      >
        ← Back to Meora
      </Link>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: 20,
            padding: "14px 18px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "var(--orange, #FF5003)",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--text-dim)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            This is a telehealth phone consultation — no in-person visit required.
            Your doctor will call you at the scheduled time.
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <iframe
            id="cliniko-93936897"
            src={iframeSrc}
            frameBorder={0}
            scrolling="auto"
            width="100%"
            height={1000}
            style={{ pointerEvents: "auto", display: "block", border: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Book;
