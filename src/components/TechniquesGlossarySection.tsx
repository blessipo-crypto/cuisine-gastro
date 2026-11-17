import React, { useState, useMemo } from 'react';
import { BookOpenCheck, Thermometer, ChefHat } from 'lucide-react';
import { TECHNIQUES_GLOSSARY } from '../data/techniquesGlossary';
import { Chef, TechniqueCategory } from '../types/chef';

interface TechniquesGlossarySectionProps {
  chefs: Chef[];
  onSelectChefRecipe: (chef: Chef) => void;
}

const CATEGORIES: (TechniqueCategory | 'Toutes')[] = [
  'Toutes',
  'Cuissons',
  'Sauces & Émulsions',
  'Fermentation & Maturation',
  'Pâtisserie & Textures',
  'Découpe & Dressage',
];

export const TechniquesGlossarySection: React.FC<TechniquesGlossarySectionProps> = ({
  chefs,
  onSelectChefRecipe,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TechniqueCategory | 'Toutes'>('Toutes');
  const [query, setQuery] = useState('');

  const allTechniques = useMemo(() => Object.values(TECHNIQUES_GLOSSARY), []);

  const filteredTechniques = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTechniques.filter((tech) => {
      if (selectedCategory !== 'Toutes' && tech.category !== selectedCategory) return false;
      if (q) {
        const hay = `${tech.term} ${tech.summary} ${tech.howToPerform}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allTechniques, selectedCategory, query]);

  const getChefsForTechnique = (techId: string) =>
    chefs.filter((c) => c.signatureRecipe.techniquesUsed.includes(techId));

  return (
    <section
      id="glossaire"
      aria-label="Glossaire des techniques culinaires"
      className="py-16 sm:py-20 lg:py-28 border-t border-[#E5E2DC] bg-[#FAF9F6]"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5E2DC]">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
              <BookOpenCheck className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
              <span>Lexique Technique & Haute Précision</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413] mt-2 text-balance">
              Répertoire des Gestes & Savoir-Faire
            </h2>
            <p className="mt-3 text-base text-[#5C5B57] max-w-2xl leading-[1.55]">
              Chaque procédé technique mobilisé dans les fiches d’exécution des chefs, accompagné de
              ses repères thermiques exacts et de son protocole opératoire.
            </p>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <label htmlFor="glossary-search" className="sr-only">
              Rechercher une technique culinaire
            </label>
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un geste, une cuisson…"
              className="w-full min-h-[48px] px-4 text-base bg-white border border-[#E5E2DC] text-[#141413] placeholder:text-[#5C5B57]/60 focus:outline-none focus:border-[#B89758] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs (48px+ touch targets, 8px+ gap, smooth touch scroll) */}
        <div
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="mt-7 flex items-center gap-2 overflow-x-auto sm:flex-wrap no-scrollbar pb-1 nested-carousel"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[48px] px-4 py-2.5 text-xs uppercase tracking-[0.14em] font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                    : 'bg-white text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Glossary Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTechniques.map((tech) => {
            const matchingChefs = getChefsForTechnique(tech.id);
            return (
              <article
                key={tech.id}
                className="bg-white border border-[#E5E2DC] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#B89758]/70"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#E5E2DC]">
                    <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#B89758]">
                      {tech.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#5C5B57] tabular-nums">
                      <Thermometer
                        className="w-3.5 h-3.5 text-[#9E1B24]"
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                      {tech.temperatureOrTiming}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl sm:text-[26px] font-medium text-[#141413]">
                    {tech.term}
                  </h3>

                  <p className="mt-2.5 text-base text-[#5C5B57] leading-[1.55]">
                    {tech.summary}
                  </p>

                  <div className="mt-5 p-5 bg-[#FAF9F6] border border-[#E5E2DC]">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B89758]">
                      Protocole d’Exécution
                    </p>
                    <p className="mt-2 text-base text-[#141413] leading-[1.55]">
                      {tech.howToPerform}
                    </p>
                  </div>
                </div>

                {matchingChefs.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#E5E2DC]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#5C5B57] mb-2.5 flex items-center gap-1.5">
                      <ChefHat className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                      <span>Maîtrisé dans les fiches techniques de :</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {matchingChefs.slice(0, 6).map((chef) => (
                        <button
                          key={chef.id}
                          type="button"
                          onClick={() => onSelectChefRecipe(chef)}
                          className="min-h-[48px] px-3 font-serif text-base font-medium text-[#141413] bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] hover:text-[#9E1B24] transition-colors cursor-pointer"
                        >
                          {chef.name}
                        </button>
                      ))}
                      {matchingChefs.length > 6 && (
                        <span className="font-mono text-xs text-[#5C5B57] tabular-nums px-2">
                          +{matchingChefs.length - 6} autres maisons
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
