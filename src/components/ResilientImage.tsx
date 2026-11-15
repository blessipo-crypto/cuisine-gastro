import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  style?: React.CSSProperties;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  style,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EBE6DF] text-stone-600 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Utensils className="w-6 h-6 text-stone-500 mb-2" aria-hidden="true" />
        <span className="font-serif italic text-sm text-stone-700 max-w-xs">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      style={style}
      loading="lazy"
    />
  );
};
