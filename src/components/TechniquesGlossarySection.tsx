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
      className="py-14 lg:py-20 border-t border-stone-200 bg-[#FBF9F5]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#991B1B]">
              <BookOpenCheck className="w-4 h-4" aria-hidden="true" />
              <span>Lexique Technique & Savoir-Faire</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900 mt-1 text-balance">
              Glossaire des Techniques Culinaires Étoilées
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-2xl">
              Chaque geste technique utilisé dans les fiches pratiques des chefs, accompagné de ses
              repères thermiques exacts et de son protocole d’exécution.
            </p>
          </div>

          <div className="w-full lg:w-72 shrink-0">
            <label htmlFor="glossary-search" className="sr-only">
              Rechercher une technique culinaire
            </label>
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un geste ou terme..."
              className="w-full h-10 px-3.5 text-sm bg-white border border-stone-300 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#991B1B]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Glossary Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTechniques.map((tech) => {
            const matchingChefs = getChefsForTechnique(tech.id);
            return (
              <article
                key={tech.id}
                className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#991B1B]">
                      {tech.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-600 tabular-nums">
                      <Thermometer className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                      {tech.temperatureOrTiming}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-semibold text-stone-900">
                    {tech.term}
                  </h3>

                  <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                    {tech.summary}
                  </p>

                  <div className="mt-4 p-4 bg-[#F3EFE7]/80 border border-stone-200 rounded-md">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-stone-600">
                      Protocole d’exécution (Comment le réaliser)
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-stone-800 leading-relaxed">
                      {tech.howToPerform}
                    </p>
                  </div>
                </div>

                {matchingChefs.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-stone-200">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                      <ChefHat className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Maîtrisé dans les fiches techniques de :</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      {matchingChefs.slice(0, 6).map((chef) => (
                        <button
                          key={chef.id}
                          type="button"
                          onClick={() => onSelectChefRecipe(chef)}
                          className="text-xs font-medium text-stone-800 hover:text-[#991B1B] underline underline-offset-4 decoration-stone-300 hover:decoration-[#991B1B] cursor-pointer"
                        >
                          {chef.name}
                        </button>
                      ))}
                      {matchingChefs.length > 6 && (
                        <span className="font-mono text-[11px] text-stone-500 tabular-nums">
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
