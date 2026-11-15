import React, { useState } from 'react';
import {
  Leaf,
  Fish,
  Flame,
  CakeSlice,
  Clock,
  Wine,
  ArrowUpRight,
  Images,
} from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';

export type RecipeCategoryKey = 'vegetale' | 'poissons' | 'viande' | 'patisseries';

interface CategoryConfig {
  key: RecipeCategoryKey;
  label: string;
  title: string;
  description: string;
  chefIds: string[];
  icon: React.FC<{ className?: string }>;
}

const RECIPE_CATEGORIES: CategoryConfig[] = [
  {
    key: 'vegetale',
    label: 'Végétale',
    title: 'Les Meilleures Recettes Végétales & Botaniques',
    description:
      'Légumes de terroir traités comme de grands crus : tartes rosaces, croûtes de sel, extractions de racines et bouillons d’herbes sauvages.',
    chefIds: [
      'alain-passard',
      'mauro-colagreco',
      'daniel-humm',
      'glenn-viel-baumaniere',
    ],
    icon: Leaf,
  },
  {
    key: 'poissons',
    label: 'Poissons',
    title: 'Les Meilleures Recettes de Poissons & Crustacés',
    description:
      'Pêche de ligne, coquilles Saint-Jacques de plongée, homards bleus de Bretagne et émulsions iodées au degré près.',
    chefIds: [
      'arnaud-donckele',
      'hugo-roellinger-coquillage',
      'olivier-bellin-glazicks-plomodiern',
      'christophe-hay-andree-rosier',
    ],
    icon: Fish,
  },
  {
    key: 'viande',
    label: 'Viande',
    title: 'Les Meilleures Recettes de Viandes & Volailles',
    description:
      'Volailles en demi-deuil aux truffes noires, pigeonneaux rôtis sur le coffre et jus de rôti réduits aux morilles sauvages.',
    chefIds: [
      'regis-jacques-marcon',
      'nicolas-magaud-lyon-mathieu-viannay',
      'andreas-caminada',
      'joan-roca',
    ],
    icon: Flame,
  },
  {
    key: 'patisseries',
    label: 'Pâtisseries',
    title: 'Les Meilleures Recettes de Pâtisseries & Arts Sucrés',
    description:
      'Desserts à l’assiette historiques, cœurs coulants grand cru, pâtisserie naturelle sans sucre raffiné et accords cacao-céréales.',
    chefIds: [
      'jessica-prealpato',
      'sebastien-bras',
      'christophe-et-christian-tedeschi-et-bordeaux-pascal',
      'laurent-petit-julien-machet-annecy-courchevel',
    ],
    icon: CakeSlice,
  },
];

interface BestRecipesByCategorySectionProps {
  chefs: Chef[];
  onSelectRecipe: (chef: Chef) => void;
  onSelectGallery: (chef: Chef) => void;
}

export const BestRecipesByCategorySection: React.FC<BestRecipesByCategorySectionProps> = ({
  chefs,
  onSelectRecipe,
  onSelectGallery,
}) => {
  const [activeCategory, setActiveCategory] = useState<RecipeCategoryKey>('vegetale');

  const currentConfig =
    RECIPE_CATEGORIES.find((cat) => cat.key === activeCategory) ?? RECIPE_CATEGORIES[0];

  const categoryChefs = currentConfig.chefIds
    .map((id) => chefs.find((c) => c.id === id))
    .filter((c): c is Chef => Boolean(c));

  return (
    <section
      id="meilleures-recettes"
      aria-label="Meilleures recettes par catégorie"
      className="py-14 lg:py-20 border-t border-stone-200 bg-[#F3EFE7]/55"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
              Anthologie Culinaire · 4 Grandes Familles
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900 mt-1 text-balance">
              Les Meilleures Recettes par Catégorie
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-2xl">
              Explorez les recettes phares et fiches techniques emblématiques classées par registre :
              végétal, poissons & crustacés, viandes & volailles, et haute pâtisserie.
            </p>
          </div>

          {/* 4 Category Tabs */}
          <div
            role="tablist"
            aria-label="Catégories de recettes"
            className="inline-flex flex-wrap items-center p-1 bg-white border border-stone-200 rounded-md gap-1 shrink-0"
          >
            {RECIPE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#991B1B] text-[#FBF9F5]'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-[#F3EFE7]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Lead */}
        <div className="mt-7 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              {currentConfig.title}
            </h3>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              {currentConfig.description}
            </p>
          </div>
          <span className="font-mono text-xs text-stone-500 tabular-nums shrink-0">
            {categoryChefs.length} recettes d’exception
          </span>
        </div>

        {/* 2x2 Editorial Grid of Best Recipes */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-7">
          {categoryChefs.map((chef) => {
            const recipe = chef.signatureRecipe;
            const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
            const cover = recipe.gallery[0];

            return (
              <article
                key={chef.id}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-12 hover:border-stone-400 transition-colors"
              >
                {/* Photo Column */}
                <div
                  onClick={() => onSelectRecipe(chef)}
                  className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto sm:min-h-[260px] bg-[#EBE6DF] overflow-hidden cursor-pointer group"
                >
                  <ResilientImage
                    src={cover.url}
                    alt={recipe.title}
                    fallbackTitle={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-[#FBF9F5]">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-stone-200">
                      {chef.restaurant} · {'★'.repeat(chef.stars)}
                    </p>
                    <p className="text-xs font-medium text-white truncate">
                      {chef.city} ({chef.departmentCode})
                    </p>
                  </div>
                </div>

                {/* Editorial Recipe Body */}
                <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-500 pb-2.5 border-b border-stone-100">
                      <span className="text-[#991B1B] font-medium">{chef.name}</span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {totalTime} min · {recipe.difficulty}
                      </span>
                    </div>

                    <h4 className="mt-3 font-serif text-xl font-semibold text-stone-900 leading-snug">
                      {recipe.title}
                    </h4>

                    <p className="mt-1.5 text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {recipe.subtitle}
                    </p>

                    {/* Key Ingredients Preview (Zero-Pill, clean typographic list) */}
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
                        Ingrédients clés ({recipe.baseServings} couverts)
                      </p>
                      <p className="mt-1 text-xs text-stone-700 line-clamp-2">
                        {recipe.ingredients
                          .slice(0, 4)
                          .map((ing) => ing.name)
                          .join(' · ')}
                      </p>
                    </div>

                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-600">
                      <Wine className="w-3.5 h-3.5 text-[#991B1B] shrink-0" aria-hidden="true" />
                      <span className="truncate">Accord : {recipe.winePairing}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectRecipe(chef)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#991B1B] hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <span>Recette & Fiche Technique</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectGallery(chef)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <Images className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Galerie</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
