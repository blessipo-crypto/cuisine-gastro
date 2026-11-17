import React from 'react';
import { Phone, ExternalLink, Bookmark, ArrowUpRight } from 'lucide-react';
import { Chef } from '../types/chef';
import { MonographTab } from './ChefMonographModal';
import { MichelinStars } from './MichelinStars';

interface WorldDirectoryTableProps {
  chefs: Chef[];
  savedChefIds: string[];
  onToggleSave: (chefId: string) => void;
  onSelectChef: (chef: Chef, tab?: MonographTab) => void;
}

export const WorldDirectoryTable: React.FC<WorldDirectoryTableProps> = ({
  chefs,
  savedChefIds,
  onToggleSave,
  onSelectChef,
}) => {
  return (
    <div className="mt-8 sm:mt-10 bg-white border border-[#E5E2DC] overflow-hidden shadow-[0_4px_24px_-12px_rgba(20,20,19,0.04)]">
      {/* Mobile Portrait Zero-Overflow Directory List (360px - 767px) */}
      <div className="md:hidden divide-y divide-[#E5E2DC]">
        {chefs.map((chef) => {
          const isSaved = savedChefIds.includes(chef.id);
          const telHref = chef.phone
            ? `tel:${chef.phone.replace(/[^+\d]/g, '')}`
            : undefined;

          return (
            <article key={chef.id} className="p-4 sm:p-5 space-y-3.5 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <MichelinStars
                    stars={chef.stars}
                    greenStar={chef.greenStar}
                    size="xs"
                    variant="carmine"
                  />
                  <p className="font-mono text-[11px] text-[#5C5B57] mt-1 tabular-nums">
                    Depuis {chef.starYear} · {chef.city} ({chef.departmentCode}) · {chef.country}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleSave(chef.id)}
                  aria-label={
                    isSaved
                      ? `Retirer ${chef.restaurant} du carnet`
                      : `Enregistrer ${chef.restaurant} dans le carnet`
                  }
                  className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center p-2 border transition-all duration-300 cursor-pointer shrink-0 ${
                    isSaved
                      ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                      : 'bg-white text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-medium text-[#141413] leading-snug">
                  {chef.name}
                </h3>
                <p className="font-serif italic text-lg text-[#5C5B57]">
                  {chef.restaurant}
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#B89758] font-medium mt-2">
                  {chef.cuisineType}
                </p>
                <p className="font-serif italic text-base text-[#141413] mt-0.5 leading-[1.5]">
                  « {chef.signatureRecipe.title} »
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E2DC]">
                <div className="flex flex-wrap items-center gap-2">
                  {chef.phone && telHref && (
                    <a
                      href={telHref}
                      className="min-h-[48px] px-3 inline-flex items-center gap-1.5 font-mono text-xs text-[#141413] bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] transition-colors tabular-nums"
                    >
                      <Phone
                        className="w-3.5 h-3.5 text-[#B89758] shrink-0"
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                      <span>{chef.phone}</span>
                    </a>
                  )}
                  {chef.website && (
                    <a
                      href={chef.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] px-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[#5C5B57] bg-[#FAF9F6] border border-[#E5E2DC] hover:text-[#9E1B24] transition-all"
                    >
                      <span>Site</span>
                      <ExternalLink
                        className="w-3.5 h-3.5 text-[#B89758] shrink-0"
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectChef(chef, 'bio')}
                  className="min-h-[48px] inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium text-[#FAF9F6] bg-[#141413] hover:bg-[#9E1B24] transition-all duration-300 cursor-pointer"
                >
                  <span>Ouvrir</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Desktop & Tablet Landscape Directory Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#E5E2DC] text-[10px] uppercase tracking-[0.2em] text-[#5C5B57]">
              <th scope="col" className="py-4 px-5 font-medium">
                Distinction
              </th>
              <th scope="col" className="py-4 px-5 font-medium">
                Chef & Maison Étoilée
              </th>
              <th scope="col" className="py-4 px-5 font-medium">
                Localisation
              </th>
              <th scope="col" className="py-4 px-5 font-medium">
                Style & Création Signature
              </th>
              <th scope="col" className="py-4 px-5 font-medium">
                Coordonnées
              </th>
              <th scope="col" className="py-4 px-5 font-medium text-right">
                Monographie
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5E2DC] text-sm">
            {chefs.map((chef) => {
              const isSaved = savedChefIds.includes(chef.id);
              const telHref = chef.phone
                ? `tel:${chef.phone.replace(/[^+\d]/g, '')}`
                : undefined;

              return (
                <tr
                  key={chef.id}
                  className="hover:bg-[#FAF9F6] transition-colors duration-300 align-top"
                >
                  {/* Stars & Year */}
                  <td className="py-5 px-5 whitespace-nowrap tabular-nums">
                    <MichelinStars
                      stars={chef.stars}
                      greenStar={chef.greenStar}
                      size="xs"
                      variant="carmine"
                    />
                    <div className="font-mono text-[11px] text-[#5C5B57] mt-1">
                      Depuis {chef.starYear}
                    </div>
                  </td>

                  {/* Chef & Restaurant */}
                  <td className="py-5 px-5">
                    <button
                      type="button"
                      onClick={() => onSelectChef(chef, 'bio')}
                      className="text-left group cursor-pointer"
                    >
                      <p className="font-serif text-xl font-medium text-[#141413] group-hover:text-[#9E1B24] transition-colors leading-snug">
                        {chef.name}
                      </p>
                      <p className="font-serif italic text-base text-[#5C5B57] mt-0.5">
                        {chef.restaurant}
                      </p>
                    </button>
                  </td>

                  {/* City / Dept / Country */}
                  <td className="py-5 px-5 text-xs text-[#5C5B57]">
                    <p className="font-medium text-[#141413]">
                      {chef.city} ({chef.departmentCode})
                    </p>
                    <p className="text-[#5C5B57] mt-0.5">
                      {chef.departmentName} · {chef.country}
                    </p>
                  </td>

                  {/* Cuisine & Signature Dish */}
                  <td className="py-5 px-5 max-w-[280px]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#B89758] font-medium truncate">
                      {chef.cuisineType}
                    </p>
                    <p className="font-serif italic text-base text-[#141413] mt-1 line-clamp-2 leading-snug">
                      {chef.signatureRecipe.title}
                    </p>
                  </td>

                  {/* Phone & Website */}
                  <td className="py-5 px-5 text-xs whitespace-nowrap">
                    <div className="space-y-1.5">
                      {chef.phone && telHref && (
                        <a
                          href={telHref}
                          className="flex items-center gap-1.5 font-mono text-[#141413] hover:text-[#9E1B24] transition-colors tabular-nums"
                        >
                          <Phone
                            className="w-3.5 h-3.5 text-[#B89758] shrink-0"
                            strokeWidth={1.35}
                            aria-hidden="true"
                          />
                          <span>{chef.phone}</span>
                        </a>
                      )}
                      {chef.website && (
                        <a
                          href={chef.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-[#5C5B57] hover:text-[#9E1B24] border-b border-transparent hover:border-[#9E1B24] transition-all"
                        >
                          <span>Maison officielle</span>
                          <ExternalLink
                            className="w-3 h-3 text-[#B89758] shrink-0"
                            strokeWidth={1.35}
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-5 px-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleSave(chef.id)}
                        aria-label={
                          isSaved
                            ? `Retirer ${chef.restaurant} du carnet`
                            : `Enregistrer ${chef.restaurant} dans le carnet`
                        }
                        className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center p-2 border transition-all duration-300 cursor-pointer ${
                          isSaved
                            ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                            : 'bg-white text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                          strokeWidth={1.35}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectChef(chef, 'bio')}
                        className="min-h-[48px] inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium text-[#141413] bg-[#FAF9F6] hover:bg-[#141413] hover:text-[#FAF9F6] border border-[#E5E2DC] transition-all duration-300 cursor-pointer"
                      >
                        <span>Ouvrir</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
