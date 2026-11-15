import React from 'react';
import { Images, ArrowUpRight } from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';

interface FeaturedDishesGalleryProps {
  chefs: Chef[];
  onSelectDishGallery: (chef: Chef) => void;
  onSelectDishRecipe: (chef: Chef) => void;
}

export const FeaturedDishesGallery: React.FC<FeaturedDishesGalleryProps> = ({
  chefs,
  onSelectDishGallery,
  onSelectDishRecipe,
}) => {
  // Curate 6 visually distinct signature dishes across diverse culinary families
  const featuredIds = [
    'alain-passard',
    'arnaud-donckele',
    'regis-jacques-marcon',
    'yoshihiro-murata',
    'massimo-bottura',
    'jessica-prealpato',
  ];
  const featuredChefs = featuredIds
    .map((id) => chefs.find((c) => c.id === id))
    .filter((c): c is Chef => Boolean(c));

  return (
    <section
      id="plats-phares"
      aria-label="Galerie des plats emblématiques"
      className="py-14 lg:py-20 border-t border-stone-200 bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
              Plats Phares · Sélection Curatée
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900 mt-1 text-balance">
              Galeries Photographiques des Créations Emblématiques
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Chaque plat phare dispose d’une galerie interactive multi-angles avec inspection zoom et
            fiche recette proportionnelle.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredChefs.map((chef, index) => {
            const cover = chef.signatureRecipe.gallery[0];
            return (
              <article
                key={chef.id}
                className="group border border-stone-200 rounded-lg overflow-hidden bg-[#FBF9F5] flex flex-col justify-between transition-colors hover:border-stone-400"
              >
                <div>
                  <div
                    onClick={() => onSelectDishGallery(chef)}
                    className="relative aspect-[4/3] overflow-hidden bg-[#EBE6DF] cursor-pointer"
                  >
                    <ResilientImage
                      src={cover.url}
                      alt={chef.signatureRecipe.title}
                      fallbackTitle={chef.signatureRecipe.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#FBF9F5]">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-stone-200">
                        Planche 0{index + 1} · {chef.city}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs">
                        <Images className="w-3.5 h-3.5" aria-hidden="true" />
                        {chef.signatureRecipe.gallery.length} vues
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="font-mono text-xs text-stone-500">
                      {chef.name} · {chef.restaurant} · {'★'.repeat(chef.stars)}
                    </p>
                    <h3 className="mt-1.5 font-serif text-xl font-semibold text-stone-900 leading-snug">
                      {chef.signatureRecipe.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {chef.signatureRecipe.story}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-stone-200 bg-white flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDishGallery(chef)}
                    className="text-xs font-semibold text-[#991B1B] hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Ouvrir la galerie interactive
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectDishRecipe(chef)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    <span>Recette</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
