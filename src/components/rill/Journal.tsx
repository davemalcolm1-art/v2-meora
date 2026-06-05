import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const GHOST_URL = "https://longevity-for-me.ghost.io";
const GHOST_KEY = "217fd7d51d284f842cc9582c56";

interface Post {
  title: string;
  excerpt?: string;
  feature_image?: string | null;
  published_at: string;
  tags?: { name: string }[];
  url: string;
  slug?: string;
}

const placeholderPosts: Post[] = [
  {
    title: "Why regulated peptides are a different category entirely",
    excerpt:
      "The grey market has muddied the waters. Here is what the regulated pathway actually looks like and why it matters for your safety.",
    feature_image: null,
    published_at: "2026-04-01",
    tags: [{ name: "Article" }],
    url: "https://longevity-for-me.ghost.io",
  },
  {
    title: "The GH axis and why it matters after 35",
    excerpt:
      "Growth hormone secretion declines by roughly 15% per decade after your mid-twenties. Here is what that means for body composition, recovery and energy.",
    feature_image: null,
    published_at: "2026-04-01",
    tags: [{ name: "Article" }],
    url: "https://longevity-for-me.ghost.io",
  },
  {
    title: "New to peptides? Start here.",
    excerpt:
      "A plain-language overview of what peptide therapy is, how the regulated Australian pathway works, and what to expect from your first consultation.",
    feature_image: null,
    published_at: "2026-04-01",
    tags: [{ name: "Guide" }],
    url: "https://longevity-for-me.ghost.io",
  },
];

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #0f0f0f 0%, #243B47 100%)",
  "linear-gradient(135deg, #2D3B2D 0%, #1A2B1A 100%)",
  "linear-gradient(135deg, #2D2435 0%, #1A1A2B 100%)",
];

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d
      .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
  } catch {
    return "";
  }
}

const overlay =
  "linear-gradient(to top, rgba(26,43,53,0.85) 0%, rgba(26,43,53,0.2) 60%, transparent 100%)";

const Journal = () => {
  const [posts, setPosts] = useState<Post[]>(placeholderPosts);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useScrollAnimation<HTMLElement>();

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&limit=3&include=tags&fields=title,slug,excerpt,feature_image,published_at,tags,url`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.posts && data.posts.length) setPosts(data.posts.slice(0, 3));
      })
      .catch(() => setPosts(placeholderPosts));
  }, []);

  const renderCard = (post: Post | undefined, idx: number, big: boolean) => {
    if (!post) return null;
    const bg = post.feature_image
      ? `url(${post.feature_image}) center/cover no-repeat`
      : CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
    const isHover = hovered === idx;
    const arrowSize = big ? 36 : 32;
    const arrowOffset = big ? 24 : 16;
    const padding = big ? 36 : 24;

    return (
      <div
        key={idx}
        className={`scroll-fade delay-${(idx + 1) * 100}`}
        onClick={() => window.open(post.url, "_blank", "noopener,noreferrer")}
        onMouseEnter={() => setHovered(idx)}
        onMouseLeave={() => setHovered(null)}
        style={{
          gridColumn: big && !isMobile ? "1 / -1" : "auto",
          height: isMobile ? (big ? 320 : 240) : big ? 420 : 280,
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          background: bg,
          transform: isHover && big ? "scale(1.005)" : "scale(1)",
          transition: "transform 0.4s ease",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: overlay }} />
        <div
          style={{
            position: "absolute",
            top: arrowOffset,
            right: arrowOffset,
            width: arrowSize,
            height: arrowSize,
            borderRadius: "50%",
            background: isHover ? "#FF5003" : "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 14,
            transition: "background 0.2s ease",
          }}
        >
          ↗
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding,
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 999,
              padding: "4px 12px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: "0.12em",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            {post.tags?.[0]?.name || "Article"}
          </span>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              marginTop: big ? 16 : 12,
            }}
          >
            {formatDate(post.published_at)}
          </div>
          <h3
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontSize: big ? "clamp(22px,3vw,32px)" : 20,
              color: "#fff",
              lineHeight: big ? 1.15 : 1.2,
              marginTop: big ? 6 : 4,
              margin: `${big ? 6 : 4}px 0 0`,
            }}
          >
            {post.title}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      style={{
        background: "radial-gradient(ellipse at 50% 100%, #F0EBE3 0%, #F7F4EF 55%, #FFFFFF 100%)",
        padding: "120px 0",
        margin: isMobile ? "16px 12px" : "24px 24px",
        borderRadius: isMobile ? 20 : 32,
        overflow: "hidden",
      }}
    >

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 80px",
        }}
      >
        <div
          className="scroll-animate"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 24 : 0,
            marginBottom: 48,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(36px,4vw,52px)",
                color: "#0f0f0f",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Longevity research.
              <br />
              <span style={{ color: "#0f0f0f" }}>
                &amp; resources.
              </span>
            </h2>
          </div>
          <a
            href="https://longevity-for-me.ghost.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(26,43,53,0.2)",
              borderRadius: 999,
              padding: "12px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "#0f0f0f",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0f0f0f";
              e.currentTarget.style.background = "rgba(26,43,53,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,43,53,0.2)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            VISIT THE JOURNAL →
          </a>
        </div>

        <div
          className="scroll-animate delay-200"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 16,
          }}
        >
          {renderCard(posts[0], 0, true)}
          {renderCard(posts[1], 1, false)}
          {renderCard(posts[2], 2, false)}
        </div>
      </div>
    </section>
  );
};

export default Journal;
