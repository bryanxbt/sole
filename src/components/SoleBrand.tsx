import { AssetImage } from "./AssetImage";

/** Official $SOLE mark — inverted arch / sole V */
export function SoleMark({
  className = "",
  color = "#EC641D",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M120.981 217H146.806C149.508 217 152.047 218.376 153.488 220.701L468.38 727.06C475.438 738.425 487.147 744.943 500.559 744.943C513.97 744.943 525.663 738.425 532.737 727.06L847.613 220.701C849.054 218.376 851.593 217 854.295 217H880.119C886.293 217 890.06 223.796 886.801 229.036L564.67 746.99C550.767 769.278 526.809 782.64 500.493 782.64C474.161 782.64 450.219 769.343 436.316 746.99L114.202 229.036C110.943 223.796 114.693 217 120.867 217H120.981Z"
        fill={color}
      />
    </svg>
  );
}

/** Raster wordmarks from brand kit */
export function SoleWordmark({
  variant = "dollar",
  className = "",
  priority = false,
}: {
  variant?: "dollar" | "sole" | "arch-support" | "lockup";
  className?: string;
  priority?: boolean;
}) {
  const map = {
    dollar: {
      src: "/images/brand/wordmark-dollar-sole.png",
      alt: "$SOLE",
      width: 520,
      height: 160,
    },
    sole: {
      src: "/images/brand/wordmark-sole.png",
      alt: "SOLE",
      width: 420,
      height: 140,
    },
    "arch-support": {
      src: "/images/brand/wordmark-arch-support.png",
      alt: "Arch Support",
      width: 480,
      height: 80,
    },
    lockup: {
      src: "/images/brand/wordmark-lockup-full.png",
      alt: "$SOLE Arch Support",
      width: 720,
      height: 320,
    },
  } as const;

  const item = map[variant];

  return (
    <AssetImage
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      priority={priority}
      className={`h-auto w-full object-contain ${className}`}
    />
  );
}
