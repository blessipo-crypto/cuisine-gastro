import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ASSETS } from '../data/chefs';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  totalChefs: number;
  totalStars: number;
  totalLocations: number;
  totalGalleryImages: number;
  onExploreClick: () => void;
  onOpenFeaturedChef: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalChefs,
  totalStars,
  totalLocations,
  totalGalleryImages,
  onExploreClick,
  onOpenFeaturedChef,
}) => {
  return (
    <section id="accueil" className="border-b border-stone-200 bg-[#FBF9F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Lead */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#991B1B] mb-4">
                Monographie Internationale · Guide & Recettes
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-stone-900 text-balance">
                Les Maîtres de la Haute Gastronomie Mondiale
              </h1>

              <p className="mt-6 text-base lg:text-[17px] leading-relaxed text-stone-600 max-w-xl">
                Un répertoire encyclopédique consacré aux grands restaurants et chefs étoilés de
                France et du monde : biographies, années d’obtention des distinctions, recherche
                indexée par ville, département ou spécialité, coordonnées directes des maisons,
                fiches techniques et galeries photographiques interactives.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FBF9F5] bg-[#991B1B] hover:bg-stone-900 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
              >
                <span>Explorer le Répertoire</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenFeaturedChef}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-800 bg-[#F3EFE7] hover:bg-stone-200/80 border border-stone-300 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-700"
              >
                <span>Portrait à la Une : Anne-Sophie Pic</span>
              </button>
            </div>
          </div>

          {/* Right Column: Full-height Visual Container */}
          <div className="lg:col-span-6 flex flex-col">
            <figure className="relative flex-1 min-h-[300px] lg:min-h-[420px] rounded-lg overflow-hidden border border-stone-200 bg-stone-200">
              <ResilientImage
                src={ASSETS.heroAtelier}
                alt="Brigade et chef étoilé dressant une assiette gastronomique au passe central"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-[#FBF9F5]">
                <span className="block font-mono text-[11px] uppercase tracking-widest text-stone-300">
                  Fig. 01 · Atelier de Haute Cuisine
                </span>
                <span className="block font-serif italic text-lg mt-0.5">
                  L’instant décisif au passe : précision du geste, sauces réduites et dressage à la pince.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Curatorial Index Strip below Hero Split */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="font-mono text-2xl lg:text-3xl font-medium text-stone-900 tabular-nums">
              {totalChefs}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Maisons & Chefs Étoilés
            </p>
          </div>

          <div>
            <p className="font-mono text-2xl lg:text-3xl font-medium text-[#991B1B] tabular-nums">
              {totalStars} ★
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Étoiles Michelin Cumulées
            </p>
          </div>

          <div>
            <p className="font-mono text-2xl lg:text-3xl font-medium text-stone-900 tabular-nums">
              {totalLocations}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Départements & Régions du Monde
            </p>
          </div>

          <div>
            <p className="font-mono text-2xl lg:text-3xl font-medium text-stone-900 tabular-nums">
              {totalGalleryImages}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Planches Photo & Recettes Phares
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
