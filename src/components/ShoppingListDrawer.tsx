import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Check,
  Trash2,
  Plus,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { Chef } from '../types/chef';

export interface ShoppingListItem {
  id: string;
  name: string;
  quantityLabel: string;
  prep?: string;
  chefId?: string;
  chefName?: string;
  recipeTitle?: string;
  checked: boolean;
}

interface ShoppingListDrawerProps {
  isOpen: boolean;
  items: ShoppingListItem[];
  chefs: Chef[];
  onClose: () => void;
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearChecked: () => void;
  onClearAll: () => void;
  onAddCustomItem: (name: string, quantityLabel: string) => void;
  onOpenChefRecipe: (chef: Chef) => void;
}

export const ShoppingListDrawer: React.FC<ShoppingListDrawerProps> = ({
  isOpen,
  items,
  chefs,
  onClose,
  onToggleItem,
  onRemoveItem,
  onClearChecked,
  onClearAll,
  onAddCustomItem,
  onOpenChefRecipe,
}) => {
  const [customName, setCustomName] = useState('');
  const [customQty, setCustomQty] = useState('');

  if (!isOpen) return null;

  const checkedCount = items.filter((item) => item.checked).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customName.trim();
    if (!trimmed) return;
    onAddCustomItem(trimmed, customQty.trim() || 'Au goût');
    setCustomName('');
    setCustomQty('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141413]/60 backdrop-blur-xs flex justify-end overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Liste de courses et mise en place"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        className="w-full max-w-lg h-[100dvh] bg-[#FAF9F6] border-l border-[#E5E2DC] flex flex-col shadow-2xl overscroll-contain"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E5E2DC] flex items-center justify-between gap-4 shrink-0">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
              Carnet d’Approvisionnement · En Cuisine
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413] mt-0.5">
              Liste de Courses ({items.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la liste de courses"
            className="min-w-[48px] min-h-[48px] border border-[#E5E2DC] bg-[#FAF9F6] hover:bg-[#141413] hover:text-[#FAF9F6] text-[#141413] flex items-center justify-center transition-colors duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.35} aria-hidden="true" />
          </button>
        </div>

        {/* Add Custom Market Ingredient Form */}
        <form
          onSubmit={handleAddSubmit}
          className="px-6 py-4 bg-white border-b border-[#E5E2DC] space-y-3 shrink-0"
        >
          <label
            htmlFor="custom-shopping-item"
            className="block text-[11px] uppercase tracking-[0.16em] text-[#5C5B57] font-medium"
          >
            Ajouter un produit du marché
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="custom-shopping-item"
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Ex. : Beurre de baratte demi-sel, fleur de sel…"
              className="flex-1 min-h-[48px] px-4 text-base bg-[#FAF9F6] border border-[#E5E2DC] text-[#141413] placeholder:text-[#5C5B57]/60 focus:outline-none focus:border-[#B89758]"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value)}
                placeholder="Quantité (ex. 250 g)"
                aria-label="Quantité souhaitée"
                className="w-full sm:w-36 min-h-[48px] px-3.5 text-base bg-[#FAF9F6] border border-[#E5E2DC] text-[#141413] placeholder:text-[#5C5B57]/60 focus:outline-none focus:border-[#B89758]"
              />
              <button
                type="submit"
                aria-label="Ajouter à la liste de courses"
                className="min-w-[48px] min-h-[48px] px-4 bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] text-xs uppercase tracking-[0.14em] font-medium inline-flex items-center justify-center gap-1.5 transition-colors duration-300 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 text-[#B89758]" strokeWidth={1.5} aria-hidden="true" />
                <span>Ajouter</span>
              </button>
            </div>
          </div>
        </form>

        {/* Scrollable Shopping List Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center px-4 bg-white border border-[#E5E2DC]">
              <ShoppingBag
                className="w-9 h-9 text-[#B89758] mx-auto mb-3.5"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <p className="font-serif text-2xl text-[#141413]">
                Votre panier d’approvisionnement est vide
              </p>
              <p className="mt-2.5 text-base text-[#5C5B57] leading-[1.5] max-w-sm mx-auto">
                Depuis n’importe quelle fiche recette de chef étoilé, touchez le bouton{' '}
                <strong className="font-medium text-[#141413]">« Envoyer vers Courses »</strong> ou
                le panier à côté d’un ingrédient pour préparer votre marché.
              </p>
            </div>
          ) : (
            <>
              {/* Quick Summary & Bulk Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <p className="text-sm text-[#5C5B57] tabular-nums">
                  <strong className="font-medium text-[#141413]">{checkedCount}</strong> sur{' '}
                  {items.length} produits cochés
                </p>

                <div className="flex items-center gap-2">
                  {checkedCount > 0 && (
                    <button
                      type="button"
                      onClick={onClearChecked}
                      className="min-h-[48px] px-3.5 text-xs uppercase tracking-[0.14em] font-medium bg-white border border-[#E5E2DC] text-[#5C5B57] hover:text-[#141413] hover:border-[#B89758] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.35} />
                      <span>Retirer cochés</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="min-h-[48px] px-3.5 text-xs uppercase tracking-[0.14em] font-medium bg-white border border-[#E5E2DC] text-[#9E1B24] hover:bg-[#9E1B24] hover:text-[#FAF9F6] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.35} />
                    <span>Tout vider</span>
                  </button>
                </div>
              </div>

              {/* Touch-Friendly 48px+ Ingredient Checklist */}
              <ul className="space-y-2.5">
                {items.map((item) => {
                  const sourceChef = item.chefId
                    ? chefs.find((c) => c.id === item.chefId)
                    : undefined;

                  return (
                    <li
                      key={item.id}
                      className={`bg-white border transition-all duration-300 ${
                        item.checked
                          ? 'border-[#E5E2DC] bg-[#FAF9F6]/70'
                          : 'border-[#E5E2DC] hover:border-[#B89758]'
                      }`}
                    >
                      <div className="flex items-stretch gap-2 p-2">
                        <button
                          type="button"
                          onClick={() => onToggleItem(item.id)}
                          className="flex-1 min-h-[48px] px-2 py-2 text-left flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-start gap-3.5">
                            <span
                              className={`mt-1 w-6 h-6 border flex items-center justify-center shrink-0 transition-colors ${
                                item.checked
                                  ? 'bg-[#9E1B24] border-[#9E1B24] text-[#FAF9F6]'
                                  : 'border-[#B89758] bg-[#FAF9F6]'
                              }`}
                            >
                              {item.checked && (
                                <Check className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                              )}
                            </span>

                            <div>
                              <p
                                className={`text-base leading-[1.5] font-medium ${
                                  item.checked
                                    ? 'line-through text-[#5C5B57]/60'
                                    : 'text-[#141413]'
                                }`}
                              >
                                {item.name}
                              </p>
                              {item.prep && (
                                <p className="text-sm text-[#5C5B57] leading-[1.4] mt-0.5">
                                  Préparation : {item.prep}
                                </p>
                              )}
                              {item.recipeTitle && (
                                <p className="text-xs font-serif italic text-[#B89758] mt-1">
                                  {item.chefName} — {item.recipeTitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="font-mono text-sm font-medium text-[#141413] tabular-nums whitespace-nowrap shrink-0 pt-0.5">
                            {item.quantityLabel}
                          </span>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          {sourceChef && (
                            <button
                              type="button"
                              onClick={() => {
                                onOpenChefRecipe(sourceChef);
                                onClose();
                              }}
                              title={`Ouvrir la recette de ${sourceChef.name}`}
                              aria-label={`Ouvrir la recette de ${sourceChef.name}`}
                              className="min-w-[48px] min-h-[48px] flex items-center justify-center text-[#5C5B57] hover:text-[#141413] border border-transparent hover:border-[#E5E2DC] transition-colors cursor-pointer"
                            >
                              <ArrowUpRight className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Supprimer ${item.name}`}
                            className="min-w-[48px] min-h-[48px] flex items-center justify-center text-[#5C5B57] hover:text-[#9E1B24] border border-transparent hover:border-[#E5E2DC] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
