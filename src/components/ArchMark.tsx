export function ArchMark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M20 2C10.6 2 4 10 4 20v22h7.5V20c0-5.5 3.8-9.5 8.5-9.5s8.5 4 8.5 9.5v22H36V20C36 10 29.4 2 20 2z"
        fill={color}
      />
    </svg>
  );
}

export function ArchShape({
  className = "",
  opacity = 0.16,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={{ opacity }}
    >
      <path
        d="M100 12C48 12 16 56 16 112v96h38v-96c0-30 20-54 46-54s46 24 46 54v96h38v-96c0-56-32-100-84-100z"
        fill="currentColor"
      />
    </svg>
  );
}
