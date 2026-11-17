import { useState, useMemo, useEffect, useRef } from 'react';
import { LayoutGrid, Table2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_CHEFS_DATA } from './data/allChefs';
import { Chef, ContinentZone, CuisineCategory, StarCount } from './types/chef';
import { Header, MainSectionTab, MAIN_SECTION_TABS } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SearchAndIndexBar, SearchTabMode } from './components/SearchAndIndexBar';
import { ChefCard } from './components/ChefCard';
import { WorldDirectoryTable } from './components/WorldDirectoryTable';
import { BestRecipesByCategorySection } from './components/BestRecipesByCategorySection';
import { FeaturedDishesGallery } from './components/FeaturedDishesGallery';
import { TechniquesGlossarySection } from './components/TechniquesGlossarySection';
import { CulinaryJourneySection } from './components/CulinaryJourneySection';
import { ChefMonographModal, MonographTab } from './components/ChefMonographModal';
import { SavedCarnetDrawer } from './components/SavedCarnetDrawer';
import { ShoppingListDrawer, ShoppingListItem } from './components/ShoppingListDrawer';
import { MobileBottomNav, MobileNavTab } from './components/MobileBottomNav';
import { OfflineBanner } from './components/OfflineBanner';
import { MichelinStarIcon } from './components/MichelinStars';

const STORAGE_KEY = 'atlas_chefs_etoiles_carnet_v1';
const SHOPPING_STORAGE_KEY = 'atlas_chefs_etoiles_shopping_v1';
const ITEMS_PER_PAGE = 9;

const DEFAULT_SHOPPING_ITEMS: ShoppingListItem[] = [
  {
    id: 'default-1',
    name: 'Fromage de Banon affiné en feuilles de châtaignier',
    quantityLabel: '160 g',
    prep: 'tempéré 30 min avant façonnage',
    chefId: 'anne-sophie-pic',
    chefName: 'Anne-Sophie Pic',
    recipeTitle: 'Les Berlingots au Banon, Bouillon d’Herbes Infusées au Thé Matcha et Bergamote',
    checked: false,
  },
  {
    id: 'default-2',
    name: 'Pommes Reine des Reinettes fermes et acidulées',
    quantityLabel: '6 pièces',
    prep: 'pelées et détaillées au ruban japonais',
    chefId: 'alain-passard',
    chefName: 'Alain Passard',
    recipeTitle: 'Bouquet de Roses aux Pommes Reine des Reinettes et Betterave Crapaudine',
    checked: false,
  },
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function App() {
  const [activeSection, setActiveSection] = useState<MainSectionTab>('repertoire');
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTabMode>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStars, setSelectedStars] = useState<StarCount | 'all'>('all');
  const [selectedGreenStar, setSelectedGreenStar] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<ContinentZone | 'all'>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineCategory | 'all'>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'year' | 'name'>('stars');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const [activeChef, setActiveChef] = useState<Chef | null>(null);
  const [modalTab, setModalTab] = useState<MonographTab>('bio');
  const [isCarnetOpen, setIsCarnetOpen] = useState(false);
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [mobileNavTab, setMobileNavTab] = useState<MobileNavTab>('home');

  // Refs for the 5-panel horizontal CSS Scroll-Snap swipe container and individual vertical panels
  const mainSwipeRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticSwipeRef = useRef(false);
  const swipeTimeoutRef = useRef<number | null>(null);

  const [savedChefIds, setSavedChefIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['anne-sophie-pic', 'alain-passard'];
    } catch {
      return ['anne-sophie-pic', 'alain-passard'];
    }
  });

  const [shoppingItems, setShoppingItems] = useState<ShoppingListItem[]>(() => {
    try {
      const stored = localStorage.getItem(SHOPPING_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SHOPPING_ITEMS;
    } catch {
      return DEFAULT_SHOPPING_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedChefIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedChefIds]);

  useEffect(() => {
    try {
      localStorage.setItem(SHOPPING_STORAGE_KEY, JSON.stringify(shoppingItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [shoppingItems]);

  // Reset pagination whenever filters, search, or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCity,
    selectedDepartment,
    selectedRegion,
    selectedStars,
    selectedGreenStar,
    selectedZone,
    selectedCuisine,
    selectedSpecialty,
    sortBy,
    viewMode,
  ]);

  // Keep horizontal scroll position aligned if window resizes
  useEffect(() => {
    const handleResize = () => {
      const container = mainSwipeRef.current;
      if (!container) return;
      const idx = Math.max(
        0,
        MAIN_SECTION_TABS.findIndex((t) => t.id === activeSection)
      );
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: 'auto',
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  const toggleSaveChef = (chefId: string) => {
    setSavedChefIds((prev) =>
      prev.includes(chefId) ? prev.filter((id) => id !== chefId) : [...prev, chefId]
    );
  };

  // Shopping list handlers
  const handleAddIngredientToShopping = (item: Omit<ShoppingListItem, 'id' | 'checked'>) => {
    setShoppingItems((prev) => {
      const existingIdx = prev.findIndex(
        (existing) =>
          existing.chefId === item.chefId &&
          existing.name.toLowerCase() === item.name.toLowerCase()
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantityLabel: item.quantityLabel,
          checked: false,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          checked: false,
        },
      ];
    });
  };

  const handleAddAllIngredientsToShopping = (
    newItems: Omit<ShoppingListItem, 'id' | 'checked'>[]
  ) => {
    setShoppingItems((prev) => {
      const next = [...prev];
      newItems.forEach((item, index) => {
        const existingIdx = next.findIndex(
          (existing) =>
            existing.chefId === item.chefId &&
            existing.name.toLowerCase() === item.name.toLowerCase()
        );
        if (existingIdx !== -1) {
          next[existingIdx] = {
            ...next[existingIdx],
            quantityLabel: item.quantityLabel,
            checked: false,
          };
        } else {
          next.push({
            ...item,
            id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
            checked: false,
          });
        }
      });
      return next;
    });
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCheckedShopping = () => {
    setShoppingItems((prev) => prev.filter((item) => !item.checked));
  };

  const handleClearAllShopping = () => {
    setShoppingItems([]);
  };

  const handleAddCustomShoppingItem = (name: string, quantityLabel: string) => {
    setShoppingItems((prev) => [
      {
        id: `custom-${Date.now()}`,
        name,
        quantityLabel,
        checked: false,
      },
      ...prev,
    ]);
  };

  // Precompute indexed facets across ALL_CHEFS_DATA
  const cities = useMemo(() => {
    const map = new Map<string, { city: string; country: string; count: number }>();
    for (const chef of ALL_CHEFS_DATA) {
      const existing = map.get(chef.city);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(chef.city, { city: chef.city, country: chef.country, count: 1 });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.city.localeCompare(b.city, 'fr'));
  }, []);

  const departments = useMemo(() => {
    const map = new Map<
      string,
      { code: string; name: string; country: string; count: number }
    >();
    for (const chef of ALL_CHEFS_DATA) {
      const existing = map.get(chef.departmentCode);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(chef.departmentCode, {
          code: chef.departmentCode,
          name: chef.departmentName,
          country: chef.country,
          count: 1,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.code.localeCompare(b.code, 'fr'));
  }, []);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const chef of ALL_CHEFS_DATA) {
      if (chef.region) {
        counts[chef.region] = (counts[chef.region] || 0) + 1;
      }
    }
    return counts;
  }, []);

  const cuisineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const chef of ALL_CHEFS_DATA) {
      counts[chef.cuisineType] = (counts[chef.cuisineType] || 0) + 1;
    }
    return counts;
  }, []);

  const topSpecialties = useMemo(() => {
    const map = new Map<string, number>();
    for (const chef of ALL_CHEFS_DATA) {
      for (const spec of chef.specialties) {
        map.set(spec, (map.get(spec) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 22);
  }, []);

  // Filtered & sorted chefs
  const filteredChefs = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery.trim());

    const matches = ALL_CHEFS_DATA.filter((chef) => {
      if (selectedCity !== 'all' && chef.city !== selectedCity) return false;
      if (selectedDepartment !== 'all' && chef.departmentCode !== selectedDepartment)
        return false;
      if (selectedRegion !== 'all' && chef.region !== selectedRegion) return false;
      if (selectedStars !== 'all' && chef.stars !== selectedStars) return false;
      if (selectedGreenStar && !chef.greenStar) return false;
      if (selectedZone !== 'all' && chef.zone !== selectedZone) return false;
      if (selectedCuisine !== 'all' && chef.cuisineType !== selectedCuisine) return false;
      if (
        selectedSpecialty !== 'all' &&
        !chef.specialties.some((s) => s === selectedSpecialty)
      ) {
        return false;
      }

      if (normalizedQuery) {
        const searchableText = normalizeText(
          [
            chef.name,
            chef.restaurant,
            chef.city,
            chef.departmentCode,
            chef.departmentName,
            chef.region ?? '',
            chef.country,
            chef.cuisineType,
            chef.specialties.join(' '),
            chef.signatureRecipe.title,
            chef.signatureRecipe.ingredients.map((i) => i.name).join(' '),
            String(chef.starYear),
          ].join(' ')
        );
        if (!searchableText.includes(normalizedQuery)) return false;
      }

      return true;
    });

    return matches.sort((a, b) => {
      if (sortBy === 'stars') {
        if (b.stars !== a.stars) return b.stars - a.stars;
        return a.starYear - b.starYear;
      }
      if (sortBy === 'year') {
        return a.starYear - b.starYear;
      }
      return a.name.localeCompare(b.name, 'fr');
    });
  }, [
    searchQuery,
    selectedCity,
    selectedDepartment,
    selectedRegion,
    selectedStars,
    selectedGreenStar,
    selectedZone,
    selectedCuisine,
    selectedSpecialty,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredChefs.length / ITEMS_PER_PAGE));

  const paginatedGridChefs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredChefs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredChefs, currentPage]);

  const savedChefs = useMemo(
    () => ALL_CHEFS_DATA.filter((c) => savedChefIds.includes(c.id)),
    [savedChefIds]
  );

  const totalStars = useMemo(
    () => ALL_CHEFS_DATA.reduce((sum, chef) => sum + chef.stars, 0),
    []
  );

  const totalGalleryImages = useMemo(
    () => ALL_CHEFS_DATA.reduce((sum, chef) => sum + chef.signatureRecipe.gallery.length, 0),
    []
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedDepartment('all');
    setSelectedRegion('all');
    setSelectedStars('all');
    setSelectedGreenStar(false);
    setSelectedZone('all');
    setSelectedCuisine('all');
    setSelectedSpecialty('all');
  };

  const handleOpenChef = (chef: Chef, tab: MonographTab = 'bio') => {
    setModalTab(tab);
    setActiveChef(chef);
  };

  // Smooth horizontal scrollTo when clicking any main section tab
  const handleSelectSection = (section: MainSectionTab) => {
    setActiveSection(section);
    const idx = Math.max(
      0,
      MAIN_SECTION_TABS.findIndex((t) => t.id === section)
    );
    const container = mainSwipeRef.current;
    if (container) {
      isProgrammaticSwipeRef.current = true;
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: 'smooth',
      });
      if (swipeTimeoutRef.current) {
        window.clearTimeout(swipeTimeoutRef.current);
      }
      swipeTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticSwipeRef.current = false;
      }, 450);
    }
    const targetPanel = panelRefs.current[idx];
    if (targetPanel) {
      targetPanel.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Detect active tab automatically when the user swipes horizontally between the 5 main views
  const handleMainSwipeScroll = () => {
    if (isProgrammaticSwipeRef.current) return;
    const container = mainSwipeRef.current;
    if (!container || container.clientWidth === 0) return;
    const nextIdx = Math.round(container.scrollLeft / container.clientWidth);
    const clampedIdx = Math.max(0, Math.min(MAIN_SECTION_TABS.length - 1, nextIdx));
    const nextTab = MAIN_SECTION_TABS[clampedIdx];
    if (nextTab && nextTab.id !== activeSection) {
      setActiveSection(nextTab.id);
    }
  };

  const handleFilterBySpecialty = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setActiveSearchTab('styles');
    handleSelectSection('repertoire');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('repertoire-resultats')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectMobileNavTab = (tab: MobileNavTab) => {
    setMobileNavTab(tab);
    if (tab === 'home') {
      setIsCarnetOpen(false);
      setIsShoppingOpen(false);
      handleSelectSection('repertoire');
    } else if (tab === 'search') {
      setIsCarnetOpen(false);
      setIsShoppingOpen(false);
      setActiveSearchTab('search');
      handleSelectSection('repertoire');
      window.setTimeout(() => {
        document.getElementById('repertoire')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (tab === 'favorites') {
      setIsShoppingOpen(false);
      setIsCarnetOpen(true);
    } else if (tab === 'shopping') {
      setIsCarnetOpen(false);
      setIsShoppingOpen(true);
    }
  };

  const renderPanelFooter = () => (
    <footer className="border-t border-[#E5E2DC] bg-white py-10 sm:py-12 mt-12">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <MichelinStarIcon className="w-4 h-4 text-[#9E1B24]" />
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#B89758] font-medium">
              Édition Monographique Internationale
            </p>
          </div>
          <p className="font-serif text-2xl font-normal text-[#141413]">
            Atlas de la Haute Gastronomie
          </p>
          <p className="text-base text-[#5C5B57] max-w-md leading-[1.5]">
            Glissez horizontalement l’écran ou sélectionnez un onglet pour parcourir les rubriques.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs uppercase tracking-[0.15em] text-[#5C5B57]">
          {MAIN_SECTION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectSection(tab.id)}
              className={`min-h-[48px] px-3 inline-flex items-center transition-colors cursor-pointer ${
                activeSection === tab.id
                  ? 'text-[#9E1B24] font-semibold'
                  : 'hover:text-[#141413]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );

  return (
    <div className="h-[100dvh] flex flex-col bg-[#FAF9F6] text-[#141413] overflow-hidden">
      <Header
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        savedCount={savedChefs.length}
        shoppingCount={shoppingItems.length}
        onOpenCarnet={() => {
          setIsShoppingOpen(false);
          setIsCarnetOpen(true);
          setMobileNavTab('favorites');
        }}
        onOpenShopping={() => {
          setIsCarnetOpen(false);
          setIsShoppingOpen(true);
          setMobileNavTab('shopping');
        }}
      />

      {/* NATIVE ANDROID HORIZONTAL SWIPE VIEW CONTAINER (CSS Scroll-Snap X Mandatory + Independent Y Scroll per Panel) */}
      <main
        ref={mainSwipeRef}
        onScroll={handleMainSwipeScroll}
        aria-label="Vues principales de l'Atlas (glissement horizontal)"
        className="flex-1 swipe-tabs-container"
      >
        {/* PANEL 1: CHEFS & MAISONS ÉTOILÉES */}
        <div
          ref={(el) => {
            panelRefs.current[0] = el;
          }}
          role="tabpanel"
          aria-label="Chefs et Maisons Étoilées"
          className="swipe-tab-panel h-full pb-safe-bottom-nav"
        >
          <HeroSection
            totalChefs={ALL_CHEFS_DATA.length}
            totalStars={totalStars}
            totalLocations={departments.length}
            totalGalleryImages={totalGalleryImages}
            onSelectSection={handleSelectSection}
            onOpenFeaturedChef={() => {
              const pic =
                ALL_CHEFS_DATA.find((c) => c.id === 'anne-sophie-pic') || ALL_CHEFS_DATA[0];
              handleOpenChef(pic, 'bio');
            }}
          />

          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12 space-y-10">
            <SearchAndIndexBar
              activeSearchTab={activeSearchTab}
              onSearchTabChange={setActiveSearchTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              cities={cities}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              departments={departments}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              regionCounts={regionCounts}
              selectedStars={selectedStars}
              onStarsChange={setSelectedStars}
              selectedGreenStar={selectedGreenStar}
              onGreenStarChange={setSelectedGreenStar}
              selectedZone={selectedZone}
              onZoneChange={setSelectedZone}
              selectedCuisine={selectedCuisine}
              onCuisineChange={setSelectedCuisine}
              selectedSpecialty={selectedSpecialty}
              onSpecialtyChange={setSelectedSpecialty}
              topSpecialties={topSpecialties}
              cuisineCounts={cuisineCounts}
              resultCount={filteredChefs.length}
              totalCount={ALL_CHEFS_DATA.length}
              onResetFilters={handleResetFilters}
            />

            {/* Results Directory Header, View Switcher & Sort Controls */}
            <section
              id="repertoire-resultats"
              aria-label="Liste des restaurants et chefs étoilés"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#E5E2DC]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#B89758] font-medium mb-1.5">
                    Index Gastronomique Officiel
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#141413]">
                    Maisons & Chefs Étoilés
                  </h2>
                  <p className="text-sm text-[#5C5B57] mt-1 tabular-nums tracking-[0.02em]">
                    {filteredChefs.length}{' '}
                    {filteredChefs.length > 1
                      ? 'établissements sélectionnés'
                      : 'établissement sélectionné'}
                    {selectedRegion !== 'all' && ` · Région : ${selectedRegion}`}
                    {selectedDepartment !== 'all' &&
                      ` · Département / Code ${selectedDepartment}`}
                    {selectedCity !== 'all' && ` · Ville : ${selectedCity}`}
                    {selectedGreenStar && ' · Étoile Verte'}
                    {selectedCuisine !== 'all' && ` · ${selectedCuisine}`}
                    {selectedSpecialty !== 'all' && ` · Spécialité : ${selectedSpecialty}`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <div className="inline-flex items-center p-1 bg-white border border-[#E5E2DC] gap-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`min-h-[48px] min-w-[48px] inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                        viewMode === 'grid'
                          ? 'bg-[#141413] text-[#FAF9F6]'
                          : 'text-[#5C5B57] hover:text-[#141413]'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
                      <span>Cartes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('table')}
                      className={`min-h-[48px] min-w-[48px] inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                        viewMode === 'table'
                          ? 'bg-[#141413] text-[#FAF9F6]'
                          : 'text-[#5C5B57] hover:text-[#141413]'
                      }`}
                    >
                      <Table2 className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
                      <span>Répertoire</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#5C5B57] hidden sm:inline">
                      Classer par
                    </span>
                    <div className="inline-flex items-center p-1 bg-white border border-[#E5E2DC] gap-2">
                      {(
                        [
                          { id: 'stars', label: 'Distinction' },
                          { id: 'year', label: 'Millésime' },
                          { id: 'name', label: 'Alphabétique' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSortBy(opt.id)}
                          className={`min-h-[48px] min-w-[48px] px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                            sortBy === opt.id
                              ? 'bg-[#141413] text-[#FAF9F6]'
                              : 'text-[#5C5B57] hover:text-[#141413]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {filteredChefs.length === 0 ? (
                <div className="my-10 py-16 px-6 bg-white border border-[#E5E2DC] text-center">
                  <p className="font-serif text-3xl text-[#141413]">
                    Aucune table ne correspond à cette sélection.
                  </p>
                  <p className="mt-3 text-base text-[#5C5B57] max-w-md mx-auto leading-[1.5]">
                    Nous vous invitons à élargir vos critères dans les onglets de sélection
                    ci-dessus.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-6 min-h-[48px] px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors duration-300 cursor-pointer"
                  >
                    Réinitialiser la sélection
                  </button>
                </div>
              ) : viewMode === 'table' ? (
                <WorldDirectoryTable
                  chefs={filteredChefs}
                  savedChefIds={savedChefIds}
                  onToggleSave={toggleSaveChef}
                  onSelectChef={handleOpenChef}
                />
              ) : (
                <>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
                    {paginatedGridChefs.map((chef) => (
                      <ChefCard
                        key={chef.id}
                        chef={chef}
                        isSaved={savedChefIds.includes(chef.id)}
                        onToggleSave={toggleSaveChef}
                        onSelectChef={handleOpenChef}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <nav
                      aria-label="Pagination du répertoire"
                      className="mt-12 pt-8 border-t border-[#E5E2DC] flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-[#5C5B57] tabular-nums">
                        Planche {currentPage} sur {totalPages} · Maisons{' '}
                        {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{' '}
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredChefs.length)} sur{' '}
                        {filteredChefs.length}
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="min-h-[48px] min-w-[48px] inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium bg-white border border-[#E5E2DC] text-[#141413] hover:border-[#B89758] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <ChevronLeft
                            className="w-4 h-4"
                            strokeWidth={1.35}
                            aria-hidden="true"
                          />
                          <span>Précédent</span>
                        </button>

                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`min-w-[48px] min-h-[48px] text-xs font-mono border transition-colors cursor-pointer tabular-nums ${
                              currentPage === page
                                ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                                : 'bg-white text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          type="button"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="min-h-[48px] min-w-[48px] inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium bg-white border border-[#E5E2DC] text-[#141413] hover:border-[#B89758] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <span>Suivant</span>
                          <ChevronRight
                            className="w-4 h-4"
                            strokeWidth={1.35}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </nav>
                  )}
                </>
              )}
            </section>
          </div>

          {renderPanelFooter()}
        </div>

        {/* PANEL 2: GRANDES RECETTES PAR CATÉGORIE */}
        <div
          ref={(el) => {
            panelRefs.current[1] = el;
          }}
          role="tabpanel"
          aria-label="Grandes Recettes par Catégorie"
          className="swipe-tab-panel h-full pb-safe-bottom-nav"
        >
          <BestRecipesByCategorySection
            chefs={ALL_CHEFS_DATA}
            onSelectRecipe={(chef) => handleOpenChef(chef, 'recipe')}
            onSelectGallery={(chef) => handleOpenChef(chef, 'gallery')}
          />
          {renderPanelFooter()}
        </div>

        {/* PANEL 3: PLATS SIGNATURES & GALERIES PHOTOGRAPHIQUES */}
        <div
          ref={(el) => {
            panelRefs.current[2] = el;
          }}
          role="tabpanel"
          aria-label="Plats Signatures"
          className="swipe-tab-panel h-full pb-safe-bottom-nav"
        >
          <FeaturedDishesGallery
            chefs={ALL_CHEFS_DATA}
            onSelectDishGallery={(chef) => handleOpenChef(chef, 'gallery')}
            onSelectDishRecipe={(chef) => handleOpenChef(chef, 'recipe')}
          />
          {renderPanelFooter()}
        </div>

        {/* PANEL 4: SAVOIR-FAIRE & GLOSSAIRE TECHNIQUE */}
        <div
          ref={(el) => {
            panelRefs.current[3] = el;
          }}
          role="tabpanel"
          aria-label="Savoir-Faire et Gestes Techniques"
          className="swipe-tab-panel h-full pb-safe-bottom-nav"
        >
          <TechniquesGlossarySection
            chefs={ALL_CHEFS_DATA}
            onSelectChefRecipe={(chef) => handleOpenChef(chef, 'recipe')}
          />
          {renderPanelFooter()}
        </div>

        {/* PANEL 5: PALMARÈS HISTORIQUE & CHRONOLOGIE */}
        <div
          ref={(el) => {
            panelRefs.current[4] = el;
          }}
          role="tabpanel"
          aria-label="Palmarès Historique"
          className="swipe-tab-panel h-full pb-safe-bottom-nav"
        >
          <CulinaryJourneySection
            chefs={ALL_CHEFS_DATA}
            onSelectChef={(chef) => handleOpenChef(chef, 'bio')}
          />
          {renderPanelFooter()}
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar with Sliding Animated Indicator & Auto-Hide on Android Virtual Keyboard */}
      <MobileBottomNav
        activeTab={mobileNavTab}
        savedCount={savedChefs.length}
        shoppingCount={shoppingItems.length}
        onSelectTab={handleSelectMobileNavTab}
      />

      {/* Detailed Chef Monograph Modal */}
      <ChefMonographModal
        chef={activeChef}
        initialTab={modalTab}
        isSaved={activeChef ? savedChefIds.includes(activeChef.id) : false}
        shoppingItems={shoppingItems}
        onToggleSave={toggleSaveChef}
        onAddIngredientToShopping={handleAddIngredientToShopping}
        onAddAllIngredientsToShopping={handleAddAllIngredientsToShopping}
        onOpenShoppingDrawer={() => {
          setActiveChef(null);
          setIsShoppingOpen(true);
          setMobileNavTab('shopping');
        }}
        onClose={() => setActiveChef(null)}
        onFilterBySpecialty={handleFilterBySpecialty}
      />

      {/* Saved Chefs & Recipes Drawer (Favoris) */}
      <SavedCarnetDrawer
        isOpen={isCarnetOpen}
        savedChefs={savedChefs}
        onClose={() => {
          setIsCarnetOpen(false);
          setMobileNavTab('home');
        }}
        onRemoveChef={toggleSaveChef}
        onSelectChef={handleOpenChef}
      />

      {/* Interactive Shopping List & Mise en Place Drawer (Courses) */}
      <ShoppingListDrawer
        isOpen={isShoppingOpen}
        items={shoppingItems}
        chefs={ALL_CHEFS_DATA}
        onClose={() => {
          setIsShoppingOpen(false);
          setMobileNavTab('home');
        }}
        onToggleItem={handleToggleShoppingItem}
        onRemoveItem={handleRemoveShoppingItem}
        onClearChecked={handleClearCheckedShopping}
        onClearAll={handleClearAllShopping}
        onAddCustomItem={handleAddCustomShoppingItem}
        onOpenChefRecipe={(chef) => handleOpenChef(chef, 'recipe')}
      />

      {/* Offline Connectivity Indicator */}
      <OfflineBanner />
    </div>
  );
}
