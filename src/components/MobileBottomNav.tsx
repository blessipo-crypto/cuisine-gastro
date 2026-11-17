import React, { useState, useEffect } from 'react';
import { ChefHat, Search, Bookmark, ShoppingBag } from 'lucide-react';

export type MobileNavTab = 'home' | 'search' | 'favorites' | 'shopping';

interface MobileBottomNavProps {
  activeTab: MobileNavTab;
  savedCount: number;
  shoppingCount: number;
  onSelectTab: (tab: MobileNavTab) => void;
}

const NAV_ITEMS: {
  id: MobileNavTab;
  label: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
}[] = [
  {
    id: 'home',
    label: 'Accueil / Chefs',
    icon: ChefHat,
  },
  {
    id: 'search',
    label: 'Recherche',
    icon: Search,
  },
  {
    id: 'favorites',
    label: 'Favoris',
    icon: Bookmark,
  },
  {
    id: 'shopping',
    label: 'Courses',
    icon: ShoppingBag,
  },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  savedCount,
  shoppingCount,
  onSelectTab,
}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const checkInputFocus = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName.toLowerCase();
      return (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        target.isContentEditable
      );
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (checkInputFocus(e.target)) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      window.setTimeout(() => {
        if (!checkInputFocus(document.activeElement)) {
          setIsKeyboardOpen(false);
        }
      }, 100);
    };

    const handleViewportResize = () => {
      if (!window.visualViewport) return;
      const heightRatio = window.visualViewport.height / window.innerHeight;
      if (heightRatio < 0.78) {
        setIsKeyboardOpen(true);
      } else if (!checkInputFocus(document.activeElement)) {
        setIsKeyboardOpen(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.visualViewport?.addEventListener('resize', handleViewportResize);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.visualViewport?.removeEventListener('resize', handleViewportResize);
    };
  }, []);

  const activeIdx = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeTab)
  );

  return (
    <nav
      aria-label="Navigation principale mobile"
      aria-hidden={isKeyboardOpen}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#E5E2DC] shadow-[0_-8px_28px_-12px_rgba(20,20,19,0.08)] transition-all duration-300 ease-out ${
        isKeyboardOpen
          ? 'translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative max-w-[1340px] mx-auto px-2 sm:px-6 grid grid-cols-4 gap-2 py-1.5">
        {/* Sliding Animated Gold/Carmine Indicator Bar */}
        <span
          aria-hidden="true"
          style={{
            width: 'calc((100% - 1rem) / 4)',
            transform: `translate3d(calc(${activeIdx * 100}%), 0, 0)`,
          }}
          className="pointer-events-none absolute top-0 left-2 h-[2.5px] bg-[#9E1B24] tab-indicator-slide"
        />

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const badge =
            item.id === 'favorites'
              ? savedCount
              : item.id === 'shopping'
              ? shoppingCount
              : undefined;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative min-h-[52px] min-w-[48px] px-2 py-1.5 flex flex-col items-center justify-center rounded-sm transition-all duration-300 ease-out cursor-pointer select-none ${
                isActive
                  ? 'text-[#9E1B24] bg-white border border-[#E5E2DC] shadow-[0_2px_10px_-4px_rgba(20,20,19,0.06)]'
                  : 'text-[#5C5B57] hover:text-[#141413] border border-transparent'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? 'text-[#9E1B24] scale-105' : 'text-[#5C5B57]'
                  }`}
                  strokeWidth={isActive ? 1.5 : 1.35}
                  aria-hidden="true"
                />
                {typeof badge === 'number' && badge > 0 && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 font-mono text-[10px] leading-none tabular-nums rounded-xs ${
                      isActive
                        ? 'bg-[#9E1B24] text-[#FAF9F6]'
                        : 'bg-[#141413] text-[#B89758]'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <span
                className={`mt-1 text-[11px] tracking-[0.06em] font-medium whitespace-nowrap truncate max-w-full ${
                  isActive ? 'text-[#141413] font-semibold' : 'text-[#5C5B57]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
