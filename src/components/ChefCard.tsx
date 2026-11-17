import React from 'react';
import { Bookmark, ArrowUpRight, Images, Phone, ExternalLink, Clock } from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';
import { MichelinStars } from './MichelinStars';

interface ChefCardProps {
  chef: Chef;
  isSaved: boolean;
  onToggleSave: (chefId: string) => void;
  onSelectChef: (
    chef: Chef,
    initialTab?: 'bio' | 'gallery' | 'recipe' | 'glossary'
  ) => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({
  chef,
  isSaved,
  onToggleSave,
  onSelectChef,
}) => {
  const coverImage = chef.signatureRecipe.gallery[0];
  const totalTimeMinutes =
    chef.signatureRecipe.prepTimeMinutes + chef.signatureRecipe.cookTimeMinutes;

  return (
    <article className="group bg-white border border-[#E5E2DC] flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#B89758]/70 shadow-[0_6px_28px_-16px_rgba(20,20,19,0.06)] hover:shadow-[0_20px_44px_-18px_rgba(20,20,19,0.10)]">
      <div>
        {/* 4:5 Art-Gallery Portrait Ratio for Chef Card */}
        <div
          onClick={() => onSelectChef(chef, 'bio')}
          className="relative aspect-[4/5] overflow-hidden bg-[#F3F1EC] cursor-pointer"
        >
          <ResilientImage
            src={coverImage.url}
            alt={`${chef.name} — ${chef.signatureRecipe.title}`}
            fallbackTitle={chef.signatureRecipe.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/85 via-[#141413]/20 to-transparent" />

          {/* Top-left Distinction Ribbon on Image */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FAF9F6]/95 backdrop-blur-xs border border-[#E5E2DC] flex items-center gap-2">
            <MichelinStars
              stars={chef.stars}
              greenStar={chef.greenStar}
              size="xs"
              variant="carmine"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5C5B57] tabular-nums">
              {chef.starYear}
            </span>
          </div>

          {/* Top-right Save Bookmark Button (48x48px Touch Target) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(chef.id);
            }}
            aria-label={
              isSaved
                ? `Retirer ${chef.name} du carnet`
                : `Enregistrer ${chef.name} dans le carnet`
            }
            className={`absolute top-3 right-3 min-w-[48px] min-h-[48px] flex items-center justify-center border transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
              isSaved
                ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                : 'bg-[#141413]/65 text-[#FAF9F6] border-white/20 hover:bg-[#141413]'
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              strokeWidth={1.35}
              fill={isSaved ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          </button>

          {/* Bottom Scrim Overlay: Signature Creation Caption, Time/Difficulty & Photo Count */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3 text-[#FAF9F6]">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89758]">
                Création Signature
              </p>
              <p className="font-serif italic text-lg leading-snug text-[#FAF9F6] line-clamp-2 mt-0.5">
                {chef.signatureRecipe.title}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#E5E2DC] tabular-nums">
                <Clock className="w-3 h-3 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                <span>
                  {totalTimeMinutes} min · {chef.signatureRecipe.difficulty}
                </span>
              </p>
            </div>
            <span className="font-mono text-[11px] text-[#E5E2DC] whitespace-nowrap shrink-0 inline-flex items-center gap-1">
              <Images className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
              {chef.signatureRecipe.gallery.length}
            </span>
          </div>
        </div>

        {/* Card Body: Strict Editorial Alignment */}
        <div className="p-6 sm:p-7">
          {/* 1. Chef Name in Editorial Serif */}
          <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#141413] leading-tight">
            <button
              type="button"
              onClick={() => onSelectChef(chef, 'bio')}
              className="min-h-[48px] inline-flex items-center text-left hover:text-[#9E1B24] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:underline"
            >
              {chef.name}
            </button>
          </h3>

          {/* 2. Iconic Restaurant Name Immediately Below */}
          <p className="mt-0.5 font-serif italic text-lg text-[#5C5B57] line-clamp-1">
            {chef.restaurant}
          </p>

          {/* 3. Discrete Location & Culinary Style */}
          <div className="mt-3 pt-3 border-t border-[#E5E2DC] flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
            <span>
              {chef.city} · {chef.departmentCode} · {chef.country}
            </span>
            <span className="text-[#B89758] font-medium truncate max-w-[180px]">
              {chef.cuisineType}
            </span>
          </div>

          {/* 4. Specialties & Direct Contact Links (48px touch height) */}
          <p className="mt-3 text-sm text-[#5C5B57] line-clamp-1 leading-relaxed">
            {chef.specialties.slice(0, 3).join(' · ')}
          </p>

          {(chef.phone || chef.website) && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#5C5B57]">
              {chef.phone && (
                <a
                  href={`tel:${chef.phone.replace(/\s+/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="min-h-[48px] px-2.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#5C5B57] hover:text-[#141413] bg-[#FAF9F6] border border-[#E5E2DC] transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                  <span>{chef.phone}</span>
                </a>
              )}
              {chef.website && (
                <a
                  href={chef.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="min-h-[48px] px-2.5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-medium text-[#5C5B57] hover:text-[#9E1B24] bg-[#FAF9F6] border border-[#E5E2DC] transition-all"
                >
                  <span>Maison officielle</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions (48px+ touch targets & 8px+ gap) */}
      <div className="px-5 sm:px-7 py-2.5 bg-[#FAF9F6] border-t border-[#E5E2DC] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectChef(chef, 'gallery')}
            className="min-h-[48px] px-2 inline-flex items-center text-[11px] uppercase tracking-[0.14em] font-medium text-[#5C5B57] hover:text-[#141413] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Galerie
          </button>
          <span className="text-[#E5E2DC]" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            onClick={() => onSelectChef(chef, 'glossary')}
            className="min-h-[48px] px-2 inline-flex items-center text-[11px] uppercase tracking-[0.14em] font-medium text-[#5C5B57] hover:text-[#141413] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Savoir-Faire ({chef.signatureRecipe.techniquesUsed.length})
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelectChef(chef, 'recipe')}
          className="group/btn min-h-[48px] px-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-[#141413] hover:text-[#9E1B24] transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Recette</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-[#B89758] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={1.35}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};
