import { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;
    if (cursorRef.current) { cursorRef.current.style.opacity = "0"; cursorRef.current.style.display = "none"; }
    if (ringRef.current) { ringRef.current.style.opacity = "0"; ringRef.current.style.display = "none"; }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.display = "block";
        cursorRef.current.style.left = mx - 4 + "px";
        cursorRef.current.style.top = my - 4 + "px";
        cursorRef.current.style.opacity = "1";
      }
      if (ringRef.current) {
        ringRef.current.style.display = "block";
        ringRef.current.style.opacity = "1";
      }
    };
    const animate = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    document.addEventListener("mousemove", onMove);
    animate();
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{ opacity: 0, left: -100, top: -100, display: "none" }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0, left: -100, top: -100, display: "none" }} />
    </>
  );
};

export default Cursor;
