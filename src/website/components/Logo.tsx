/**
 * Brand logo lockup: the hanger symbol (from the favicon) + the wordmark.
 * The symbol scales with the surrounding font-size (em units) and the wordmark
 * inherits its colour from the parent, so the same component works at any size
 * on any background. The hanger stays brand-gold.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="7 2 50 50"
        aria-hidden="true"
        className="h-[1.15em] w-[1.15em] shrink-0"
      >
        <g
          fill="none"
          stroke="#C9A84C"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 21c0-4 3-6.5 6.5-5.6 2.3.6 3.4 2.5 2.7 4.4" />
          <path d="M32 21 16 39h32L32 21z" />
        </g>
      </svg>
      <span className="font-serif font-semibold tracking-wide">The Garment Concierge</span>
    </span>
  );
}
