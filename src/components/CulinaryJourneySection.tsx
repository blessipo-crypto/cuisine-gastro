import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Chef } from '../types/chef';

interface CulinaryJourneySectionProps {
  chefs: Chef[];
  onSelectChef: (chef: Chef) => void;
}

export const CulinaryJourneySection: React.FC<CulinaryJourneySectionProps> = ({
  chefs,
  onSelectChef,
}) => {
  // Sort chefs chronologically by their landmark starYear for historical perspective
  const chronologicalChefs = [...chefs]
    .sort((a, b) => a.starYear - b.starYear)
    .slice(0, 8);

  return (
    <section
      id="chronologie"
      aria-label="Chronologie des parcours gastronomiques et distinctions"
      className="py-14 lg:py-20 border-t border-stone-200 bg-[#F3EFE7]/55"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
              Chronologie & Transmission
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900 mt-1 text-balance">
              Années d’Obtention & Grandes Lignes des Parcours
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            De l’Alsace de 1967 aux tables végétales et nordiques contemporaines, explorez les dates
            charnières de la constellation Michelin.
          </p>
        </div>

        <div className="mt-8 bg-white border border-stone-200 rounded-lg divide-y divide-stone-200">
          {chronologicalChefs.map((chef) => (
            <div
              key={chef.id}
              className="p-5 sm:px-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-[#FBF9F5] transition-colors"
            >
              <div className="md:col-span-2 flex items-baseline gap-3">
                <span className="font-mono text-xl font-semibold text-[#991B1B] tabular-nums">
                  {chef.starYear}
                </span>
                <span className="font-mono text-xs text-stone-500 tabular-nums">
                  {'★'.repeat(chef.stars)}
                </span>
              </div>

              <div className="md:col-span-3">
                <p className="font-serif text-xl font-semibold text-stone-900">{chef.name}</p>
                <p className="text-xs text-stone-500">
                  {chef.restaurant} · {chef.city} ({chef.departmentCode})
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-xs font-medium text-stone-800">{chef.cuisineType}</p>
                <p className="text-xs text-stone-600 mt-0.5 line-clamp-2">
                  {chef.culinaryJourney[chef.culinaryJourney.length - 1]?.description}
                </p>
              </div>

              <div className="md:col-span-2 flex md:justify-end">
                <button
                  type="button"
                  onClick={() => onSelectChef(chef)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#991B1B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Lire le parcours</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
