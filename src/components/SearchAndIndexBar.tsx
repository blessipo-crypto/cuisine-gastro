import React from 'react';
import { Search, MapPin, RotateCcw, BookOpen, Compass } from 'lucide-react';
import { ContinentZone, CuisineCategory, StarCount } from '../types/chef';
import { CUISINE_INDEX_CATEGORIES } from '../data/chefs';
import { FRANCE_REGION_DEFINITIONS, WORLD_REGION_DEFINITIONS } from '../data/regions';

interface DepartmentOption {
  code: string;
  name: string;
  country: string;
  count: number;
}

export type SearchTabMode = 'search' | 'region';

interface SearchAndIndexBarProps {
  activeSearchTab: SearchTabMode;
  onSearchTabChange: (tab: SearchTabMode) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  cities: { city: string; country: string; count: number }[];
  selectedDepartment: string;
  onDepartmentChange: (deptCode: string) => void;
  departments: DepartmentOption[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  regionCounts: Record<string, number>;
  selectedStars: StarCount | 'all';
  onStarsChange: (stars: StarCount | 'all') => void;
  selectedZone: ContinentZone | 'all';
  onZoneChange: (zone: ContinentZone | 'all') => void;
  selectedCuisine: CuisineCategory | 'all';
  onCuisineChange: (cuisine: CuisineCategory | 'all') => void;
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
  topSpecialties: { label: string; count: number }[];
  cuisineCounts: Record<string, number>;
  resultCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export const SearchAndIndexBar: React.FC<SearchAndIndexBarProps> = ({
  activeSearchTab,
  onSearchTabChange,
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  cities,
  selectedDepartment,
  onDepartmentChange,
  departments,
  selectedRegion,
  onRegionChange,
  regionCounts,
  selectedStars,
  onStarsChange,
  selectedZone,
  onZoneChange,
  selectedCuisine,
  onCuisineChange,
  selectedSpecialty,
  onSpecialtyChange,
  topSpecialties,
  cuisineCounts,
  resultCount,
  totalCount,
  onResetFilters,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCity !== 'all' ||
    selectedDepartment !== 'all' ||
    selectedRegion !== 'all' ||
    selectedStars !== 'all' ||
    selectedZone !== 'all' ||
    selectedCuisine !== 'all' ||
    selectedSpecialty !== 'all';

  const activeFranceRegionDef = FRANCE_REGION_DEFINITIONS.find(
    (r) => r.name === selectedRegion
  );

  const deptCountMap = new Map(departments.map((d) => [d.code, d.count]));

  return (
    <div className="space-y-10">
      {/* Search & Geographic Filter Panel (Ville, Département & Onglet Rechercher par Région) */}
      <section
        id="repertoire"
        aria-label="Recherche et filtres géographiques"
        className="bg-white border border-stone-200 rounded-lg p-6 lg:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
              Recherche Multi-Critères
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900 mt-1">
              Répertoire par Ville, Département, Région & Distinction
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-600 tabular-nums">
            <span>
              {resultCount} / {totalCount} maisons affichées
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 text-[#991B1B] hover:text-stone-900 font-sans font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Onglets de Recherche : Ville & Département vs Rechercher par Région */}
        <div
          role="tablist"
          aria-label="Modes de recherche géographique"
          className="mt-6 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSearchTab === 'search'}
            onClick={() => onSearchTabChange('search')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeSearchTab === 'search'
                ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                : 'bg-[#F3EFE7] text-stone-700 border-stone-200 hover:border-stone-400 hover:text-stone-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Recherche par Ville, Département & Mots-clés</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSearchTab === 'region'}
            onClick={() => onSearchTabChange('region')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeSearchTab === 'region'
                ? 'bg-[#991B1B] text-[#FBF9F5] border-[#991B1B]'
                : 'bg-[#F3EFE7] text-stone-700 border-stone-200 hover:border-stone-400 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Rechercher par Région</span>
            {selectedRegion !== 'all' && (
              <span className="font-mono text-[11px] opacity-90">· {selectedRegion}</span>
            )}
          </button>
        </div>

        {activeSearchTab === 'search' ? (
          /* TAB 1: Search Input + City Select + Department Select */
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <label
                htmlFor="chef-search-input"
                className="block text-xs font-medium text-stone-600 mb-1.5"
              >
                Chef, restaurant, ville, région, plat ou spécialité
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="chef-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Ex. : Bretagne, Finistère, Pic, Valence, truffe, 29, 56..."
                  className="w-full h-11 pl-10 pr-4 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="city-select"
                className="block text-xs font-medium text-stone-600 mb-1.5"
              >
                Filtrer par Ville
              </label>
              <div className="relative">
                <MapPin
                  className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] cursor-pointer"
                >
                  <option value="all">Toutes les villes ({cities.length})</option>
                  {cities.map((c) => (
                    <option key={c.city} value={c.city}>
                      {c.city} — {c.country} ({c.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="department-select"
                className="block text-xs font-medium text-stone-600 mb-1.5"
              >
                Filtrer par Département / Code
              </label>
              <select
                id="department-select"
                value={selectedDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] cursor-pointer"
              >
                <option value="all">Tous départements ({departments.length})</option>
                {departments.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.code} · {d.name} ({d.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          /* TAB 2: Rechercher par Région (France + Monde + Départements de la région sélectionnée) */
          <div id="recherche-region" className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-stone-900">
                  Sélectionnez une région française ou une grande aire géographique mondiale
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Les départements constitutifs (dont 22, 29, 35, 56 pour la Bretagne) apparaissent
                  dès la sélection d’une région française.
                </p>
              </div>

              {selectedRegion !== 'all' && (
                <button
                  type="button"
                  onClick={() => {
                    onRegionChange('all');
                    onDepartmentChange('all');
                  }}
                  className="text-xs font-medium text-[#991B1B] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  Afficher toutes les régions
                </button>
              )}
            </div>

            {/* France Regions Grid */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2.5">
                Régions de France & Monaco
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {FRANCE_REGION_DEFINITIONS.map((reg) => {
                  const count = regionCounts[reg.name] || 0;
                  const active = selectedRegion === reg.name;
                  return (
                    <button
                      key={reg.name}
                      type="button"
                      onClick={() => {
                        if (active) {
                          onRegionChange('all');
                          onDepartmentChange('all');
                        } else {
                          onRegionChange(reg.name);
                          onDepartmentChange('all');
                          onCityChange('all');
                        }
                      }}
                      className={`text-left p-3.5 rounded-md border transition-colors cursor-pointer flex flex-col justify-between ${
                        active
                          ? 'bg-[#991B1B] text-[#FBF9F5] border-[#991B1B]'
                          : 'bg-[#FBF9F5] text-stone-900 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-serif text-base font-semibold leading-snug">
                          {reg.name}
                        </span>
                        <span
                          className={`font-mono text-xs tabular-nums shrink-0 ${
                            active ? 'text-stone-200' : 'text-[#991B1B]'
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-[11px] leading-snug line-clamp-1 ${
                          active ? 'text-stone-200' : 'text-stone-500'
                        }`}
                      >
                        {reg.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active French Region's Departments Sub-Selector */}
            {activeFranceRegionDef?.departments && activeFranceRegionDef.departments.length > 0 && (
              <div className="p-4 bg-[#F3EFE7]/80 border border-stone-200 rounded-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <p className="font-mono text-xs uppercase tracking-wider text-stone-700">
                    Départements · {activeFranceRegionDef.name}
                  </p>
                  {selectedDepartment !== 'all' && (
                    <button
                      type="button"
                      onClick={() => onDepartmentChange('all')}
                      className="text-xs font-medium text-[#991B1B] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Tous les départements de {activeFranceRegionDef.name}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onDepartmentChange('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedDepartment === 'all'
                        ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    Toute la région ({regionCounts[activeFranceRegionDef.name] || 0})
                  </button>
                  {activeFranceRegionDef.departments.map((dept) => {
                    const count = deptCountMap.get(dept.code) || 0;
                    const deptActive = selectedDepartment === dept.code;
                    return (
                      <button
                        key={dept.code}
                        type="button"
                        onClick={() => onDepartmentChange(deptActive ? 'all' : dept.code)}
                        className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                          deptActive
                            ? 'bg-[#991B1B] text-[#FBF9F5] border-[#991B1B]'
                            : 'bg-white text-stone-800 border-stone-300 hover:border-stone-500'
                        }`}
                      >
                        <span className="font-mono mr-1.5">{dept.code}</span>
                        <span>{dept.name}</span>
                        <span className="ml-1.5 font-mono text-[11px] opacity-75">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* World Regions Grid */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2.5">
                Grandes Régions Internationales
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {WORLD_REGION_DEFINITIONS.map((reg) => {
                  const count = regionCounts[reg.name] || 0;
                  const active = selectedRegion === reg.name;
                  return (
                    <button
                      key={reg.name}
                      type="button"
                      onClick={() => {
                        if (active) {
                          onRegionChange('all');
                        } else {
                          onRegionChange(reg.name);
                          onDepartmentChange('all');
                          onCityChange('all');
                        }
                      }}
                      className={`text-left p-3 rounded-md border transition-colors cursor-pointer flex flex-col justify-between ${
                        active
                          ? 'bg-[#991B1B] text-[#FBF9F5] border-[#991B1B]'
                          : 'bg-[#FBF9F5] text-stone-900 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-serif text-sm font-semibold leading-snug">
                          {reg.name}
                        </span>
                        <span
                          className={`font-mono text-xs tabular-nums shrink-0 ${
                            active ? 'text-stone-200' : 'text-[#991B1B]'
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-[11px] leading-snug line-clamp-1 ${
                          active ? 'text-stone-200' : 'text-stone-500'
                        }`}
                      >
                        {reg.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Row 2: Segmented Controls (Stars & Geographic Zone) */}
        <div className="mt-6 pt-5 border-t border-stone-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Distinction Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 mr-1">
              Étoiles :
            </span>
            <div className="inline-flex items-center p-1 bg-[#F3EFE7] rounded-md border border-stone-200">
              {(
                [
                  { value: 'all', label: 'Toutes' },
                  { value: 3, label: '3 Étoiles ★★★' },
                  { value: 2, label: '2 Étoiles ★★' },
                  { value: 1, label: '1 Étoile ★' },
                ] as const
              ).map((item) => {
                const active = selectedStars === item.value;
                return (
                  <button
                    key={String(item.value)}
                    type="button"
                    onClick={() => onStarsChange(item.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-stone-900 text-[#FBF9F5]'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zone Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 mr-1">
              Territoire :
            </span>
            <div className="inline-flex items-center p-1 bg-[#F3EFE7] rounded-md border border-stone-200">
              {(['all', 'France', 'Europe', 'Asie', 'Amériques'] as const).map((zone) => {
                const active = selectedZone === zone;
                return (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => onZoneChange(zone)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#991B1B] text-[#FBF9F5]'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    {zone === 'all' ? 'Monde entier' : zone}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Indexed Search by Cuisine Type & Specialty */}
      <section
        id="index-culinaire"
        aria-label="Recherche indexée par spécialité et type de cuisine"
        className="bg-[#F3EFE7]/70 border border-stone-200 rounded-lg p-6 lg:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#991B1B]">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Index Analytique des Cuisines</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mt-1">
              Recherche Indexée par Type de Cuisine & Spécialité
            </h2>
          </div>

          {selectedCuisine !== 'all' || selectedSpecialty !== 'all' ? (
            <button
              type="button"
              onClick={() => {
                onCuisineChange('all');
                onSpecialtyChange('all');
              }}
              className="text-xs font-medium text-[#991B1B] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
            >
              Afficher toutes les spécialités
            </button>
          ) : (
            <span className="text-xs text-stone-500">
              Sélectionnez une famille culinaire ou une spécialité indexée
            </span>
          )}
        </div>

        {/* 8 Indexed Cuisine Categories */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CUISINE_INDEX_CATEGORIES.map((item) => {
            const count = cuisineCounts[item.category] || 0;
            const isActive = selectedCuisine === item.category;
            return (
              <button
                key={item.category}
                type="button"
                onClick={() =>
                  onCuisineChange(isActive ? 'all' : item.category)
                }
                className={`text-left p-4 rounded-md border transition-colors duration-150 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                    : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isActive ? 'text-stone-300' : 'text-[#991B1B]'
                      }`}
                    >
                      {item.code}.
                    </span>
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isActive ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {count} {count > 1 ? 'maisons' : 'maison'}
                    </span>
                  </div>
                  <p className="font-serif text-lg font-semibold leading-snug">
                    {item.category}
                  </p>
                </div>
                <p
                  className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                    isActive ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Indexed Specialty Keywords */}
        <div className="mt-6 pt-5 border-t border-stone-200/80">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
            Index des Spécialités Signature :
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSpecialtyChange('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedSpecialty === 'all'
                  ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
              }`}
            >
              Toutes spécialités
            </button>
            {topSpecialties.map((spec) => {
              const active = selectedSpecialty === spec.label;
              return (
                <button
                  key={spec.label}
                  type="button"
                  onClick={() => onSpecialtyChange(active ? 'all' : spec.label)}
                  className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#991B1B] text-[#FBF9F5] border-[#991B1B]'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{spec.label}</span>
                  <span className="ml-1.5 font-mono text-[11px] opacity-70 tabular-nums">
                    ({spec.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
