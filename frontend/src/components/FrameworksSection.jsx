import SectionHeading from "./SectionHeading";
import Pill from "./Pill";

export default function FrameworksSection({ frameworks }) {
  if (!frameworks?.length) return null;
  return (
    <>
      <SectionHeading tone="frameworks">Frameworks</SectionHeading>
      <div>
        {frameworks.map((f, i) => (
          <Pill tone="frameworks" key={i}>{f}</Pill>
        ))}
      </div>
    </>
  );
}