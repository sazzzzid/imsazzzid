import Image from "next/image";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  src: string;
  srcDark?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}

export function CoverImage({
  src,
  srcDark,
  alt,
  priority = false,
  sizes = "(max-width: 1280px) 100vw, 1280px",
  imageClassName,
}: CoverImageProps) {
  if (!src.startsWith("/")) return null;

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover",
          imageClassName,
          srcDark && "dark:hidden",
        )}
      />
      {srcDark && (
        <Image
          src={srcDark}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover hidden dark:block",
            imageClassName,
          )}
        />
      )}
    </>
  );
}
