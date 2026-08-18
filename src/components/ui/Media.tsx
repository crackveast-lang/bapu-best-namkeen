import Image from 'next/image';
import { img, type ImageKey } from '@/data/image-meta';

type Props = {
  /** Key into the generated image manifest. */
  name: ImageKey;
  alt: string;
  className?: string;
  /** Passed straight to next/image — always set this for non-fill layouts. */
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  /** Applied to the <img> itself; the wrapper handles cropping. */
  imgClassName?: string;
};

/**
 * next/image bound to the generated manifest, so every image ships with real
 * intrinsic dimensions and its own blur placeholder. Nothing on the site loads
 * an image without both.
 */
export default function Media({
  name,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  fill = false,
  imgClassName = 'object-cover',
}: Props) {
  const meta = img(name);

  if (fill) {
    return (
      <Image
        src={meta.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        placeholder="blur"
        blurDataURL={meta.blurDataURL}
        className={imgClassName}
      />
    );
  }

  return (
    <Image
      src={meta.src}
      alt={alt}
      width={meta.width}
      height={meta.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      className={className}
    />
  );
}
