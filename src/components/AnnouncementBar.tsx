import { LEGAL } from '@/data/site';

/**
 * A single quiet line of provenance above the nav. It says only things that are
 * printed on the pack, and it does not scroll or marquee.
 */
export default function AnnouncementBar() {
  const items = [
    `Made in ${LEGAL.city}, Madhya Pradesh`,
    `${LEGAL.iso} certified facility`,
    '100% vegetarian',
    'Now on Amazon & Flipkart',
  ];

  return (
    <div className="relative z-50 bg-maroon-deep text-ivory">
      <div className="mx-auto flex w-full max-w-[88rem] items-center justify-center gap-x-6 gap-y-1 px-5 py-2 sm:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
          {items.map((item, i) => (
            <li
              key={item}
              className={`flex items-center gap-6 text-[0.68rem] font-medium tracking-[0.12em] text-ivory/85 uppercase ${
                i > 1 ? 'hidden md:flex' : i > 0 ? 'hidden sm:flex' : ''
              }`}
            >
              {i > 0 ? <span className="size-1 rounded-full bg-saffron/70" aria-hidden /> : null}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
