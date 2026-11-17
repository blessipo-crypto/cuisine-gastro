import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import { GalleryPhoto } from '../types/chef';
import { ResilientImage } from './ResilientImage';

interface InteractivePhotoGalleryProps {
  photos: GalleryPhoto[];
  dishTitle: string;
  chefName: string;
}

export const InteractivePhotoGallery: React.FC<InteractivePhotoGalleryProps> = ({
  photos,
  dishTitle,
  chefName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOrigin, setPanOrigin] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentPhoto = photos[activeIndex] || photos[0];

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    setActiveIndex(0);
    setIsZoomed(false);
  }, [dishTitle]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPanOrigin({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="space-y-5">
      {/* Main Interactive Gallery Viewport (Strict 16:9 Dish Aspect Ratio) */}
      <div className="relative bg-[#F3F1EC] border border-[#E5E2DC] overflow-hidden">
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed((z) => !z)}
          className={`relative aspect-[16/9] overflow-hidden select-none ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <ResilientImage
            src={currentPhoto.url}
            alt={`${currentPhoto.title} — ${dishTitle}`}
            fallbackTitle={currentPhoto.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out"
            style={{
              transform: isZoomed ? 'scale(1.85)' : 'scale(1)',
              transformOrigin: `${panOrigin.x}% ${panOrigin.y}%`,
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#141413]/85 via-[#141413]/30 to-transparent pointer-events-none" />

          {/* Gallery Toolbar Controls (48px+ touch targets) */}
          <div
            className="absolute top-3.5 right-3.5 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomed((z) => !z)}
              aria-label={isZoomed ? 'Désactiver le zoom' : 'Inspecter en détail'}
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#141413]/80 hover:bg-[#141413] text-[#FAF9F6] text-[11px] uppercase tracking-[0.14em] font-medium border border-white/15 transition-colors cursor-pointer"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                  <span>1×</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                  <span>Inspecter</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label="Agrandir la galerie en plein écran"
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#141413]/80 hover:bg-[#9E1B24] text-[#FAF9F6] text-[11px] uppercase tracking-[0.14em] font-medium border border-white/15 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
              <span className="hidden sm:inline">Plein écran</span>
            </button>
          </div>

          {/* Left / Right Navigation Arrows (48x48px touch targets) */}
          {photos.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-4 pointer-events-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Photo précédente"
                className="pointer-events-auto min-w-[48px] min-h-[48px] bg-[#141413]/75 hover:bg-[#141413] text-[#FAF9F6] border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.35} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Photo suivante"
                className="pointer-events-auto min-w-[48px] min-h-[48px] bg-[#141413]/75 hover:bg-[#141413] text-[#FAF9F6] border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.35} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Bottom Scrim Metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-[#FAF9F6] flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89758]">
                {currentPhoto.angle} · {currentPhoto.focalNote}
              </p>
              <p className="font-serif text-xl sm:text-2xl font-normal mt-0.5">
                {currentPhoto.title}
              </p>
            </div>
            <span className="font-mono text-xs text-[#E5E2DC] tabular-nums shrink-0">
              Planche 0{activeIndex + 1} / 0{photos.length}
            </span>
          </div>
        </div>

        {/* Archival Figure Caption Bar */}
        <div className="px-5 sm:px-6 py-4 bg-white border-t border-[#E5E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="font-serif italic text-base sm:text-lg text-[#141413]">
            {currentPhoto.caption}
          </p>
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57] whitespace-nowrap shrink-0">
            {isZoomed ? 'Déplacez pour explorer la matière' : 'Touchez l’image pour zoomer'}
          </span>
        </div>
      </div>

      {/* Interactive Thumbnail Selector Strip (Strict 4:3 Dish Ratio & 8px+ gap) */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        role="tablist"
        aria-label="Miniatures du plat emblématique"
      >
        {photos.map((photo, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={photo.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setIsZoomed(false);
                setActiveIndex(idx);
              }}
              className={`min-h-[48px] group text-left overflow-hidden border transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                isActive
                  ? 'border-[#B89758] ring-1 ring-[#B89758]'
                  : 'border-[#E5E2DC] opacity-75 hover:opacity-100 hover:border-[#B89758]/60'
              }`}
            >
              <div className="aspect-[4/3] bg-[#F3F1EC] overflow-hidden">
                <ResilientImage
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-2.5 bg-white">
                <p className="font-mono text-[10px] text-[#B89758] tabular-nums">
                  Planche 0{idx + 1}
                </p>
                <p className="text-xs font-medium text-[#141413] truncate mt-0.5">
                  {photo.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          style={{
            paddingTop: 'max(1.25rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
          }}
          className="fixed inset-0 z-[70] bg-[#141413]/96 flex flex-col justify-between p-4 sm:p-10 overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie plein écran : ${dishTitle}`}
        >
          <div className="flex items-center justify-between text-[#FAF9F6] border-b border-white/15 pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89758]">
                {chefName} · Création Signature
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF9F6] mt-0.5">
                {dishTitle}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Fermer le plein écran"
              className="min-w-[48px] min-h-[48px] border border-white/20 hover:bg-[#9E1B24] text-[#FAF9F6] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.35} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Image précédente"
              className="absolute left-2 sm:left-4 z-10 min-w-[48px] min-h-[48px] bg-[#141413]/80 hover:bg-[#9E1B24] border border-white/20 text-[#FAF9F6] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.35} aria-hidden="true" />
            </button>

            <ResilientImage
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="w-full max-w-4xl aspect-[16/9] max-h-[72dvh] object-cover"
            />

            <button
              type="button"
              onClick={handleNext}
              aria-label="Image suivante"
              className="absolute right-2 sm:right-4 z-10 min-w-[48px] min-h-[48px] bg-[#141413]/80 hover:bg-[#9E1B24] border border-white/20 text-[#FAF9F6] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={1.35} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15 pt-4 text-[#E5E2DC]">
            <div>
              <p className="font-serif italic text-lg text-[#FAF9F6]">
                {currentPhoto.caption}
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89758] mt-1">
                {currentPhoto.angle} · {currentPhoto.focalNote}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`min-w-[48px] min-h-[48px] px-3 py-1.5 text-xs font-mono border cursor-pointer transition-colors ${
                    i === activeIndex
                      ? 'bg-[#B89758] text-[#141413] border-[#B89758]'
                      : 'bg-transparent text-[#E5E2DC] border-white/20 hover:border-white/50'
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
