import Image from "next/image";

/**
 * Official Arch Network mark — four nested arches (no crossbar).
 * Matches brand logos: cream-on-orange / orange-on-cream.
 */
export function ArchMark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer arch */}
      <path
        d="M8 68 C8 68 10 28 40 8 C70 28 72 68 72 68"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Second */}
      <path
        d="M16.5 68 C16.5 68 18 34 40 18 C62 34 63.5 68 63.5 68"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Third */}
      <path
        d="M25 68 C25 68 26.5 40 40 28 C53.5 40 55 68 55 68"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner */}
      <path
        d="M33.5 68 C33.5 68 34.5 48 40 40 C45.5 48 46.5 68 46.5 68"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Raster official logo — preferred for nav/footer brand lockups */
export function ArchLogo({
  variant = "orange",
  className = "",
  size = 28,
  alt = "Arch Network",
}: {
  variant?: "orange" | "cream";
  className?: string;
  size?: number;
  alt?: string;
}) {
  const src =
    variant === "cream"
      ? "/images/arch-logo-cream-on-orange.png"
      : "/images/arch-logo-orange-on-cream.png";

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority={false}
    />
  );
}

/** Large faded Arch silhouette for hero backgrounds — nested arches */
export function ArchShape({
  className = "",
  opacity = 0.16,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={{ opacity }}
    >
      <path
        d="M12 170 C12 170 18 60 100 12 C182 60 188 170 188 170"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M34 170 C34 170 40 78 100 38 C160 78 166 170 166 170"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M56 170 C56 170 62 96 100 64 C138 96 144 170 144 170"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M78 170 C78 170 82 118 100 96 C118 118 122 170 122 170"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
