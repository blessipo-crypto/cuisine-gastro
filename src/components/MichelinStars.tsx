import React from 'react';
import { StarCount } from '../types/chef';

interface MichelinStarIconProps {
  className?: string;
  variant?: 'carmine' | 'champagne' | 'light';
}

/**
 * Custom bespoke 6-petal Michelin-inspired macaron/rosette vector icon
 * with ultra-fine 1.25px stroke and refined geometry.
 */
export const MichelinStarIcon: React.FC<MichelinStarIconProps> = ({
  className = 'w-3.5 h-3.5',
  variant = 'carmine',
}) => {
  const colorClass =
    variant === 'carmine'
      ? 'text-[#9E1B24]'
      : variant === 'champagne'
        ? 'text-[#B89758]'
        : 'text-[#FAF9F6]';

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${colorClass} ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2.25c1.1 0 1.85 1.15 1.55 2.2l-.85 3.1 2.27-2.27c.78-.78 2.08-.52 2.48.5.4 1.02-.22 2.13-1.28 2.4l-3.1.85 3.1.85c1.06.27 1.68 1.38 1.28 2.4-.4 1.02-1.7 1.28-2.48.5l-2.27-2.27.85 3.1c.3 1.05-.45 2.2-1.55 2.2s-1.85-1.15-1.55-2.2l.85-3.1-2.27 2.27c-.78.78-2.08.52-2.48-.5-.4-1.02.22-2.13 1.28-2.4l3.1-.85-3.1-.85c-1.06-.27-1.68-1.38-1.28-2.4.4-1.02 1.7-1.28 2.48-.5l2.27 2.27-.85-3.1c-.3-1.05.45-2.2 1.55-2.2z" />
      <circle cx="12" cy="12" r="2.1" fill="#FAF9F6" stroke="none" />
    </svg>
  );
};

export const GreenStarIcon: React.FC<{ className?: string }> = ({
  className = 'w-3.5 h-3.5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.35"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block shrink-0 text-emerald-700 ${className}`}
    aria-hidden="true"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

interface MichelinStarsProps {
  stars: StarCount;
  greenStar?: boolean;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'carmine' | 'champagne' | 'light';
  showLabel?: boolean;
}

export const MichelinStars: React.FC<MichelinStarsProps> = ({
  stars,
  greenStar,
  size = 'sm',
  variant = 'carmine',
  showLabel = false,
}) => {
  const iconSize =
    size === 'xs' ? 'w-3 h-3' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-label={`${stars} ${stars > 1 ? 'Étoiles' : 'Étoile'} Michelin${greenStar ? ' et Étoile Verte' : ''}`}
    >
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: stars }).map((_, i) => (
          <MichelinStarIcon key={i} className={iconSize} variant={variant} />
        ))}
      </span>
      {showLabel && (
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] tabular-nums">
          {stars} {stars > 1 ? 'Étoiles' : 'Étoile'}
        </span>
      )}
      {greenStar && (
        <span
          className="inline-flex items-center gap-1 pl-1 border-l border-[#E5E2DC]/60"
          title="Étoile Verte Michelin — Gastronomie Durable"
        >
          <GreenStarIcon className={iconSize} />
        </span>
      )}
    </span>
  );
};
