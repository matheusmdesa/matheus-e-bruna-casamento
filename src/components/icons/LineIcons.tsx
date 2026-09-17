type IconProps = { className?: string };

export function LocationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ReceptionIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10h16M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 10v8a1 1 0 0 0 1 1h1v-3M20 10v8a1 1 0 0 1-1 1h-1v-3" />
    </svg>
  );
}
