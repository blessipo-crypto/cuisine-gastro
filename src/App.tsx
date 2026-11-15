import { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, Table2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_CHEFS_DATA } from './data/allChefs';
import { Chef, ContinentZone, CuisineCategory, StarCount } from './types/chef';
import { Header } from './components/Header';
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
import { RatatouilleIntro } from './components/RatatouilleIntro';
import { OfflineBanner } from './components/OfflineBanner';

const STORAGE_KEY = 'atlas_chefs_etoiles_carnet_v1';
const ITEMS_PER_PAGE = 12;

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function App() {
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTabMode>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStars, setSelectedStars] = useState<StarCount | 'all'>('all');
  const [selectedZone, setSelectedZone] = useState<ContinentZone | 'all'>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineCategory | 'all'>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'year' | 'name'>('stars');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const [activeChef, setActiveChef] = useState<Chef | null>(null);
  const [modalTab, setModalTab] = useState<MonographTab>('bio');
  const [isCarnetOpen, setIsCarnetOpen] = useState(false);
  const [showRatatouilleIntro, setShowRatatouilleIntro] = useState(true);

  const [savedChefIds, setSavedChefIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['anne-sophie-pic', 'alain-passard'];
    } catch {
      return ['anne-sophie-pic', 'alain-passard'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedChefIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedChefIds]);

  // Reset pagination whenever filters, search, or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCity,
    selectedDepartment,
    selectedRegion,
    selectedStars,
    selectedZone,
    selectedCuisine,
    selectedSpecialty,
    sortBy,
    viewMode,
  ]);

  const toggleSaveChef = (chefId: string) => {
    setSavedChefIds((prev) =>
      prev.includes(chefId) ? prev.filter((id) => id !== chefId) : [...prev, chefId]
    );
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
    setSelectedZone('all');
    setSelectedCuisine('all');
    setSelectedSpecialty('all');
  };

  const handleOpenChef = (chef: Chef, tab: MonographTab = 'bio') => {
    setModalTab(tab);
    setActiveChef(chef);
  };

  const handleFilterBySpecialty = (specialty: string) => {
    setSelectedSpecialty(specialty);
    document.getElementById('repertoire-resultats')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('repertoire-resultats')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenRegionTab = () => {
    setActiveSearchTab('region');
    document.getElementById('repertoire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900">
      <Header
        savedCount={savedChefs.length}
        onOpenCarnet={() => setIsCarnetOpen(true)}
        onOpenRegionTab={handleOpenRegionTab}
      />

      <main className="flex-1">
        <HeroSection
          totalChefs={ALL_CHEFS_DATA.length}
          totalStars={totalStars}
          totalLocations={departments.length}
          totalGalleryImages={totalGalleryImages}
          onExploreClick={() => {
            document.getElementById('repertoire')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenFeaturedChef={() => {
            const pic = ALL_CHEFS_DATA.find((c) => c.id === 'anne-sophie-pic') || ALL_CHEFS_DATA[0];
            handleOpenChef(pic, 'bio');
          }}
        />

        {/* Search, Department/City/Region Filters, Cuisine Index & Results Grid/Table */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16 space-y-12">
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
          <section id="repertoire-resultats" aria-label="Liste des restaurants et chefs étoilés">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900">
                  Restaurants & Chefs Étoilés du Monde
                </h2>
                <p className="text-sm text-stone-500 mt-0.5 tabular-nums">
                  {filteredChefs.length}{' '}
                  {filteredChefs.length > 1
                    ? 'établissements correspondants'
                    : 'établissement correspondant'}
                  {selectedRegion !== 'all' && ` · Région : ${selectedRegion}`}
                  {selectedDepartment !== 'all' && ` · Département / Code ${selectedDepartment}`}
                  {selectedCity !== 'all' && ` · Ville : ${selectedCity}`}
                  {selectedCuisine !== 'all' && ` · ${selectedCuisine}`}
                  {selectedSpecialty !== 'all' && ` · Spécialité : ${selectedSpecialty}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {/* View Mode Switcher: Grille vs Annuaire Tableau */}
                <div className="inline-flex items-center p-1 bg-[#F3EFE7] border border-stone-200 rounded-md">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      viewMode === 'grid'
                        ? 'bg-stone-900 text-[#FBF9F5]'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Fiches</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      viewMode === 'table'
                        ? 'bg-stone-900 text-[#FBF9F5]'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <Table2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Annuaire Tableau</span>
                  </button>
                </div>

                {/* Sort Segmented Control */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-500 hidden sm:inline">Trier :</span>
                  <div className="inline-flex items-center p-1 bg-[#F3EFE7] border border-stone-200 rounded-md">
                    {(
                      [
                        { id: 'stars', label: 'Étoiles' },
                        { id: 'year', label: 'Année' },
                        { id: 'name', label: 'Nom A–Z' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSortBy(opt.id)}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          sortBy === opt.id
                            ? 'bg-stone-900 text-[#FBF9F5]'
                            : 'text-stone-700 hover:text-stone-900'
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
              <div className="my-12 py-16 px-6 bg-white border border-stone-200 rounded-lg text-center">
                <p className="font-serif text-2xl text-stone-900">
                  Aucun établissement ne correspond à cette combinaison de filtres.
                </p>
                <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
                  Essayez d’élargir votre recherche par ville, département ou spécialité culinaire.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-6 px-5 py-2.5 text-xs font-medium bg-[#991B1B] hover:bg-stone-900 text-white rounded-md transition-colors cursor-pointer"
                >
                  Réinitialiser tous les filtres
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
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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

                {/* Clean Editorial Pagination for Grid View */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination du répertoire"
                    className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <p className="font-mono text-xs text-stone-500 tabular-nums">
                      Page {currentPage} sur {totalPages} · Affichage de{' '}
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{' '}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredChefs.length)} sur{' '}
                      {filteredChefs.length} maisons
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white border border-stone-200 rounded hover:border-stone-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Précédent</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 font-mono text-xs rounded border transition-colors cursor-pointer tabular-nums ${
                            currentPage === page
                              ? 'bg-[#991B1B] text-[#FBF9F5] border-[#991B1B]'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white border border-stone-200 rounded hover:border-stone-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>Suivant</span>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>

        {/* Best Recipes by Category: Végétale, Poissons, Viande, Pâtisseries */}
        <BestRecipesByCategorySection
          chefs={ALL_CHEFS_DATA}
          onSelectRecipe={(chef) => handleOpenChef(chef, 'recipe')}
          onSelectGallery={(chef) => handleOpenChef(chef, 'gallery')}
        />

        {/* Curated Featured Dishes & Interactive Galleries Section */}
        <FeaturedDishesGallery
          chefs={ALL_CHEFS_DATA}
          onSelectDishGallery={(chef) => handleOpenChef(chef, 'gallery')}
          onSelectDishRecipe={(chef) => handleOpenChef(chef, 'recipe')}
        />

        {/* Encyclopedic Culinary Techniques Glossary */}
        <TechniquesGlossarySection
          chefs={ALL_CHEFS_DATA}
          onSelectChefRecipe={(chef) => handleOpenChef(chef, 'recipe')}
        />

        {/* Chronological Culinary Journeys & Star Acquisition Years */}
        <CulinaryJourneySection
          chefs={ALL_CHEFS_DATA}
          onSelectChef={(chef) => handleOpenChef(chef, 'bio')}
        />
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-stone-200 bg-white py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl font-semibold text-stone-900">
              Atlas des Chefs Étoilés
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Encyclopédie gastronomique internationale · Biographies, recettes phares et galeries
              interactives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600">
            <a href="#repertoire" className="hover:text-stone-900 transition-colors">
              Répertoire
            </a>
            <a href="#meilleures-recettes" className="hover:text-stone-900 transition-colors">
              Meilleures Recettes
            </a>
            <a href="#plats-phares" className="hover:text-stone-900 transition-colors">
              Plats Phares
            </a>
            <a href="#glossaire" className="hover:text-stone-900 transition-colors">
              Glossaire
            </a>
            <a href="#chronologie" className="hover:text-stone-900 transition-colors">
              Chronologie
            </a>
            <button
              type="button"
              onClick={() => setShowRatatouilleIntro(true)}
              className="text-[#991B1B] hover:underline underline-offset-4 cursor-pointer"
            >
              Rejouer l’animation Ratatouille ♪
            </button>
          </div>
        </div>
      </footer>

      {/* Ratatouille Loading Animation & Playful Music */}
      <RatatouilleIntro
        isOpen={showRatatouilleIntro}
        onClose={() => setShowRatatouilleIntro(false)}
      />

      {/* Detailed Chef Monograph Modal (Bio, Parcours, Interactive Dish Gallery, Scalable Recipe) */}
      <ChefMonographModal
        chef={activeChef}
        initialTab={modalTab}
        isSaved={activeChef ? savedChefIds.includes(activeChef.id) : false}
        onToggleSave={toggleSaveChef}
        onClose={() => setActiveChef(null)}
        onFilterBySpecialty={handleFilterBySpecialty}
      />

      {/* Saved Chefs & Recipes Drawer */}
      <SavedCarnetDrawer
        isOpen={isCarnetOpen}
        savedChefs={savedChefs}
        onClose={() => setIsCarnetOpen(false)}
        onRemoveChef={toggleSaveChef}
        onSelectChef={handleOpenChef}
      />

      {/* Offline Connectivity Indicator */}
      <OfflineBanner />
    </div>
  );
}
