import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Chef } from '../types/chef';
import { MichelinStars } from './MichelinStars';

interface CulinaryJourneySectionProps {
  chefs: Chef[];
  onSelectChef: (chef: Chef) => void;
}

export const CulinaryJourneySection: React.FC<CulinaryJourneySectionProps> = ({
  chefs,
  onSelectChef,
}) => {
  const chronologicalChefs = [...chefs]
    .sort((a, b) => a.starYear - b.starYear)
    .slice(0, 8);

  return (
    <section
      id="chronologie"
      aria-label="Chronologie des parcours gastronomiques et distinctions"
      className="py-20 lg:py-28 border-t border-[#E5E2DC] bg-white"
    >
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E5E2DC]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
              Palmarès Historique & Filiation
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413] mt-2 text-balance">
              Années de Consécration & Transmission
            </h2>
          </div>
          <p className="text-sm text-[#5C5B57] max-w-md leading-relaxed">
            De l’Auberge de l’Ill en 1967 aux tables végétales et nordiques contemporaines,
            parcourez les dates jalons de la haute gastronomie mondiale.
          </p>
        </div>

        <div className="mt-10 bg-[#FAF9F6] border border-[#E5E2DC] divide-y divide-[#E5E2DC]">
          {chronologicalChefs.map((chef) => (
            <div
              key={chef.id}
              className="p-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-5 items-center hover:bg-white transition-colors duration-300"
            >
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="font-serif text-3xl font-medium text-[#141413] tabular-nums">
                  {chef.starYear}
                </span>
                <MichelinStars
                  stars={chef.stars}
                  greenStar={chef.greenStar}
                  size="xs"
                  variant="carmine"
                />
              </div>

              <div className="md:col-span-3">
                <p className="font-serif text-2xl font-medium text-[#141413]">{chef.name}</p>
                <p className="font-serif italic text-base text-[#5C5B57]">
                  {chef.restaurant} · <span className="not-italic font-sans text-xs">{chef.city} ({chef.departmentCode})</span>
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#B89758]">
                  {chef.cuisineType}
                </p>
                <p className="text-base text-[#5C5B57] mt-1 line-clamp-2 leading-[1.5]">
                  {chef.culinaryJourney[chef.culinaryJourney.length - 1]?.description}
                </p>
              </div>

              <div className="md:col-span-2 flex md:justify-end">
                <button
                  type="button"
                  onClick={() => onSelectChef(chef)}
                  className="min-h-[48px] px-3 group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-medium text-[#141413] hover:text-[#9E1B24] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Lire le Parcours</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[#B89758] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
