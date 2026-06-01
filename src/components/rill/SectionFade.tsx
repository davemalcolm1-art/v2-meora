interface SectionFadeProps {
  from: string;
  to: string;
  height?: number;
}

const SectionFade = ({ from, to, height = 80 }: SectionFadeProps) => (
  <div
    aria-hidden="true"
    style={{
      height,
      background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      width: "100%",
    }}
  />
);

export default SectionFade;
