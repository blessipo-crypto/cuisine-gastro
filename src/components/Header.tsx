import React from 'react';
import { BookMarked } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  savedCount: number;
  onOpenCarnet: () => void;
  onOpenRegionTab?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenCarnet,
  onOpenRegionTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#accueil"
          className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B]"
        >
          Atlas des Chefs Étoilés
        </a>

        {/* Zone 2: 5 concise single-line nav links (Desktop / PC) */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600"
        >
          <a
            href="#repertoire"
            className="hover:text-stone-900 hover:underline underline-offset-8 decoration-[#991B1B] transition-colors whitespace-nowrap shrink-0"
          >
            Répertoire
          </a>
          <a
            href="#repertoire"
            onClick={(e) => {
              if (onOpenRegionTab) {
                e.preventDefault();
                onOpenRegionTab();
              }
            }}
            className="hover:text-stone-900 hover:underline underline-offset-8 decoration-[#991B1B] transition-colors whitespace-nowrap shrink-0"
          >
            Par Région
          </a>
          <a
            href="#meilleures-recettes"
            className="hover:text-stone-900 hover:underline underline-offset-8 decoration-[#991B1B] transition-colors whitespace-nowrap shrink-0"
          >
            Recettes
          </a>
          <a
            href="#glossaire"
            className="hover:text-stone-900 hover:underline underline-offset-8 decoration-[#991B1B] transition-colors whitespace-nowrap shrink-0"
          >
            Glossaire
          </a>
          <a
            href="#chronologie"
            className="hover:text-stone-900 hover:underline underline-offset-8 decoration-[#991B1B] transition-colors whitespace-nowrap shrink-0"
          >
            Parcours
          </a>
        </nav>

        {/* Zone 3: Install App (when available) + Primary Carnet action */}
        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton />
          <button
            type="button"
            onClick={onOpenCarnet}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-medium text-[#FBF9F5] bg-stone-900 hover:bg-[#991B1B] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
          >
            <BookMarked className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Carnet</span>
            <span className="font-mono tabular-nums text-[11px] opacity-80">({savedCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile / Phone Quick Navigation Strip (< md) */}
      <nav
        aria-label="Navigation rapide mobile"
        className="md:hidden border-t border-stone-200/80 bg-[#F3EFE7]/75 px-4 py-2 flex items-center gap-5 overflow-x-auto text-xs font-medium text-stone-700"
      >
        <a href="#repertoire" className="whitespace-nowrap shrink-0 hover:text-[#991B1B]">
          Répertoire
        </a>
        <a
          href="#repertoire"
          onClick={(e) => {
            if (onOpenRegionTab) {
              e.preventDefault();
              onOpenRegionTab();
            }
          }}
          className="whitespace-nowrap shrink-0 hover:text-[#991B1B]"
        >
          Par Région
        </a>
        <a href="#meilleures-recettes" className="whitespace-nowrap shrink-0 hover:text-[#991B1B]">
          Recettes
        </a>
        <a href="#glossaire" className="whitespace-nowrap shrink-0 hover:text-[#991B1B]">
          Glossaire
        </a>
        <a href="#chronologie" className="whitespace-nowrap shrink-0 hover:text-[#991B1B]">
          Parcours
        </a>
      </nav>
    </header>
  );
};
