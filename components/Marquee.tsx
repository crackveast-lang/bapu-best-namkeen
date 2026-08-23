import { Chilli } from "./Doodles";

const words = ["Crunch", "Masala", "Sev", "Chai Time", "Namkeen", "Indore Style", "Since 1997"];

export default function Marquee() {
  return (
    <div className="relative z-20 -rotate-1 border-y-4 border-charcoal bg-green py-4 sm:py-5">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {words.map((w) => (
                <span key={`${copy}-${w}`} className="flex items-center">
                  <span className="display px-6 text-3xl text-cream sm:text-4xl">{w}</span>
                  <Chilli className="w-7 shrink-0 -rotate-12" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
