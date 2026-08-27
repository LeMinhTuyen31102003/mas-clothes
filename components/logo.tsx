type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  tone?: "accent" | "light";
  className?: string;
};

export function LogoMark({
  size = 40,
  tone = "accent",
}: {
  size?: number;
  tone?: "accent" | "light";
}) {
  const stroke = tone === "light" ? "#EFE6DC" : "var(--color-accent)";
  const fill = tone === "light" ? "#EFE6DC" : "var(--color-accent)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
      <g transform="translate(32,32)">
        <g>
          <ellipse cx="0" cy="-11" rx="6.2" ry="10.5" fill={fill} opacity="0.9" />
          <ellipse
            cx="0"
            cy="-11"
            rx="6.2"
            ry="10.5"
            fill={fill}
            opacity="0.9"
            transform="rotate(120)"
          />
          <ellipse
            cx="0"
            cy="-11"
            rx="6.2"
            ry="10.5"
            fill={fill}
            opacity="0.9"
            transform="rotate(240)"
          />
        </g>
        <circle cx="0" cy="0" r="3.4" fill={tone === "light" ? "#2B2320" : "#FAF6F1"} />
      </g>
    </svg>
  );
}

export function Logo({ size = 40, withWordmark = true, tone = "accent", className = "" }: LogoProps) {
  const wordColor = tone === "light" ? "text-[#EFE6DC]" : "text-ink";
  const scriptColor = tone === "light" ? "text-accent-tint" : "text-accent";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} tone={tone} />
      {withWordmark && (
        <span className={`font-display font-semibold tracking-wide ${wordColor}`} style={{ fontSize: size * 0.5 }}>
          M.A.S <em className={`italic font-medium ${scriptColor}`}>Clothes</em>
        </span>
      )}
    </div>
  );
}
