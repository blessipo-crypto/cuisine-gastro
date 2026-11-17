import React, { useRef, useEffect, useState } from 'react';
import {
  Search,
  MapPin,
  RotateCcw,
  BookOpen,
  Compass,
  Globe,
  Sparkles,
  X,
} from 'lucide-react';
import { ContinentZone, CuisineCategory, StarCount } from '../types/chef';
import { CUISINE_INDEX_CATEGORIES } from '../data/chefs';
import { FRANCE_REGION_DEFINITIONS, WORLD_REGION_DEFINITIONS } from '../data/regions';
import { MichelinStarIcon, GreenStarIcon } from './MichelinStars';

interface DepartmentOption {
  code: string;
  name: string;
  country: string;
  count: number;
}

export type SearchTabMode = 'search' | 'locations' | 'region' | 'styles';

const FILTER_TAB_ORDER: SearchTabMode[] = ['search', 'locations', 'region', 'styles'];

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
  selectedGreenStar?: boolean;
  onGreenStarChange?: (green: boolean) => void;
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

const WORLD_MAP_HOTSPOTS: {
  id: string;
  label: string;
  zone: ContinentZone;
  x: string;
  y: string;
  subtitle: string;
}[] = [
  {
    id: 'americas',
    label: 'Amériques',
    zone: 'Amériques',
    x: '23%',
    y: '42%',
    subtitle: 'New York · Californie · Lima · Mexico',
  },
  {
    id: 'france',
    label: 'France & Monaco',
    zone: 'France',
    x: '48%',
    y: '36%',
    subtitle: 'Paris · Bretagne · Lyon · Côte d’Azur',
  },
  {
    id: 'europe',
    label: 'Europe',
    zone: 'Europe',
    x: '54%',
    y: '29%',
    subtitle: 'Italie · Espagne · Suisse · Nordiques',
  },
  {
    id: 'asia',
    label: 'Asie',
    zone: 'Asie',
    x: '79%',
    y: '43%',
    subtitle: 'Tokyo · Kyoto · Singapour · Hong Kong',
  },
];

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
  selectedGreenStar = false,
  onGreenStarChange,
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
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIdx = Math.max(0, FILTER_TAB_ORDER.indexOf(activeSearchTab));

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCity !== 'all' ||
    selectedDepartment !== 'all' ||
    selectedRegion !== 'all' ||
    selectedStars !== 'all' ||
    selectedGreenStar ||
    selectedZone !== 'all' ||
    selectedCuisine !== 'all' ||
    selectedSpecialty !== 'all';

  const activeFranceRegionDef = FRANCE_REGION_DEFINITIONS.find(
    (r) => r.name === selectedRegion
  );

  const deptCountMap = new Map(departments.map((d) => [d.code, d.count]));

  const selectionTabs: {
    id: SearchTabMode;
    label: string;
    shortLabel: string;
    badge?: string;
    icon: React.FC<{ className?: string; strokeWidth?: number }>;
  }[] = [
    {
      id: 'search',
      label: '1. Recherche & Étoiles',
      shortLabel: 'Étoiles & Recherche',
      badge:
        selectedStars !== 'all'
          ? `${selectedStars}★`
          : selectedGreenStar
          ? 'Verte'
          : selectedZone !== 'all'
          ? selectedZone
          : undefined,
      icon: Sparkles,
    },
    {
      id: 'locations',
      label: '2. Villes & Départements',
      shortLabel: 'Villes & Dépt.',
      badge:
        selectedCity !== 'all'
          ? selectedCity
          : selectedDepartment !== 'all'
          ? selectedDepartment
          : undefined,
      icon: MapPin,
    },
    {
      id: 'region',
      label: '3. Carte & Régions',
      shortLabel: 'Carte & Régions',
      badge: selectedRegion !== 'all' ? selectedRegion : undefined,
      icon: Compass,
    },
    {
      id: 'styles',
      label: '4. Styles & Spécialités',
      shortLabel: 'Styles & Produits',
      badge:
        selectedCuisine !== 'all'
          ? selectedCuisine
          : selectedSpecialty !== 'all'
          ? selectedSpecialty
          : undefined,
      icon: BookOpen,
    },
  ];

  // Update sliding Gold/Carmine underline indicator on tab change or window resize
  useEffect(() => {
    const updateIndicator = () => {
      const btn = tabBtnRefs.current[activeIdx];
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
  }, [activeIdx, selectedStars, selectedGreenStar, selectedZone, selectedCity, selectedDepartment, selectedRegion, selectedCuisine, selectedSpecialty]);

  // Scroll the CSS Scroll-Snap container when activeSearchTab is changed via button click or external action
  useEffect(() => {
    const container = slidesContainerRef.current;
    if (!container) return;
    const targetLeft = activeIdx * container.clientWidth;
    if (Math.abs(container.scrollLeft - targetLeft) > 8) {
      isProgrammaticScrollRef.current = true;
      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 420);
    }
  }, [activeIdx]);

  const handleTabClick = (tab: SearchTabMode, idx: number) => {
    onSearchTabChange(tab);
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

  // Detect active tab automatically when the user swipes horizontally
  const handleSlidesScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    const container = slidesContainerRef.current;
    if (!container || container.clientWidth === 0) return;
    const nextIdx = Math.round(container.scrollLeft / container.clientWidth);
    const clampedIdx = Math.max(0, Math.min(FILTER_TAB_ORDER.length - 1, nextIdx));
    const nextTab = FILTER_TAB_ORDER[clampedIdx];
    if (nextTab && nextTab !== activeSearchTab) {
      onSearchTabChange(nextTab);
    }
  };

  const stopNestedTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <section
      id="repertoire"
      aria-label="Onglets de sélection et de filtrage (glissement tactile horizontal)"
      onTouchStart={stopNestedTouch}
      onTouchMove={stopNestedTouch}
      className="bg-white border border-[#E5E2DC] p-4 sm:p-7 lg:p-9 shadow-[0_4px_24px_-12px_rgba(20,20,19,0.04)] nested-carousel"
    >
      {/* Header Row with Total Count & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E2DC]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
            Sélection Tactile · Glissez ou Touchez un Onglet
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413] mt-0.5">
            Filtrer par Étoiles, Villes, Régions & Styles
          </h2>
        </div>

        <div className="flex items-center gap-3 text-sm font-mono text-[#5C5B57] tabular-nums">
          <span>
            <strong className="font-medium text-[#141413]">{resultCount}</strong> / {totalCount}{' '}
            maisons
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-[48px] px-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#9E1B24] hover:text-[#141413] bg-[#FAF9F6] border border-[#E5E2DC] font-sans font-medium cursor-pointer transition-colors duration-300 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.35} aria-hidden="true" />
              <span>Réinitialiser</span>
            </button>
          )}
        </div>
      </div>

      {/* ORDERED 4-TAB SELECTOR BAR WITH SLIDING GOLD/CARMINE INDICATOR */}
      <div
        ref={tabBarRef}
        role="tablist"
        aria-label="Catégories de sélection"
        onTouchStart={stopNestedTouch}
        onTouchMove={stopNestedTouch}
        className="relative mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#E5E2DC] nested-carousel"
      >
        {selectionTabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeSearchTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabBtnRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab.id, idx)}
              className={`min-h-[48px] min-w-[48px] px-4 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.13em] font-medium border transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#141413] text-[#FAF9F6] border-[#141413] shadow-xs'
                  : 'bg-[#FAF9F6] text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#B89758]' : 'text-[#9E1B24]'
                }`}
                strokeWidth={1.35}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              {tab.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-mono rounded-xs ${
                    isActive
                      ? 'bg-[#B89758] text-[#141413]'
                      : 'bg-[#9E1B24] text-[#FAF9F6]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Sliding Animated Gold Indicator */}
        <span
          aria-hidden="true"
          style={{
            transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
            width: `${indicatorStyle.width}px`,
          }}
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] bg-[#B89758] tab-indicator-slide"
        />
      </div>

      {/* SWIPEABLE CSS SCROLL-SNAP FILTER PANELS */}
      <div
        ref={slidesContainerRef}
        onScroll={handleSlidesScroll}
        className="swipe-tabs-container mt-5"
      >
        {/* PANEL 1: RECHERCHE DIRECTE, DISTINCTIONS MICHELIN & CONTINENTS */}
        <div role="tabpanel" className="swipe-tab-panel space-y-5 pr-0.5">
          <div>
            <label
              htmlFor="chef-search-input"
              className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#5C5B57] mb-2"
            >
              Recherche rapide (Chef, Maison, Ville, Plat signature ou Ingrédient)
            </label>
            <div className="relative flex items-center">
              <Search
                className="w-4 h-4 text-[#B89758] absolute left-4 pointer-events-none"
                strokeWidth={1.35}
                aria-hidden="true"
              />
              <input
                id="chef-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Ex. : Anne-Sophie Pic, Bretagne, truffe, Tokyo, 29, 75…"
                className="w-full min-h-[48px] pl-11 pr-12 text-base bg-[#FAF9F6] border border-[#E5E2DC] text-[#141413] placeholder:text-[#5C5B57]/60 focus:outline-none focus:border-[#B89758] focus:bg-white transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-1 min-w-[48px] min-h-[48px] flex items-center justify-center text-[#5C5B57] hover:text-[#141413] cursor-pointer"
                >
                  <X className="w-4 h-4" strokeWidth={1.35} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Distinctions Michelin (Inner horizontal strip protected from parent swipe) */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B57] mb-2">
                Distinctions au Guide Michelin
              </p>
              <div
                onTouchStart={stopNestedTouch}
                onTouchMove={stopNestedTouch}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 nested-carousel"
              >
                {(
                  [
                    { value: 'all', label: 'Toutes', stars: 0 },
                    { value: 3, label: '3 Étoiles', stars: 3 },
                    { value: 2, label: '2 Étoiles', stars: 2 },
                    { value: 1, label: '1 Étoile', stars: 1 },
                  ] as const
                ).map((item) => {
                  const active = selectedStars === item.value && !selectedGreenStar;
                  return (
                    <button
                      key={String(item.value)}
                      type="button"
                      onClick={() => {
                        onStarsChange(item.value);
                        if (onGreenStarChange && item.value === 'all') {
                          onGreenStarChange(false);
                        }
                      }}
                      className={`min-h-[48px] min-w-[48px] inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.13em] font-medium border transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                          : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
                      }`}
                    >
                      {item.stars > 0 && (
                        <span className="inline-flex items-center gap-0.5">
                          {Array.from({ length: item.stars }).map((_, idx) => (
                            <MichelinStarIcon
                              key={idx}
                              className="w-3.5 h-3.5"
                              variant={active ? 'champagne' : 'carmine'}
                            />
                          ))}
                        </span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {onGreenStarChange && (
                  <button
                    type="button"
                    onClick={() => onGreenStarChange(!selectedGreenStar)}
                    className={`min-h-[48px] min-w-[48px] inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.13em] font-medium border transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedGreenStar
                        ? 'bg-emerald-900 text-[#FAF9F6] border-emerald-900'
                        : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-emerald-700'
                    }`}
                  >
                    <GreenStarIcon className="w-4 h-4" />
                    <span>Étoile Verte</span>
                  </button>
                )}
              </div>
            </div>

            {/* Pays & Aires Géographiques */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B57] mb-2">
                Pôles & Continents
              </p>
              <div
                onTouchStart={stopNestedTouch}
                onTouchMove={stopNestedTouch}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 nested-carousel"
              >
                {(['all', 'France', 'Europe', 'Asie', 'Amériques'] as const).map((zone) => {
                  const active = selectedZone === zone;
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => onZoneChange(zone)}
                      className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.13em] font-medium border transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                          : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
                      }`}
                    >
                      {zone === 'all' ? 'Monde entier' : zone}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: VILLES D'EXERCICE & DÉPARTEMENTS */}
        <div role="tabpanel" className="swipe-tab-panel space-y-5 pr-0.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label
                htmlFor="city-select"
                className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5C5B57] mb-2"
              >
                Ville d’Exercice
              </label>
              <div className="relative">
                <MapPin
                  className="w-4 h-4 text-[#B89758] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  strokeWidth={1.35}
                  aria-hidden="true"
                />
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="w-full min-h-[48px] pl-10 pr-3 text-base bg-[#FAF9F6] border border-[#E5E2DC] text-[#141413] focus:outline-none focus:border-[#B89758] focus:bg-white transition-all duration-300 cursor-pointer"
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

            <div>
              <label
                htmlFor="department-select"
                className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5C5B57] mb-2"
              >
                Département / Code Territorial
              </label>
              <select
                id="department-select"
                value={selectedDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="w-full min-h-[48px] px-3.5 text-base bg-[#FAF9F6] border border-[#E5E2DC] text-[#141413] focus:outline-none focus:border-[#B89758] focus:bg-white transition-all duration-300 cursor-pointer"
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

          {/* Quick-Tap Popular Departments Row */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B57] mb-2">
              Accès Direct par Département ou Métropole :
            </p>
            <div
              onTouchStart={stopNestedTouch}
              onTouchMove={stopNestedTouch}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 nested-carousel"
            >
              <button
                type="button"
                onClick={() => onDepartmentChange('all')}
                className={`min-h-[48px] px-4 py-2 text-xs font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedDepartment === 'all'
                    ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                    : 'bg-[#FAF9F6] text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758]'
                }`}
              >
                Tous
              </button>
              {departments.slice(0, 14).map((d) => {
                const active = selectedDepartment === d.code;
                return (
                  <button
                    key={d.code}
                    type="button"
                    onClick={() => onDepartmentChange(active ? 'all' : d.code)}
                    className={`min-h-[48px] px-3.5 py-2 text-xs font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                      active
                        ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                        : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
                    }`}
                  >
                    <span className="font-mono text-[#B89758] mr-1.5">{d.code}</span>
                    <span>{d.name}</span>
                    <span className="ml-1 font-mono text-[11px] opacity-75">({d.count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANEL 3: CARTE DU MONDE & RÉGIONS */}
        <div role="tabpanel" id="recherche-region" className="swipe-tab-panel space-y-6 pr-0.5">
          <div className="p-4 sm:p-6 bg-[#FAF9F6] border border-[#E5E2DC]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89758] font-medium">
                    Cartographie des Pôles Étoilés
                  </p>
                  <p className="text-xs sm:text-sm text-[#5C5B57]">
                    Touchez un pôle continental ou sélectionnez une région ci-dessous.
                  </p>
                </div>
              </div>
              {(selectedZone !== 'all' || selectedRegion !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    onZoneChange('all');
                    onRegionChange('all');
                    onDepartmentChange('all');
                  }}
                  className="min-h-[48px] px-4 text-xs uppercase tracking-[0.14em] font-medium text-[#9E1B24] bg-white border border-[#E5E2DC] hover:border-[#B89758] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Toutes les régions
                </button>
              )}
            </div>

            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#F3F1EC] border border-[#E5E2DC] overflow-hidden">
              <svg
                viewBox="0 0 1000 450"
                className="w-full h-full object-cover"
                aria-hidden="true"
              >
                <g stroke="#E5E2DC" strokeWidth="1" strokeDasharray="4 4">
                  <line x1="0" y1="112" x2="1000" y2="112" />
                  <line x1="0" y1="225" x2="1000" y2="225" />
                  <line x1="0" y1="337" x2="1000" y2="337" />
                  <line x1="250" y1="0" x2="250" y2="450" />
                  <line x1="500" y1="0" x2="500" y2="450" />
                  <line x1="750" y1="0" x2="750" y2="450" />
                </g>
                <g fill="#E2DDD4" stroke="#CEC7BA" strokeWidth="1.2">
                  <path d="M120,75 L255,65 L310,145 L265,215 L235,235 L295,285 L325,355 L275,415 L235,380 L215,290 L165,205 L110,135 Z" />
                  <path d="M440,70 L575,60 L605,130 L565,185 L455,190 L425,140 Z" />
                  <path d="M450,205 L575,205 L615,285 L565,390 L495,385 L455,285 Z" />
                  <path d="M595,65 L865,75 L905,175 L845,265 L725,275 L635,205 Z" />
                  <path d="M885,150 L915,165 L900,210 L875,195 Z" fill="#D5CFC3" />
                  <path d="M775,315 L890,315 L905,385 L790,390 Z" />
                </g>
              </svg>

              {WORLD_MAP_HOTSPOTS.map((spot) => {
                const isSpotActive = selectedZone === spot.zone;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => onZoneChange(isSpotActive ? 'all' : spot.zone)}
                    style={{ left: spot.x, top: spot.y }}
                    className={`-translate-x-1/2 -translate-y-1/2 absolute min-h-[48px] min-w-[48px] px-3 py-1.5 flex items-center gap-2 border transition-all duration-300 cursor-pointer shadow-sm ${
                      isSpotActive
                        ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24] z-20 scale-105'
                        : 'bg-white/95 text-[#141413] border-[#B89758] hover:bg-[#141413] hover:text-[#FAF9F6] z-10'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isSpotActive ? 'bg-[#FAF9F6]' : 'bg-[#9E1B24]'
                      }`}
                    />
                    <span className="text-xs font-serif font-medium whitespace-nowrap">
                      {spot.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89758] mb-2.5">
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
                    className={`min-h-[56px] text-left p-3.5 border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                        : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758] hover:bg-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-serif text-base font-medium leading-snug truncate">
                        {reg.name}
                      </p>
                      <p
                        className={`text-[11px] truncate ${
                          active ? 'text-[#E5E2DC]' : 'text-[#5C5B57]'
                        }`}
                      >
                        {reg.subtitle}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-xs tabular-nums shrink-0 ${
                        active ? 'text-[#B89758]' : 'text-[#9E1B24]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeFranceRegionDef?.departments && activeFranceRegionDef.departments.length > 0 && (
            <div className="p-4 bg-[#FAF9F6] border border-[#E5E2DC]">
              <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#141413] mb-2.5">
                Départements · {activeFranceRegionDef.name}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onDepartmentChange('all')}
                  className={`min-h-[48px] px-4 py-2 text-xs font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedDepartment === 'all'
                      ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                      : 'bg-white text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758]'
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
                      className={`min-h-[48px] px-4 py-2 text-xs font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                        deptActive
                          ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                          : 'bg-white text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
                      }`}
                    >
                      <span className="font-mono text-[#B89758] mr-1.5">{dept.code}</span>
                      <span>{dept.name}</span>
                      <span className="ml-1.5 font-mono text-[11px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89758] mb-2.5">
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
                    className={`min-h-[56px] text-left p-3.5 border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                        : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758] hover:bg-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-serif text-base font-medium leading-snug truncate">
                        {reg.name}
                      </p>
                      <p
                        className={`text-[11px] truncate ${
                          active ? 'text-[#E5E2DC]' : 'text-[#5C5B57]'
                        }`}
                      >
                        {reg.subtitle}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-xs tabular-nums shrink-0 ${
                        active ? 'text-[#B89758]' : 'text-[#9E1B24]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANEL 4: STYLES CULINAIRES & SPÉCIALITÉS SIGNATURES */}
        <div role="tabpanel" id="index-culinaire" className="swipe-tab-panel space-y-5 pr-0.5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#B89758] mb-2.5">
              Courants Gastronomiques & Styles Culinaires
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CUISINE_INDEX_CATEGORIES.map((item) => {
                const count = cuisineCounts[item.category] || 0;
                const isActive = selectedCuisine === item.category;
                return (
                  <button
                    key={item.category}
                    type="button"
                    onClick={() => onCuisineChange(isActive ? 'all' : item.category)}
                    className={`min-h-[84px] text-left p-4 border transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#141413] text-[#FAF9F6] border-[#141413] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs tabular-nums text-[#B89758]">
                        {item.code}
                      </span>
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          isActive ? 'text-[#E5E2DC]' : 'text-[#5C5B57]'
                        }`}
                      >
                        {count} {count > 1 ? 'maisons' : 'maison'}
                      </span>
                    </div>
                    <p className="font-serif text-lg font-medium leading-snug mt-1">
                      {item.category}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E2DC]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#5C5B57] mb-2.5">
              Signatures & Produits d’Exception :
            </p>
            <div
              onTouchStart={stopNestedTouch}
              onTouchMove={stopNestedTouch}
              className="flex items-center gap-2 overflow-x-auto sm:flex-wrap no-scrollbar pb-1 nested-carousel"
            >
              <button
                type="button"
                onClick={() => onSpecialtyChange('all')}
                className={`min-h-[48px] px-4 py-2 text-xs font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedSpecialty === 'all'
                    ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                    : 'bg-[#FAF9F6] text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
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
                    className={`min-h-[48px] px-4 py-2 text-xs font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                        : 'bg-[#FAF9F6] text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
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
        </div>
      </div>

      {/* ACTIVE FILTERS SUMMARY BAR */}
      {hasActiveFilters && (
        <div className="mt-5 pt-4 border-t border-[#E5E2DC] flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B57] mr-1">
            Sélection active :
          </span>
          {selectedStars !== 'all' && (
            <button
              type="button"
              onClick={() => onStarsChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#141413] text-[#FAF9F6] cursor-pointer"
            >
              <span>{selectedStars} Étoiles</span>
              <X className="w-3.5 h-3.5 text-[#B89758]" />
            </button>
          )}
          {selectedGreenStar && onGreenStarChange && (
            <button
              type="button"
              onClick={() => onGreenStarChange(false)}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-emerald-900 text-[#FAF9F6] cursor-pointer"
            >
              <span>Étoile Verte</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {selectedZone !== 'all' && (
            <button
              type="button"
              onClick={() => onZoneChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#9E1B24] text-[#FAF9F6] cursor-pointer"
            >
              <span>{selectedZone}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {selectedRegion !== 'all' && (
            <button
              type="button"
              onClick={() => onRegionChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#141413] text-[#FAF9F6] cursor-pointer"
            >
              <span>Région : {selectedRegion}</span>
              <X className="w-3.5 h-3.5 text-[#B89758]" />
            </button>
          )}
          {selectedDepartment !== 'all' && (
            <button
              type="button"
              onClick={() => onDepartmentChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#141413] text-[#FAF9F6] cursor-pointer"
            >
              <span>Dépt : {selectedDepartment}</span>
              <X className="w-3.5 h-3.5 text-[#B89758]" />
            </button>
          )}
          {selectedCity !== 'all' && (
            <button
              type="button"
              onClick={() => onCityChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#141413] text-[#FAF9F6] cursor-pointer"
            >
              <span>Ville : {selectedCity}</span>
              <X className="w-3.5 h-3.5 text-[#B89758]" />
            </button>
          )}
          {selectedCuisine !== 'all' && (
            <button
              type="button"
              onClick={() => onCuisineChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#141413] text-[#FAF9F6] cursor-pointer"
            >
              <span>{selectedCuisine}</span>
              <X className="w-3.5 h-3.5 text-[#B89758]" />
            </button>
          )}
          {selectedSpecialty !== 'all' && (
            <button
              type="button"
              onClick={() => onSpecialtyChange('all')}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs bg-[#9E1B24] text-[#FAF9F6] cursor-pointer"
            >
              <span>{selectedSpecialty}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
