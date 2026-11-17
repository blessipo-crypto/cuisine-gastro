import React from 'react';
import { X, Trash2, ArrowUpRight, BookMarked } from 'lucide-react';
import { Chef } from '../types/chef';
import { ResilientImage } from './ResilientImage';
import { MichelinStars } from './MichelinStars';

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
      className="fixed inset-0 z-50 bg-[#141413]/55 backdrop-blur-xs flex justify-end overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mon carnet de tables et recettes"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        className="w-full max-w-md h-[100dvh] bg-[#FAF9F6] border-l border-[#E5E2DC] flex flex-col shadow-2xl overscroll-contain"
      >
        <div className="px-6 py-5 bg-white border-b border-[#E5E2DC] flex items-center justify-between gap-4 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
              Collection Personnelle
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413] mt-0.5">
              Carnet de Table ({savedChefs.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le carnet"
            className="min-w-[48px] min-h-[48px] border border-[#E5E2DC] bg-[#FAF9F6] hover:bg-[#141413] hover:text-[#FAF9F6] text-[#5C5B57] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.35} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5">
          {savedChefs.length === 0 ? (
            <div className="py-16 text-center px-5 bg-white border border-[#E5E2DC]">
              <BookMarked
                className="w-8 h-8 text-[#B89758] mx-auto mb-3.5"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <p className="font-serif text-2xl text-[#141413]">
                Votre carnet est vierge
              </p>
              <p className="mt-2.5 text-base text-[#5C5B57] leading-[1.5]">
                Enregistrez vos chefs favoris et leurs partitions culinaires depuis le répertoire
                pour les retrouver ici à tout moment.
              </p>
            </div>
          ) : (
            savedChefs.map((chef) => (
              <div
                key={chef.id}
                className="bg-white border border-[#E5E2DC] overflow-hidden transition-colors hover:border-[#B89758]/60"
              >
                <div className="flex gap-4 p-4">
                  <div className="w-20 aspect-[4/5] bg-[#F3F1EC] overflow-hidden shrink-0">
                    <ResilientImage
                      src={chef.signatureRecipe.gallery[0].url}
                      alt={chef.signatureRecipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <MichelinStars
                        stars={chef.stars}
                        greenStar={chef.greenStar}
                        size="xs"
                        variant="carmine"
                      />
                      <span className="font-mono text-[10px] text-[#5C5B57] tabular-nums">
                        · {chef.city}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#141413] truncate mt-1">
                      {chef.name}
                    </h3>
                    <p className="font-serif italic text-sm text-[#5C5B57] truncate">
                      {chef.restaurant}
                    </p>
                    <p className="text-sm text-[#141413] mt-1.5 line-clamp-1">
                      {chef.signatureRecipe.title}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 bg-[#FAF9F6] border-t border-[#E5E2DC] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onRemoveChef(chef.id)}
                    className="min-h-[48px] px-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#5C5B57] hover:text-[#9E1B24] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
                    <span>Retirer</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectChef(chef, 'recipe');
                        onClose();
                      }}
                      className="min-h-[48px] px-2.5 inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#5C5B57] hover:text-[#141413] cursor-pointer"
                    >
                      Partition
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectChef(chef, 'bio');
                        onClose();
                      }}
                      className="min-h-[48px] px-2.5 inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] font-medium text-[#141413] hover:text-[#9E1B24] cursor-pointer"
                    >
                      <span>Monographie</span>
                      <ArrowUpRight className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
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
