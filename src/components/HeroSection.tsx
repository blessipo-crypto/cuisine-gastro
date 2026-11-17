import React from 'react';
import { MichelinStarIcon } from './MichelinStars';
import { MainSectionTab } from './Header';

interface HeroSectionProps {
  totalChefs: number;
  totalStars: number;
  totalLocations: number;
  totalGalleryImages: number;
  onSelectSection: (section: MainSectionTab) => void;
  onOpenFeaturedChef: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalChefs,
  totalStars,
  totalLocations,
  totalGalleryImages,
  onSelectSection,
  onOpenFeaturedChef,
}) => {
  return (
    <section id="accueil" className="border-b border-[#E5E2DC] bg-[#FAF9F6]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-9 lg:py-11">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 mb-2.5">
              <span className="w-5 h-[1px] bg-[#B89758]" aria-hidden="true" />
              <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] font-medium text-[#B89758]">
                Collection Haute Gastronomie · Édition Internationale
              </p>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-[#141413] text-balance">
              L’Art & la Matière des Tables Étoilées
            </h1>

            <p className="mt-2.5 text-base leading-[1.55] text-[#5C5B57] max-w-2xl">
              Sélectionnez un onglet ci-dessous pour parcourir les chefs étoilés, leurs recettes
              signatures, leurs galeries photographiques et leurs gestes techniques sans défilement
              superflu.
            </p>
          </div>

          {/* Compact Key Metrics & Featured Monograph Button */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E5E2DC]">
            <div className="flex items-center gap-5 sm:gap-6">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] tabular-nums leading-none">
                  {totalChefs}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5B57]">
                  Maisons
                </p>
              </div>

              <div className="h-7 w-[1px] bg-[#E5E2DC]" aria-hidden="true" />

              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-serif text-2xl sm:text-3xl font-medium text-[#9E1B24] tabular-nums leading-none">
                    {totalStars}
                  </p>
                  <MichelinStarIcon className="w-4 h-4" variant="carmine" />
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5B57]">
                  Étoiles
                </p>
              </div>

              <div className="h-7 w-[1px] bg-[#E5E2DC]" aria-hidden="true" />

              <div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] tabular-nums leading-none">
                  {totalLocations}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5B57]">
                  Territoires
                </p>
              </div>

              <div className="hidden sm:block h-7 w-[1px] bg-[#E5E2DC]" aria-hidden="true" />

              <div className="hidden sm:block">
                <p className="font-serif text-2xl sm:text-3xl font-medium text-[#B89758] tabular-nums leading-none">
                  {totalGalleryImages}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5B57]">
                  Planches
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onOpenFeaturedChef}
                className="min-h-[48px] px-4 py-2 bg-white border border-[#E5E2DC] hover:border-[#B89758] text-xs uppercase tracking-[0.14em] font-medium text-[#141413] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                À la Une : <span className="text-[#9E1B24]">Anne-Sophie Pic</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSection('recettes')}
                className="min-h-[48px] px-4 py-2 bg-[#141413] hover:bg-[#9E1B24] text-xs uppercase tracking-[0.14em] font-medium text-[#FAF9F6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Grandes Recettes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
