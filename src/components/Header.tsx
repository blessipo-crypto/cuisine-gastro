import React, { useRef, useEffect, useState } from 'react';
import {
  BookMarked,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
  Award,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { MichelinStarIcon } from './MichelinStars';

export type MainSectionTab =
  | 'repertoire'
  | 'recettes'
  | 'creations'
  | 'savoir-faire'
  | 'palmares';

export const MAIN_SECTION_TABS: {
  id: MainSectionTab;
  label: string;
  shortLabel: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
}[] = [
  {
    id: 'repertoire',
    label: 'Chefs & Maisons',
    shortLabel: 'Chefs & Maisons',
    icon: Users,
  },
  {
    id: 'recettes',
    label: 'Grandes Recettes',
    shortLabel: 'Recettes',
    icon: UtensilsCrossed,
  },
  {
    id: 'creations',
    label: 'Plats Signatures',
    shortLabel: 'Créations',
    icon: Sparkles,
  },
  {
    id: 'savoir-faire',
    label: 'Savoir-Faire',
    shortLabel: 'Savoir-Faire',
    icon: BookOpen,
  },
  {
    id: 'palmares',
    label: 'Palmarès',
    shortLabel: 'Palmarès',
    icon: Award,
  },
];

interface HeaderProps {
  activeSection: MainSectionTab;
  onSelectSection: (section: MainSectionTab) => void;
  savedCount: number;
  shoppingCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenCarnet: () => void;
  onOpenShopping: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  savedCount,
  shoppingCount,
  isDarkMode,
  onToggleDarkMode,
  isFullscreen,
  onToggleFullscreen,
  onOpenCarnet,
  onOpenShopping,
}) => {
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const desktopBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [desktopIndicator, setDesktopIndicator] = useState({ left: 0, width: 0 });
  const [mobileIndicator, setMobileIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = Math.max(
    0,
    MAIN_SECTION_TABS.findIndex((t) => t.id === activeSection)
  );

  // Measure and position sliding underline indicators on activeSection change or resize
  useEffect(() => {
    const updateIndicators = () => {
      const dBtn = desktopBtnRefs.current[activeIndex];
      if (dBtn) {
        setDesktopIndicator({
          left: dBtn.offsetLeft,
          width: dBtn.offsetWidth,
        });
      }

      const mBtn = mobileBtnRefs.current[activeIndex];
      const mContainer = mobileNavRef.current;
      if (mBtn && mContainer) {
        setMobileIndicator({
          left: mBtn.offsetLeft,
          width: mBtn.offsetWidth,
        });
        const targetScrollLeft =
          mBtn.offsetLeft - mContainer.clientWidth / 2 + mBtn.offsetWidth / 2;
        mContainer.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    };

    updateIndicators();
    window.addEventListener('resize', updateIndicators);
    return () => window.removeEventListener('resize', updateIndicators);
  }, [activeIndex, isFullscreen, isDarkMode]);

  return (
    <header
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E2DC] transition-all duration-300"
    >
      {/* Top Bar: Brand Wordmark + Desktop Section Tabs + Dark Mode/Fullscreen/Carnet/Courses Actions */}
      <div className="max-w-[1340px] mx-auto px-3 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectSection('repertoire')}
          className="group min-h-[48px] inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B89758]"
        >
          <span className="w-7 h-7 rounded-full border border-[#E5E2DC] bg-white flex items-center justify-center transition-transform duration-300 group-hover:border-[#B89758]">
            <MichelinStarIcon className="w-3.5 h-3.5" variant="carmine" />
          </span>
          <span className="font-serif text-lg sm:text-2xl lg:text-[24px] font-medium tracking-tight text-[#141413]">
            Atlas des Chefs Étoilés
          </span>
        </button>

        {/* Zone 2: Ordered Main Section Tabs with Sliding Gold/Carmine Indicator (Desktop) */}
        <div
          ref={desktopNavRef}
          role="tablist"
          aria-label="Rubriques principales de l'Atlas"
          className="hidden xl:flex relative items-center gap-2 py-1"
        >
          {MAIN_SECTION_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  desktopBtnRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSection(tab.id)}
                className={`min-h-[48px] px-3.5 py-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#141413] font-semibold bg-white border border-[#E5E2DC]'
                    : 'text-[#5C5B57] hover:text-[#141413] border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? 'text-[#9E1B24]' : 'text-[#B89758]'}`}
                  strokeWidth={1.4}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* Sliding Animated Underline Indicator */}
          <span
            aria-hidden="true"
            style={{
              transform: `translate3d(${desktopIndicator.left}px, 0, 0)`,
              width: `${desktopIndicator.width}px`,
            }}
            className="pointer-events-none absolute bottom-0 left-0 h-[2.5px] bg-[#9E1B24] tab-indicator-slide"
          />
        </div>

        {/* Zone 3: Dark Mode + Fullscreen Mode + Install App + Courses + Carnet */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark Mode / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-pressed={isDarkMode}
            title={
              isDarkMode
                ? 'Passer au thème Clair Éditorial'
                : 'Passer au Mode Obscur (Salon Étoilé Nocturne)'
            }
            className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-medium text-[#141413] bg-white hover:border-[#B89758] border border-[#E5E2DC] rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isDarkMode ? (
              <Sun
                className="w-4 h-4 text-[#B89758]"
                strokeWidth={1.35}
                aria-hidden="true"
              />
            ) : (
              <Moon
                className="w-4 h-4 text-[#B89758]"
                strokeWidth={1.35}
                aria-hidden="true"
              />
            )}
            <span className="hidden lg:inline">
              {isDarkMode ? 'Mode Clair' : 'Mode Obscur'}
            </span>
          </button>

          {/* Fullscreen & Immersive Reading Toggle Button (Fullscreen API + hides search bar) */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-pressed={isFullscreen}
            title={
              isFullscreen
                ? 'Quitter le mode plein écran et réafficher la barre de recherche'
                : 'Mode plein écran : masquer la barre de recherche et maximiser la zone de lecture'
            }
            className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-medium border rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer ${
              isFullscreen
                ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                : 'bg-white text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
            }`}
          >
            {isFullscreen ? (
              <Minimize2
                className="w-4 h-4 text-[#FAF9F6]"
                strokeWidth={1.35}
                aria-hidden="true"
              />
            ) : (
              <Maximize2
                className="w-4 h-4 text-[#B89758]"
                strokeWidth={1.35}
                aria-hidden="true"
              />
            )}
            <span className="hidden md:inline">
              {isFullscreen ? 'Quitter Plein Écran' : 'Plein écran'}
            </span>
          </button>

          <PWAInstallButton />

          <button
            type="button"
            onClick={onOpenShopping}
            className="hidden sm:inline-flex min-h-[48px] min-w-[48px] items-center gap-2 px-3.5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium text-[#141413] bg-white hover:border-[#B89758] border border-[#E5E2DC] rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
            <span className="hidden lg:inline">Courses</span>
            <span className="font-mono tabular-nums text-[11px] text-[#9E1B24]">
              ({shoppingCount})
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenCarnet}
            className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] font-medium text-[#FAF9F6] bg-[#141413] hover:bg-[#9E1B24] border border-[#141413] rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E1B24] focus-visible:ring-offset-2"
          >
            <BookMarked className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
            <span className="hidden sm:inline">Carnet</span>
            <span className="font-mono tabular-nums text-[11px] text-[#B89758]">
              ({savedCount})
            </span>
          </button>
        </div>
      </div>

      {/* Ordered Section Tabs Bar for Mobile & Tablet with Sliding Animated Indicator */}
      <div className="xl:hidden border-t border-[#E5E2DC] bg-white/95">
        <div
          ref={mobileNavRef}
          role="tablist"
          aria-label="Sélection des rubriques de l'Atlas (glissez ou touchez)"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="relative max-w-[1340px] mx-auto px-3 sm:px-8 pt-1.5 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar nested-carousel"
        >
          {MAIN_SECTION_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  mobileBtnRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSection(tab.id)}
                className={`min-h-[48px] min-w-[48px] px-4 py-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.13em] font-medium border transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#FAF9F6] text-[#141413] font-semibold border-[#B89758]/60'
                    : 'bg-white text-[#5C5B57] border-[#E5E2DC] hover:border-[#B89758] hover:text-[#141413]'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-[#9E1B24]' : 'text-[#B89758]'
                  }`}
                  strokeWidth={1.4}
                />
                <span>{tab.shortLabel}</span>
              </button>
            );
          })}

          {/* Sliding Animated Carmine/Gold Underline Indicator */}
          <span
            aria-hidden="true"
            style={{
              transform: `translate3d(${mobileIndicator.left}px, 0, 0)`,
              width: `${mobileIndicator.width}px`,
            }}
            className="pointer-events-none absolute bottom-0 left-0 h-[3px] bg-[#9E1B24] tab-indicator-slide"
          />
        </div>
      </div>
    </header>
  );
};
