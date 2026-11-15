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
    <div className="space-y-4">
      {/* Main Interactive Gallery Viewport */}
      <div className="relative bg-[#EBE6DF] border border-stone-200 rounded-lg overflow-hidden">
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed((z) => !z)}
          className={`relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <ResilientImage
            src={currentPhoto.url}
            alt={`${currentPhoto.title} — ${dishTitle}`}
            fallbackTitle={currentPhoto.title}
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{
              transform: isZoomed ? 'scale(1.85)' : 'scale(1)',
              transformOrigin: `${panOrigin.x}% ${panOrigin.y}%`,
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

          {/* Gallery Toolbar Controls */}
          <div
            className="absolute top-3 right-3 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomed((z) => !z)}
              aria-label={isZoomed ? 'Désactiver le zoom' : 'Inspecter en détail'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900/80 hover:bg-stone-900 text-[#FBF9F5] text-xs font-medium transition-colors cursor-pointer"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>1×</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Inspecter</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label="Agrandir la galerie en plein écran"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900/80 hover:bg-[#991B1B] text-[#FBF9F5] text-xs font-medium transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Plein écran</span>
            </button>
          </div>

          {/* Left / Right Navigation Arrows */}
          {photos.length > 1 && (
            <div
              className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Photo précédente"
                className="pointer-events-auto w-10 h-10 rounded-md bg-stone-900/75 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Photo suivante"
                className="pointer-events-auto w-10 h-10 rounded-md bg-stone-900/75 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Bottom Scrim Metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-[#FBF9F5] flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-stone-300">
                {currentPhoto.angle} · {currentPhoto.focalNote}
              </p>
              <p className="font-serif text-lg sm:text-xl font-medium mt-0.5">
                {currentPhoto.title}
              </p>
            </div>
            <span className="font-mono text-xs text-stone-200 tabular-nums shrink-0">
              Planche {activeIndex + 1} / {photos.length}
            </span>
          </div>
        </div>

        {/* Archival Figure Caption Bar */}
        <div className="px-5 py-3.5 bg-[#FBF9F5] border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="font-serif italic text-sm text-stone-700">
            {currentPhoto.caption}
          </p>
          <span className="font-mono text-[11px] text-stone-500 whitespace-nowrap shrink-0">
            {isZoomed ? 'Déplacez le curseur pour explorer la texture' : 'Cliquez sur l’image pour zoomer'}
          </span>
        </div>
      </div>

      {/* Interactive Thumbnail Selector Strip */}
      <div className="grid grid-cols-4 gap-3" role="tablist" aria-label="Miniatures du plat emblématique">
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
              className={`group text-left rounded-md overflow-hidden border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] ${
                isActive
                  ? 'border-[#991B1B] ring-1 ring-[#991B1B]'
                  : 'border-stone-200 opacity-75 hover:opacity-100 hover:border-stone-400'
              }`}
            >
              <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                <ResilientImage
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-2.5 py-2 bg-white">
                <p className="font-mono text-[10px] text-stone-400 tabular-nums">
                  Fig. 0{idx + 1}
                </p>
                <p className="text-xs font-medium text-stone-800 truncate">
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
          className="fixed inset-0 z-[70] bg-stone-950/95 flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie plein écran : ${dishTitle}`}
        >
          <div className="flex items-center justify-between text-stone-200 border-b border-stone-800 pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
                {chefName} · Plat Emblématique
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-white mt-0.5">
                {dishTitle}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Fermer le plein écran"
              className="w-10 h-10 rounded-md bg-stone-800 hover:bg-[#991B1B] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Image précédente"
              className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-md bg-stone-900/80 hover:bg-[#991B1B] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            <ResilientImage
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-h-[72vh] max-w-full object-contain rounded"
            />

            <button
              type="button"
              onClick={handleNext}
              aria-label="Image suivante"
              className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-md bg-stone-900/80 hover:bg-[#991B1B] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-800 pt-4 text-stone-300">
            <div>
              <p className="font-serif italic text-base text-white">
                {currentPhoto.caption}
              </p>
              <p className="font-mono text-xs text-stone-400 mt-1">
                {currentPhoto.angle} · {currentPhoto.focalNote}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                    i === activeIndex
                      ? 'bg-[#991B1B] text-white'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
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
