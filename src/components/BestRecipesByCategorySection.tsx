import React, { useState, useRef, useEffect } from 'react';
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
import { MichelinStars } from './MichelinStars';

export type RecipeCategoryKey = 'vegetale' | 'poissons' | 'viande' | 'patisseries';

interface CategoryConfig {
  key: RecipeCategoryKey;
  label: string;
  title: string;
  description: string;
  chefIds: string[];
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
}

const RECIPE_CATEGORIES: CategoryConfig[] = [
  {
    key: 'vegetale',
    label: 'Végétale',
    title: 'Haute Cuisine Végétale & Botanique',
    description:
      'Légumes de terroir élevés au rang de grands crus : tartes rosaces, croûtes de sel, extractions de racines et bouillons d’herbes sauvages.',
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
    label: 'Poissons & Mer',
    title: 'Haute Cuisine Marine & Littorale',
    description:
      'Pêche de ligne, coquilles Saint-Jacques de plongée, homards bleus de Bretagne et émulsions iodées travaillées au degré près.',
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
    label: 'Viandes & Volailles',
    title: 'Grandes Pièces Rôties & Volailles en Demi-Deuil',
    description:
      'Volailles de Bresse et du Velay aux truffes noires, pigeonneaux rôtis sur le coffre et jus de rôti réduits aux morilles sauvages.',
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
    title: 'Arts Sucrés & Desserts de Grands Restaurants',
    description:
      'Créations pâtissières d’exception, cœurs coulants grand cru, naturalité sans sucre raffiné et architectures cacao-céréales.',
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
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIndex = Math.max(
    0,
    RECIPE_CATEGORIES.findIndex((cat) => cat.key === activeCategory)
  );

  useEffect(() => {
    const updateIndicator = () => {
      const btn = tabBtnRefs.current[activeIndex];
      const bar = tabBarRef.current;
      if (btn) {
        setIndicatorStyle({
          left: btn.offsetLeft,
          width: btn.offsetWidth,
        });
      }
      if (btn && bar) {
        const targetScroll = btn.offsetLeft - bar.clientWidth / 2 + btn.offsetWidth / 2;
        bar.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth',
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  const handleCategoryClick = (key: RecipeCategoryKey, idx: number) => {
    setActiveCategory(key);
    const container = slidesContainerRef.current;
    if (container) {
      isProgrammaticScrollRef.current = true;
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: 'smooth',
      });
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 420);
    }
  };

  const handleSlidesScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    const container = slidesContainerRef.current;
    if (!container || container.clientWidth === 0) return;
    const nextIdx = Math.round(container.scrollLeft / container.clientWidth);
    const clampedIdx = Math.max(0, Math.min(RECIPE_CATEGORIES.length - 1, nextIdx));
    const nextCat = RECIPE_CATEGORIES[clampedIdx];
    if (nextCat && nextCat.key !== activeCategory) {
      setActiveCategory(nextCat.key);
    }
  };

  const stopNestedTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <section
      id="meilleures-recettes"
      aria-label="Meilleures recettes par catégorie"
      className="py-10 sm:py-14 lg:py-20 bg-[#FAF9F6]"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E2DC]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
              Anthologie Culinaire · Glissez ou Touchez une Catégorie
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413] mt-1.5 text-balance">
              Les Recettes Signatures par Catégorie
            </h2>
            <p className="mt-2.5 text-base text-[#5C5B57] max-w-2xl leading-[1.55]">
              Balayez horizontalement ou sélectionnez un registre : végétal, mer, viandes &
              volailles, et haute pâtisserie.
            </p>
          </div>

          {/* 4 Category Tabs with Sliding Gold/Carmine Indicator */}
          <div
            ref={tabBarRef}
            role="tablist"
            aria-label="Catégories de recettes"
            onTouchStart={stopNestedTouch}
            onTouchMove={stopNestedTouch}
            className="relative flex items-center p-1.5 pb-2.5 bg-white border border-[#E5E2DC] gap-2 overflow-x-auto no-scrollbar shrink-0 nested-carousel"
          >
            {RECIPE_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  ref={(el) => {
                    tabBtnRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryClick(cat.key, idx)}
                  className={`min-h-[48px] min-w-[48px] inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-[0.14em] font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#141413] text-[#FAF9F6]'
                      : 'text-[#5C5B57] hover:text-[#141413] hover:bg-[#FAF9F6]'
                  }`}
                >
                  <Icon
                    className="w-4 h-4 text-[#B89758]"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}

            {/* Sliding Animated Gold/Carmine Indicator */}
            <span
              aria-hidden="true"
              style={{
                transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
                width: `${indicatorStyle.width}px`,
              }}
              className="pointer-events-none absolute bottom-0 left-0 h-[3px] bg-[#9E1B24] tab-indicator-slide"
            />
          </div>
        </div>

        {/* SWIPEABLE CSS SCROLL-SNAP CATEGORY PANELS */}
        <div
          ref={slidesContainerRef}
          onScroll={handleSlidesScroll}
          onTouchStart={stopNestedTouch}
          onTouchMove={stopNestedTouch}
          className="swipe-tabs-container mt-8 nested-carousel"
        >
          {RECIPE_CATEGORIES.map((catConfig) => {
            const catChefs = catConfig.chefIds
              .map((id) => chefs.find((c) => c.id === id))
              .filter((c): c is Chef => Boolean(c));

            return (
              <div
                key={catConfig.key}
                role="tabpanel"
                className="swipe-tab-panel pr-0.5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413]">
                      {catConfig.title}
                    </h3>
                    <p className="text-base text-[#5C5B57] mt-1.5 max-w-3xl leading-[1.55]">
                      {catConfig.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#B89758] tabular-nums shrink-0">
                    {catChefs.length} Créations d’Exception
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {catChefs.map((chef) => {
                    const recipe = chef.signatureRecipe;
                    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
                    const cover = recipe.gallery[0];

                    return (
                      <article
                        key={chef.id}
                        className="group bg-white border border-[#E5E2DC] overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out hover:border-[#B89758]/70 hover:shadow-[0_18px_40px_-16px_rgba(20,20,19,0.08)]"
                      >
                        <div>
                          <div
                            onClick={() => onSelectRecipe(chef)}
                            className="relative aspect-[16/9] bg-[#F3F1EC] overflow-hidden cursor-pointer"
                          >
                            <ResilientImage
                              src={cover.url}
                              alt={recipe.title}
                              fallbackTitle={recipe.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/80 via-transparent to-transparent" />
                            <div className="absolute top-3.5 left-3.5 px-3 py-1.5 bg-[#FAF9F6]/95 border border-[#E5E2DC]">
                              <MichelinStars
                                stars={chef.stars}
                                greenStar={chef.greenStar}
                                size="xs"
                                variant="carmine"
                              />
                            </div>
                            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-[#FAF9F6]">
                              <div>
                                <p className="font-serif italic text-lg text-[#FAF9F6] truncate">
                                  {chef.restaurant}
                                </p>
                                <p className="text-[11px] uppercase tracking-[0.16em] text-[#E5E2DC]">
                                  {chef.city} ({chef.departmentCode}) · {chef.country}
                                </p>
                              </div>
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FAF9F6] bg-[#141413]/75 px-3 py-1 border border-white/15 tabular-nums shrink-0">
                                <Clock
                                  className="w-3.5 h-3.5 text-[#B89758]"
                                  strokeWidth={1.35}
                                  aria-hidden="true"
                                />
                                {totalTime} min · {recipe.difficulty}
                              </span>
                            </div>
                          </div>

                          <div className="p-6 sm:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C5B57] pb-3 border-b border-[#E5E2DC]">
                              <span className="font-serif text-xl font-medium text-[#141413]">
                                {chef.name}
                              </span>
                              <span className="text-[11px] uppercase tracking-[0.14em] text-[#B89758] font-medium">
                                {chef.cuisineType}
                              </span>
                            </div>

                            <h4 className="mt-3.5 font-serif text-2xl sm:text-3xl font-medium text-[#141413] leading-snug">
                              {recipe.title}
                            </h4>

                            <p className="mt-2 text-base text-[#5C5B57] leading-[1.55] line-clamp-2">
                              {recipe.subtitle}
                            </p>

                            <div className="mt-4 pt-3.5 border-t border-[#E5E2DC]">
                              <p className="text-[10px] uppercase tracking-[0.18em] text-[#B89758]">
                                Ingrédients Majeurs ({recipe.baseServings} couverts)
                              </p>
                              <p className="mt-1.5 text-base text-[#141413] line-clamp-2 leading-[1.5]">
                                {recipe.ingredients
                                  .slice(0, 4)
                                  .map((ing) => ing.name)
                                  .join(' · ')}
                              </p>
                            </div>

                            <div className="mt-3.5 flex items-center gap-2 text-sm text-[#5C5B57]">
                              <Wine
                                className="w-4 h-4 text-[#9E1B24] shrink-0"
                                strokeWidth={1.35}
                                aria-hidden="true"
                              />
                              <span className="truncate">Accord : {recipe.winePairing}</span>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 sm:px-7 py-3 bg-[#FAF9F6] border-t border-[#E5E2DC] flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectRecipe(chef)}
                            className="min-h-[48px] px-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium text-[#141413] hover:text-[#9E1B24] transition-colors cursor-pointer"
                          >
                            <span>Recette & Fiche Technique</span>
                            <ArrowUpRight
                              className="w-4 h-4 text-[#B89758]"
                              strokeWidth={1.35}
                              aria-hidden="true"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectGallery(chef)}
                            className="min-h-[48px] px-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-[#5C5B57] hover:text-[#141413] transition-colors cursor-pointer"
                          >
                            <Images
                              className="w-4 h-4 text-[#B89758]"
                              strokeWidth={1.35}
                              aria-hidden="true"
                            />
                            <span>Galerie</span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
