import { Frown } from 'lucide-react';

interface Props {
  text: string,
  size?: "md" | "lg"
}
export function Empty({ text, size = "lg" }: Props) {
  const containerSize = {
    md: "10rem",
    lg: "30rem"
  }[size]

  return (
    <section className={`w-full min-h-[${containerSize}] flex justify-center items-center`}>
      <div className="flex flex-col items-center">
        <Frown color="#c4c4c4" />
        <span className="text-xl mt-2">{text}</span>
      </div>
    </section>
  );
}