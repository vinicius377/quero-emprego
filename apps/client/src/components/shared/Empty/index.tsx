import { Frown } from 'lucide-react';

export function Empty({ text }: { text: string }) {
  return (
    <section className="w-full min-h-[20rem] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Frown color="#c4c4c4"/>
        <span className="text-xl mt-2">{text}</span>
      </div>
    </section>
  );
}
