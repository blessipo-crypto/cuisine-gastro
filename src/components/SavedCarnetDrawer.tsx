import React from 'react';
import { X, Trash2, ArrowUpRight, BookMarked } from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';

interface SavedCarnetDrawerProps {
  isOpen: boolean;
  savedChefs: Chef[];
  onClose: () => void;
  onRemoveChef: (chefId: string) => void;
  onSelectChef: (
    chef: Chef,
    tab?: 'bio' | 'gallery' | 'recipe' | 'glossary'
  ) => void;
}

export const SavedCarnetDrawer: React.FC<SavedCarnetDrawerProps> = ({
  isOpen,
  savedChefs,
  onClose,
  onRemoveChef,
  onSelectChef,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-[2px] flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mon carnet de tables et recettes"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#FBF9F5] border-l border-stone-300 flex flex-col"
      >
        <div className="px-6 py-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
              Sélection Personnelle
            </p>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mt-0.5">
              Carnet de Table ({savedChefs.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le carnet"
            className="w-9 h-9 rounded-md border border-stone-300 hover:bg-stone-900 hover:text-white text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedChefs.length === 0 ? (
            <div className="py-16 text-center px-4">
              <BookMarked className="w-8 h-8 text-stone-400 mx-auto mb-3" aria-hidden="true" />
              <p className="font-serif text-xl text-stone-800">
                Votre carnet est vide
              </p>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                Enregistrez vos chefs favoris et leurs recettes phares depuis le répertoire pour les
                retrouver ici à tout moment.
              </p>
            </div>
          ) : (
            savedChefs.map((chef) => (
              <div
                key={chef.id}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden"
              >
                <div className="flex gap-3.5 p-3.5">
                  <div className="w-20 h-20 rounded bg-stone-200 overflow-hidden shrink-0">
                    <ResilientImage
                      src={chef.signatureRecipe.gallery[0].url}
                      alt={chef.signatureRecipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-[#991B1B] tabular-nums">
                      {'★'.repeat(chef.stars)} · {chef.starYear} · {chef.city}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-stone-900 truncate">
                      {chef.name}
                    </h3>
                    <p className="text-xs text-stone-500 truncate">{chef.restaurant}</p>
                    <p className="text-xs font-serif italic text-stone-700 mt-1 line-clamp-1">
                      {chef.signatureRecipe.title}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 bg-[#FBF9F5] border-t border-stone-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onRemoveChef(chef.id)}
                    className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#991B1B] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Retirer</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectChef(chef, 'recipe');
                        onClose();
                      }}
                      className="text-xs font-medium text-stone-700 hover:text-[#991B1B] cursor-pointer"
                    >
                      Recette
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectChef(chef, 'bio');
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-[#991B1B] cursor-pointer"
                    >
                      <span>Ouvrir</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
