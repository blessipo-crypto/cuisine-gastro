import React from 'react';
import { Phone, ExternalLink, Bookmark, ArrowUpRight, Leaf } from 'lucide-react';
import { Chef } from '../types/chef';
import { MonographTab } from './ChefMonographModal';

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
    <div className="mt-8 bg-white border border-stone-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[920px]">
          <thead>
            <tr className="bg-[#F3EFE7]/80 border-b border-stone-200 text-[11px] font-mono uppercase tracking-wider text-stone-600">
              <th scope="col" className="py-3.5 px-4 font-medium">
                Distinction
              </th>
              <th scope="col" className="py-3.5 px-4 font-medium">
                Restaurant & Chef
              </th>
              <th scope="col" className="py-3.5 px-4 font-medium">
                Ville · Dépt. · Pays
              </th>
              <th scope="col" className="py-3.5 px-4 font-medium">
                Cuisine & Plat Phare
              </th>
              <th scope="col" className="py-3.5 px-4 font-medium">
                Téléphone & Page Officielle
              </th>
              <th scope="col" className="py-3.5 px-4 font-medium text-right">
                Dossier
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200 text-sm">
            {chefs.map((chef) => {
              const isSaved = savedChefIds.includes(chef.id);
              const telHref = chef.phone
                ? `tel:${chef.phone.replace(/[^+\d]/g, '')}`
                : undefined;

              return (
                <tr
                  key={chef.id}
                  className="hover:bg-[#FBF9F5] transition-colors align-top"
                >
                  {/* Stars & Year */}
                  <td className="py-4 px-4 whitespace-nowrap tabular-nums">
                    <div className="font-mono text-sm font-semibold text-[#991B1B]">
                      {'★'.repeat(chef.stars)}
                    </div>
                    <div className="font-mono text-xs text-stone-500 mt-0.5">
                      Depuis {chef.starYear}
                    </div>
                    {chef.greenStar && (
                      <div className="inline-flex items-center gap-1 text-[11px] text-emerald-800 mt-1 font-medium">
                        <Leaf className="w-3 h-3" aria-hidden="true" />
                        <span>Étoile Verte</span>
                      </div>
                    )}
                  </td>

                  {/* Restaurant & Chef */}
                  <td className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => onSelectChef(chef, 'bio')}
                      className="text-left group cursor-pointer"
                    >
                      <p className="font-serif text-lg font-semibold text-stone-900 group-hover:text-[#991B1B] transition-colors leading-snug">
                        {chef.restaurant}
                      </p>
                      <p className="text-xs font-medium text-stone-600 mt-0.5">
                        Chef : {chef.name}
                      </p>
                    </button>
                  </td>

                  {/* City / Dept / Country */}
                  <td className="py-4 px-4 text-xs text-stone-700">
                    <p className="font-medium text-stone-900">
                      {chef.city} ({chef.departmentCode})
                    </p>
                    <p className="text-stone-500 mt-0.5">
                      {chef.departmentName} · {chef.country}
                    </p>
                  </td>

                  {/* Cuisine & Signature Dish */}
                  <td className="py-4 px-4 max-w-[260px]">
                    <p className="text-xs font-mono text-[#991B1B] truncate">
                      {chef.cuisineType}
                    </p>
                    <p className="text-xs text-stone-700 mt-1 line-clamp-2 leading-relaxed">
                      {chef.signatureRecipe.title}
                    </p>
                  </td>

                  {/* Phone & Website */}
                  <td className="py-4 px-4 text-xs whitespace-nowrap">
                    <div className="space-y-1.5">
                      {chef.phone && telHref && (
                        <a
                          href={telHref}
                          className="flex items-center gap-1.5 font-mono text-stone-800 hover:text-[#991B1B] transition-colors tabular-nums"
                        >
                          <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                          <span>{chef.phone}</span>
                        </a>
                      )}
                      {chef.website && (
                        <a
                          href={chef.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-stone-600 hover:text-[#991B1B] underline underline-offset-4 decoration-stone-300 hover:decoration-[#991B1B] transition-colors"
                        >
                          <span>Site officiel</span>
                          <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleSave(chef.id)}
                        aria-label={
                          isSaved
                            ? `Retirer ${chef.restaurant} du carnet`
                            : `Enregistrer ${chef.restaurant} dans le carnet`
                        }
                        className={`p-1.5 rounded border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectChef(chef, 'bio')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-900 bg-[#F3EFE7] hover:bg-stone-900 hover:text-[#FBF9F5] border border-stone-200 rounded transition-colors cursor-pointer"
                      >
                        <span>Monographie</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
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
