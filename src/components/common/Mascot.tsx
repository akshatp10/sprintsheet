import type { CSSProperties } from 'react';

export type MascotExpression =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'error'
  | 'excited'
  | 'loading'
  | 'thinking'
  | 'sleeping'
  | 'wave'
  | 'blocked'
  | 'float'
  | 'info';

export interface MascotProps {
  /**
   * The mascot keeps one fixed visual language across every state.
   * Only the face, accent marks and small accessories change.
   */
  expression?: MascotExpression;

  /**
   * SVG scales proportionally from the canonical 44 × 40 viewBox.
   * Example: size={50}, size={72}, size="4rem".
   */
  size?: number | string;

  className?: string;
  style?: CSSProperties;

  /**
   * Enables the mascot's subtle, expression-aware motion.
   * Defaults to false so static illustrations remain completely still.
   */
  renderAnimation?: boolean;

  /**
   * Use decorative=true when nearby text already describes the state.
   */
  label?: string;
  decorative?: boolean;
}

const COLORS = {
  white: '#ffffff',
  purple: '#5a4fb0',
  green: '#2f8f5b',
  amber: '#b3781f',
  rose: '#c0566a',
  teal: '#2f7f9e',
};

function Eyes({ expression }: { expression: MascotExpression }) {
  switch (expression) {
    case 'error':
      return (
        <g className="mascot-error-eyes">
          <path
            d="M14 14 l6 6 M20 14 l-6 6"
            stroke={COLORS.rose}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M24 14 l6 6 M30 14 l-6 6"
            stroke={COLORS.rose}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      );

    case 'sad':
      return (
        <g className="mascot-sad-eyes">
          <path
            d="M14 18 q3 2 6 0"
            stroke={COLORS.rose}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M24 18 q3 2 6 0"
            stroke={COLORS.rose}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );

    case 'sleeping':
      return (
        <>
          <path
            d="M14 18 q3 3 6 0"
            stroke={COLORS.purple}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M24 18 q3 3 6 0"
            stroke={COLORS.purple}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );

    case 'loading':
      // Loading eyes stay fixed in place. Only the dashed stroke rotates.
      return (
        <g className="mascot-loading-eyes">
          <circle
            className="mascot-loading-eye mascot-loading-eye-1"
            cx="17"
            cy="17"
            r="3.2"
            fill={COLORS.white}
            stroke={COLORS.purple}
            strokeWidth="1.6"
            strokeDasharray="2 2"
          />
          <circle
            className="mascot-loading-eye mascot-loading-eye-2"
            cx="27"
            cy="17"
            r="3.2"
            fill={COLORS.white}
            stroke={COLORS.purple}
            strokeWidth="1.6"
            strokeDasharray="2 2"
          />
        </g>
      );

    case 'excited':
      // Bigger, brighter eyes distinguish excited from happy.
      return (
        <>
          <circle
            className="mascot-loading-dot mascot-loading-dot-1"
            cx="17"
            cy="17"
            r="3.5"
            fill={COLORS.purple}
          />
          <circle
            className="mascot-loading-dot mascot-loading-dot-2"
            cx="27"
            cy="17"
            r="3.5"
            fill={COLORS.purple}
          />
          <circle cx="16" cy="16" r="0.9" fill={COLORS.white} />
          <circle cx="26" cy="16" r="0.9" fill={COLORS.white} />
        </>
      );

    case 'thinking':
      return (
        <g className="mascot-thinking-eyes">
          <circle cx="17" cy="17" r="3" fill={COLORS.purple} />
          <circle cx="27" cy="17" r="3" fill={COLORS.purple} />
          <circle cx="18" cy="16" r="0.8" fill={COLORS.white} opacity="0.9" />
          <circle cx="28" cy="16" r="0.8" fill={COLORS.white} opacity="0.9" />
        </g>
      );

    case 'happy':
      return (
        <>
          <path
            className="mascot-wink-eye"
            d="M14 17 q3 2.5 6 0"
            stroke={COLORS.purple}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="27" cy="17" r="3" fill={COLORS.purple} />
        </>
      );

    default:
      return (
        <>
          <circle
            cx="17"
            cy="17"
            r="3"
            fill={expression === 'blocked' ? COLORS.amber : COLORS.purple}
          />
          <circle
            cx="27"
            cy="17"
            r="3"
            fill={expression === 'blocked' ? COLORS.amber : COLORS.purple}
          />
        </>
      );
  }
}

function Mouth({ expression }: { expression: MascotExpression }) {
  switch (expression) {
    case 'error':
      return (
        <path
          d="M18 25 q4 -3.5 8 0"
          stroke={COLORS.rose}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case 'sad':
      return (
        <path
          d="M18 25 q4 -4.5 8 0"
          stroke={COLORS.rose}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case 'thinking':
      return <path d="M19 24 h6" stroke={COLORS.amber} strokeWidth="2" strokeLinecap="round" />;

    case 'sleeping':
      return (
        <path
          d="M18 24 q4 2.5 8 0"
          stroke={COLORS.teal}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case 'blocked':
      return (
        <path
          d="M18 25 q4 -2.5 8 0"
          stroke={COLORS.amber}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case 'excited':
      // Open smile: clearly different from the normal closed smile.
      return (
        <path
          d="M17 23 q5 7 11 0"
          stroke={COLORS.green}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case 'loading':
      return (
        <circle
          className="mascot-loading-mouth"
          cx="22"
          cy="24"
          r="2.2"
          fill={COLORS.white}
          stroke={COLORS.teal}
          strokeWidth="1.6"
        />
      );

    case 'neutral':
      return <path d="M18 24 h8" stroke={COLORS.purple} strokeWidth="2" strokeLinecap="round" />;

    case 'happy':
    case 'float':
    case 'info':
    case 'wave':
    default:
      return (
        <path
          className="mascot-smile"
          d="M18 24 q4 3.5 8 0"
          stroke={COLORS.green}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );
  }
}

function TopAccessory({ expression }: { expression: MascotExpression }) {
  return (
    <rect
      className="mascot-top-accessory"
      x="14"
      y="3"
      width="16"
      height="5"
      rx="2.5"
      fill={expression === 'error' || expression === 'sad' ? COLORS.rose : COLORS.amber}
    />
  );
}

function SideAccessory({ expression }: { expression: MascotExpression }) {
  switch (expression) {
    case 'float':
      // The exact reference/info rays.
      return (
        <g className="mascot-float-rays">
          <path d="M39 11 l4 -4" stroke={COLORS.amber} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M40 20 h4" stroke={COLORS.amber} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M39 27 l4 4" stroke={COLORS.amber} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );

    case 'info':
      // Information state: small outlined information badge.
      return (
        <g className="mascot-info-mark">
          <circle
            cx="41"
            cy="10"
            r="3"
            fill={COLORS.white}
            stroke={COLORS.teal}
            strokeWidth="1.5"
          />
          <circle cx="41" cy="8.8" r="0.8" fill={COLORS.teal} />
          <path d="M41 10.5 v1.8" stroke={COLORS.teal} strokeWidth="1.4" strokeLinecap="round" />
        </g>
      );

    case 'excited':
      // Stronger burst than the info/float state.
      return (
        <g className="mascot-excited-burst">
          <path
            d="M39 9 l3 -3 M41 15 h4 M39 21 l3 3"
            stroke={COLORS.amber}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M35 4 l1.5 2.5 M35 27 l1.5 -2.5"
            stroke={COLORS.green}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
      );

    case 'wave':
      // A clearly visible raised hand/arm.
      return (
        <g className="mascot-wave-arm">
          <path
            d="M36 21 q4 -1 5 -6"
            stroke={COLORS.purple}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M40 15 q0 -4 2 -4 q2 0 1 3"
            stroke={COLORS.purple}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M42 10 l2 -2 M43 13 l3 -1 M42 16 l3 1"
            stroke={COLORS.amber}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      );

    case 'thinking':
      return (
        <g className="mascot-thinking-bubbles">
          <circle
            className="mascot-thinking-bubble-1"
            cx="41.5"
            cy="8"
            r="2.2"
            fill={COLORS.white}
            stroke={COLORS.amber}
            strokeWidth="1.2"
          />
          <circle
            className="mascot-thinking-bubble-2"
            cx="39.5"
            cy="12"
            r="1.5"
            fill={COLORS.white}
            stroke={COLORS.amber}
            strokeWidth="1.1"
          />
          <circle
            className="mascot-thinking-bubble-3"
            cx="37.5"
            cy="15.5"
            r="0.9"
            fill={COLORS.amber}
          />
        </g>
      );

    case 'sleeping':
      return (
        <g className="mascot-sleeping-zs">
          <text
            className="mascot-sleeping-z-1"
            x="38"
            y="10"
            fill={COLORS.purple}
            fontSize="5"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
          >
            z
          </text>
          <text
            className="mascot-sleeping-z-2"
            x="41"
            y="6"
            fill={COLORS.purple}
            fontSize="3.5"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
          >
            z
          </text>
          <text
            className="mascot-sleeping-z-3"
            x="43"
            y="3"
            fill={COLORS.purple}
            fontSize="2.5"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
          >
            z
          </text>
        </g>
      );

    case 'blocked':
      return (
        <path
          d="M39 12 l4 4 M43 12 l-4 4"
          stroke={COLORS.rose}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      );

    case 'loading':
      // Small teal activity marks outside the body make loading
      // visibly different from the normal face.
      return (
        <g className="mascot-loading-orbit">
          <circle cx="40" cy="10" r="1.3" fill={COLORS.teal} />
          <circle cx="43" cy="13" r="1" fill={COLORS.teal} />
          <circle cx="44" cy="17" r="0.8" fill={COLORS.teal} />
        </g>
      );

    default:
      return null;
  }
}

function MascotBody({ expression }: { expression: MascotExpression }) {
  const sideColor = expression === 'error' || expression === 'sad' ? COLORS.rose : COLORS.purple;

  return (
    <g className="mascot-body">
      {/* Main rounded robot body */}
      <rect
        x="8"
        y="6"
        width="28"
        height="24"
        rx="7"
        fill={COLORS.white}
        stroke={COLORS.purple}
        strokeWidth="2"
      />

      {/* Left ear */}
      <rect
        x="3.5"
        y="13"
        width="5"
        height="11"
        rx="2.5"
        fill={COLORS.white}
        stroke={sideColor}
        strokeWidth="1.8"
      />

      {/* Right ear */}
      <rect
        x="35.5"
        y="13"
        width="5"
        height="11"
        rx="2.5"
        fill={COLORS.white}
        stroke={sideColor}
        strokeWidth="1.8"
      />

      <Eyes expression={expression} />
      <Mouth expression={expression} />

      {/* Two small amber feet, retained from the original mascot */}
      <path
        d="M16 33 h12 M19 33 v4 M25 33 v4"
        stroke={COLORS.amber}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Sprintsheet mascot.
 *
 * Canonical visual language:
 * - purple rounded outline
 * - white body
 * - purple eyes
 * - green smile
 * - amber top cap + feet
 * - small state-specific marks
 *
 * The supplied "float/info" reference is the canonical happy/info state.
 */
export function Mascot({
  expression = 'neutral',
  size = 50,
  className,
  style,
  renderAnimation = false,
  label,
  decorative = true,
}: MascotProps) {
  const sizeProps =
    typeof size === 'number'
      ? {
          width: size,
          height: size * (40 / 44),
        }
      : {
          width: size,
          height: 'auto',
        };

  const animationClass = renderAnimation ? `mascot-animated mascot-${expression}` : '';

  return (
    <svg
      viewBox="0 0 44 40"
      xmlns="http://www.w3.org/2000/svg"
      className={[className, animationClass].filter(Boolean).join(' ')}
      style={{
        display: 'block',
        flexShrink: 0,
        overflow: 'visible',
        ...style,
      }}
      {...sizeProps}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : (label ?? `${expression} mascot`)}
      aria-hidden={decorative ? true : undefined}
    >
      <style>{`
                @media (prefers-reduced-motion: reduce) {
                    .mascot-animated,
                    .mascot-animated * {
                        animation: none !important;
                    }
                }

                .mascot-animated .mascot-body {
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Default: an almost imperceptible breathing motion. */
                .mascot-animated.mascot-neutral .mascot-body,
                .mascot-animated.mascot-happy .mascot-body,
                .mascot-animated.mascot-float .mascot-body,
                .mascot-animated.mascot-info .mascot-body {
                    animation: mascot-breathe 3.8s ease-in-out infinite;
                }

                /* Float: slightly more vertical because this is an explicit floating state. */
                .mascot-animated.mascot-float .mascot-body {
                    animation: mascot-float 3.2s cubic-bezier(.45, 0, .55, 1) infinite;
                }

                /* Happy: tiny cheerful lift + a slow natural wink. */
                .mascot-animated.mascot-happy .mascot-body {
                    animation: mascot-happy 3.6s ease-in-out infinite;
                }

                .mascot-animated.mascot-happy .mascot-wink-eye {
                    animation: mascot-wink 4.8s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Neutral intentionally stays visually calm and distinct from happy. */
                .mascot-animated.mascot-neutral .mascot-body {
                    animation: mascot-neutral 5s ease-in-out infinite;
                }

                /* Error: X eyes briefly tighten/pulse rather than shaking the whole face. */
                .mascot-animated.mascot-error .mascot-error-eyes {
                    animation: mascot-error-eyes 2.2s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Sad: downturned eyes slowly droop. */
                .mascot-animated.mascot-sad .mascot-sad-eyes {
                    animation: mascot-sad-eyes 3s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Sleeping: Zs rise, fade, and reset one after another. */
                .mascot-animated.mascot-sleeping .mascot-sleeping-z-1 {
                    animation: mascot-z 3s ease-out infinite;
                }

                .mascot-animated.mascot-sleeping .mascot-sleeping-z-2 {
                    animation: mascot-z 3s ease-out .8s infinite;
                }

                .mascot-animated.mascot-sleeping .mascot-sleeping-z-3 {
                    animation: mascot-z 3s ease-out 1.6s infinite;
                }

                /* Thinking: bubbles travel downward in a gentle stagger. */
                .mascot-animated.mascot-thinking .mascot-thinking-bubble-1 {
                    animation: mascot-think-bubble-1 2.4s ease-in-out infinite;
                }

                .mascot-animated.mascot-thinking .mascot-thinking-bubble-2 {
                    animation: mascot-think-bubble-2 2.4s ease-in-out .18s infinite;
                }

                .mascot-animated.mascot-thinking .mascot-thinking-bubble-3 {
                    animation: mascot-think-bubble-3 2.4s ease-in-out .36s infinite;
                }

                /* Excited: a soft spring once every cycle. */
                .mascot-animated.mascot-excited .mascot-body {
                    animation: mascot-excited 2.8s cubic-bezier(.34, 1.56, .64, 1) infinite;
                    transform-origin: center bottom;
                }

                .mascot-animated.mascot-excited .mascot-excited-burst {
                    animation: mascot-burst 2.8s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Wave: the body stays stable while the arm gently waves. */
                .mascot-animated.mascot-wave .mascot-wave-arm {
                    animation: mascot-wave 1.8s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: 0% 100%;
                }

                /* Info: badge gently pulses. */
                .mascot-animated.mascot-info .mascot-info-mark {
                    animation: mascot-info 2.2s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Loading: fixed dashed circular eyes; the dashes rotate in place. */
                .mascot-animated.mascot-loading .mascot-loading-eye {
                    transform-box: fill-box;
                    transform-origin: center;
                }

                .mascot-animated.mascot-loading .mascot-loading-eye-1 {
                    animation: mascot-loading-ring 1.4s linear infinite;
                }

                .mascot-animated.mascot-loading .mascot-loading-eye-2 {
                    animation: mascot-loading-ring-reverse 1.4s linear infinite;
                }

                .mascot-animated.mascot-loading .mascot-loading-mouth {
                    animation: mascot-loading-mouth 1.4s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                .mascot-animated.mascot-loading .mascot-loading-orbit {
                    animation: mascot-orbit 1.8s linear infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                /* Thinking: tiny "ponder" movement. */
                .mascot-animated.mascot-thinking .mascot-body {
                    animation: mascot-think 3.2s ease-in-out infinite;
                    transform-origin: center;
                }

                /* Sleeping: slow breathing. */
                .mascot-animated.mascot-sleeping .mascot-body {
                    animation: mascot-sleep 4.5s ease-in-out infinite;
                    transform-origin: center bottom;
                }

                /* Error / blocked / sad: restrained wobble, not an attention-seeking shake. */
                .mascot-animated.mascot-error .mascot-body,
                .mascot-animated.mascot-blocked .mascot-body,
                .mascot-animated.mascot-sad .mascot-body {
                    animation: mascot-concern 2.6s ease-in-out infinite;
                    transform-origin: center;
                }

                .mascot-animated .mascot-top-accessory {
                    transform-box: fill-box;
                    transform-origin: center;
                }

                .mascot-animated.mascot-excited .mascot-top-accessory {
                    animation: mascot-cap 2.8s ease-in-out infinite;
                }

                @keyframes mascot-breathe {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-0.7px); }
                }

                @keyframes mascot-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                }

                @keyframes mascot-neutral {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-0.35px); }
                }

                @keyframes mascot-wink {
                    0%, 72%, 100% { transform: scaleY(1); }
                    76% { transform: scaleY(.08); }
                    80% { transform: scaleY(1); }
                }

                @keyframes mascot-error-eyes {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    35% { transform: scale(.92); opacity: .78; }
                    55% { transform: scale(1); opacity: 1; }
                }

                @keyframes mascot-sad-eyes {
                    0%, 100% { transform: translateY(0); opacity: .9; }
                    50% { transform: translateY(1px); opacity: .65; }
                }

                @keyframes mascot-z {
                    0% { opacity: 0; transform: translate(0, 2px) scale(.75); }
                    15% { opacity: 1; }
                    70% { opacity: .8; }
                    100% { opacity: 0; transform: translate(2px, -7px) scale(1.15); }
                }

                @keyframes mascot-loading-ring {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes mascot-loading-ring-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes mascot-loading-mouth {
                    0%, 100% { opacity: .45; }
                    50% { opacity: 1; }
                }

                @keyframes mascot-think-bubble-1 {
                    0% { opacity: 0; transform: translate(0, -1px) scale(.75); }
                    20% { opacity: 1; }
                    70% { opacity: .65; transform: translate(-1px, 2px) scale(1); }
                    100% { opacity: 0; transform: translate(-2px, 4px) scale(.85); }
                }

                @keyframes mascot-think-bubble-2 {
                    0% { opacity: 0; transform: translate(1px, -1px) scale(.7); }
                    20% { opacity: 1; }
                    70% { opacity: .7; transform: translate(-1px, 2px) scale(1); }
                    100% { opacity: 0; transform: translate(-2px, 4px) scale(.8); }
                }

                @keyframes mascot-think-bubble-3 {
                    0% { opacity: 0; transform: translate(1px, -1px) scale(.65); }
                    20% { opacity: 1; }
                    70% { opacity: .75; transform: translate(-1px, 2px) scale(1.05); }
                    100% { opacity: 0; transform: translate(-2px, 4px) scale(.75); }
                }

                @keyframes mascot-happy {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    35% { transform: translateY(-1px) rotate(-0.5deg); }
                    65% { transform: translateY(-0.4px) rotate(0.5deg); }
                }

                @keyframes mascot-excited {
                    0%, 72%, 100% { transform: translateY(0) scale(1); }
                    80% { transform: translateY(-1.2px) scale(1.025); }
                    88% { transform: translateY(0) scale(.995); }
                }

                @keyframes mascot-burst {
                    0%, 70%, 100% { opacity: .9; transform: scale(1); }
                    80% { opacity: 1; transform: scale(1.08); }
                    90% { opacity: .9; transform: scale(1); }
                }

                @keyframes mascot-wave {
                    0%, 100% { transform: rotate(0deg); }
                    20% { transform: rotate(5deg); }
                    45% { transform: rotate(-6deg); }
                    70% { transform: rotate(4deg); }
                }

                @keyframes mascot-info {
                    0%, 100% { opacity: .65; transform: scale(.94); }
                    50% { opacity: 1; transform: scale(1.06); }
                }

                @keyframes mascot-dot {
                    0%, 100% { opacity: .35; transform: scale(.82); }
                    50% { opacity: 1; transform: scale(1.12); }
                }

                @keyframes mascot-orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes mascot-think {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    40% { transform: translateX(-.7px) rotate(-1deg); }
                    70% { transform: translateX(.7px) rotate(1deg); }
                }

                @keyframes mascot-sleep {
                    0%, 100% { transform: translateY(0) scaleY(1); }
                    50% { transform: translateY(.6px) scaleY(.985); }
                }

                @keyframes mascot-concern {
                    0%, 100% { transform: rotate(0deg); }
                    20% { transform: rotate(-1deg); }
                    40% { transform: rotate(.7deg); }
                    60% { transform: rotate(0deg); }
                }

                @keyframes mascot-cap {
                    0%, 72%, 100% { transform: translateY(0); }
                    82% { transform: translateY(-1.5px); }
                    90% { transform: translateY(0); }
                }
            `}</style>

      <TopAccessory expression={expression} />
      <MascotBody expression={expression} />
      <SideAccessory expression={expression} />
    </svg>
  );
}

export default Mascot;
