import React from 'react';
import { Images, ArrowUpRight, Clock } from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';
import { MichelinStars } from './MichelinStars';

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
      className="py-16 sm:py-20 lg:py-28 border-t border-[#E5E2DC] bg-white"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E5E2DC]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
              Portfolio Photographique · Créations Signatures
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413] mt-2 text-balance">
              Planches & Dressages d’Exception
            </h2>
          </div>
          <p className="text-base text-[#5C5B57] max-w-md leading-[1.55]">
            Chaque création emblématique dispose d’une galerie interactive multi-angles avec loupe
            d’inspection et fiche technique proportionnelle.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredChefs.map((chef, index) => {
            const cover = chef.signatureRecipe.gallery[0];
            const totalTime =
              chef.signatureRecipe.prepTimeMinutes + chef.signatureRecipe.cookTimeMinutes;
            return (
              <article
                key={chef.id}
                className="group border border-[#E5E2DC] bg-[#FAF9F6] flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#B89758]/70 hover:shadow-[0_18px_40px_-16px_rgba(20,20,19,0.08)]"
              >
                <div>
                  {/* Strict 4:3 Dish Photo Aspect Ratio with object-cover */}
                  <div
                    onClick={() => onSelectDishGallery(chef)}
                    className="relative aspect-[4/3] overflow-hidden bg-[#F3F1EC] cursor-pointer"
                  >
                    <ResilientImage
                      src={cover.url}
                      alt={chef.signatureRecipe.title}
                      fallbackTitle={chef.signatureRecipe.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/80 via-[#141413]/15 to-transparent" />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#FAF9F6]/95 border border-[#E5E2DC]">
                      <MichelinStars
                        stars={chef.stars}
                        greenStar={chef.greenStar}
                        size="xs"
                        variant="carmine"
                      />
                    </div>
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[#FAF9F6]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B89758]">
                        Planche 0{index + 1} · {chef.city}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#E5E2DC]">
                        <Images className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                        {chef.signatureRecipe.gallery.length} vues
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#5C5B57]">
                      <span>
                        {chef.name} · <span className="italic font-serif text-sm">{chef.restaurant}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] tabular-nums shrink-0">
                        <Clock className="w-3 h-3 text-[#B89758]" strokeWidth={1.35} />
                        {totalTime} min
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-2xl font-medium text-[#141413] leading-snug">
                      {chef.signatureRecipe.title}
                    </h3>
                    <p className="mt-2.5 text-base text-[#5C5B57] leading-[1.55] line-clamp-2">
                      {chef.signatureRecipe.story}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-7 py-2.5 border-t border-[#E5E2DC] bg-white flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDishGallery(chef)}
                    className="min-h-[48px] px-2 inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#9E1B24] hover:text-[#141413] transition-colors cursor-pointer"
                  >
                    Ouvrir la Galerie
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectDishRecipe(chef)}
                    className="min-h-[48px] px-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-[#5C5B57] hover:text-[#141413] transition-colors cursor-pointer"
                  >
                    <span>Partition</span>
                    <ArrowUpRight className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
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
