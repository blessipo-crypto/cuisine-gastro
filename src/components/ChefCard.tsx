import React from 'react';
import { Bookmark, ArrowUpRight, Images, Phone, ExternalLink } from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';

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
  const starSymbols = '★'.repeat(chef.stars);
  const coverImage = chef.signatureRecipe.gallery[0];

  return (
    <article className="group bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-stone-400">
      <div>
        {/* 4:3 Signature Dish Visual — Bespoke to each chef */}
        <div
          onClick={() => onSelectChef(chef, 'bio')}
          className="relative aspect-[4/3] overflow-hidden bg-[#EBE6DF] cursor-pointer"
        >
          <ResilientImage
            src={coverImage.url}
            alt={`${chef.signatureRecipe.title} — ${chef.name}`}
            fallbackTitle={chef.signatureRecipe.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          {/* Top-right save button */}
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
            className={`absolute top-3 right-3 w-9 h-9 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isSaved
                ? 'bg-[#991B1B] text-white'
                : 'bg-stone-900/75 text-white hover:bg-stone-900'
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={isSaved ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          </button>

          {/* Scrim overlay caption: Star Rating + Year Obtained */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2 text-[#FBF9F5]">
            <div>
              <p className="font-mono text-xs tracking-wider text-amber-200 tabular-nums">
                {starSymbols} {chef.stars} {chef.stars > 1 ? 'Étoiles' : 'Étoile'} · Obtenue en{' '}
                {chef.starYear}
              </p>
              <p className="text-xs text-stone-200 mt-0.5 line-clamp-1">
                {chef.restaurant}
              </p>
            </div>
            <span className="font-mono text-[11px] text-stone-200 whitespace-nowrap shrink-0 flex items-center gap-1">
              <Images className="w-3.5 h-3.5" aria-hidden="true" />
              {chef.signatureRecipe.gallery.length}
            </span>
          </div>
        </div>

        {/* Card Body: Zero-Pill Unboxed Metadata */}
        <div className="p-5">
          {/* Clean 1-line metadata separated by · */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 font-mono">
            <span>{chef.city}</span>
            <span aria-hidden="true">·</span>
            <span>
              {chef.departmentCode} ({chef.departmentName})
            </span>
            <span aria-hidden="true">·</span>
            <span>{chef.country}</span>
          </div>

          <h3 className="mt-2 font-serif text-2xl font-semibold text-stone-900 leading-tight">
            <button
              type="button"
              onClick={() => onSelectChef(chef, 'bio')}
              className="text-left hover:text-[#991B1B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
            >
              {chef.name}
            </button>
          </h3>

          <p className="mt-1 text-xs font-medium text-[#991B1B]">
            {chef.cuisineType}
          </p>

          {/* Restaurant Contact Row: Phone + Dedicated Page Link */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
            {chef.phone && (
              <a
                href={`tel:${chef.phone.replace(/\s+/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-stone-700 hover:text-[#991B1B] transition-colors tabular-nums"
              >
                <Phone className="w-3 h-3 text-stone-400" aria-hidden="true" />
                <span>{chef.phone}</span>
              </a>
            )}
            {chef.website && (
              <a
                href={chef.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-[#991B1B] underline underline-offset-4 decoration-stone-300 transition-colors"
              >
                <span>Site officiel</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Signature Dish Highlight */}
          <div className="mt-4 pt-3.5 border-t border-stone-200">
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
              Plat & Fiche Technique
            </p>
            <p className="mt-1 font-serif italic text-base font-medium text-stone-900 line-clamp-2">
              {chef.signatureRecipe.title}
            </p>
            <p className="mt-1.5 text-xs text-stone-500 line-clamp-1">
              Spécialités : {chef.specialties.slice(0, 3).join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3.5 bg-[#FBF9F5] border-t border-stone-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectChef(chef, 'gallery')}
            className="text-xs font-medium text-stone-700 hover:text-[#991B1B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Galerie
          </button>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onSelectChef(chef, 'glossary')}
            className="text-xs font-medium text-stone-700 hover:text-[#991B1B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Techniques ({chef.signatureRecipe.techniquesUsed.length})
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelectChef(chef, 'recipe')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-[#991B1B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Fiche & Recette</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};
