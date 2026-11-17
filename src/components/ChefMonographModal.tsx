import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Clock,
  Wine,
  ChefHat,
  Check,
  MapPin,
  Sparkles,
  Phone,
  ExternalLink,
  Thermometer,
  Wrench,
  Printer,
  ClipboardCheck,
  BookOpenCheck,
  ArrowUpRight,
  ShoppingBag,
  Plus,
} from 'lucide-react';
import { Chef } from '../types/chef';
import { TECHNIQUES_GLOSSARY } from '../data/techniquesGlossary';
import { InteractivePhotoGallery } from './InteractivePhotoGallery';
import { MichelinStars, GreenStarIcon } from './MichelinStars';
import { ResilientImage } from './ResilientImage';
import { ShoppingListItem } from './ShoppingListDrawer';

export type MonographTab = 'bio' | 'gallery' | 'recipe' | 'glossary';

interface ChefMonographModalProps {
  chef: Chef | null;
  initialTab?: MonographTab;
  isSaved: boolean;
  shoppingItems: ShoppingListItem[];
  onToggleSave: (chefId: string) => void;
  onAddIngredientToShopping: (item: Omit<ShoppingListItem, 'id' | 'checked'>) => void;
  onAddAllIngredientsToShopping: (items: Omit<ShoppingListItem, 'id' | 'checked'>[]) => void;
  onOpenShoppingDrawer: () => void;
  onClose: () => void;
  onFilterBySpecialty: (specialty: string) => void;
}

export const ChefMonographModal: React.FC<ChefMonographModalProps> = ({
  chef,
  initialTab = 'bio',
  isSaved,
  shoppingItems,
  onToggleSave,
  onAddIngredientToShopping,
  onAddAllIngredientsToShopping,
  onOpenShoppingDrawer,
  onClose,
  onFilterBySpecialty,
}) => {
  const [activeTab, setActiveTab] = useState<MonographTab>(initialTab);
  const [servings, setServings] = useState<number>(4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [addedBatchNotice, setAddedBatchNotice] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
    setAddedBatchNotice(false);
    if (chef) {
      setServings(chef.signatureRecipe.baseServings);
      setCheckedIngredients({});
      setCheckedSteps({});
    }
  }, [chef, initialTab]);

  useEffect(() => {
    if (!chef) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [chef, onClose]);

  if (!chef) return null;

  const scaleFactor = servings / chef.signatureRecipe.baseServings;

  const formatAmount = (amount: number | null) => {
    if (amount === null) return '';
    const scaled = amount * scaleFactor;
    if (Number.isInteger(scaled)) return String(scaled);
    return scaled.toFixed(1).replace(/\.0$/, '').replace('.', ',');
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSendAllToShopping = () => {
    const batch = chef.signatureRecipe.ingredients.map((ing) => ({
      name: ing.name,
      quantityLabel: `${formatAmount(ing.amount)} ${ing.unit}`.trim(),
      prep: ing.prep,
      chefId: chef.id,
      chefName: chef.name,
      recipeTitle: chef.signatureRecipe.title,
    }));
    onAddAllIngredientsToShopping(batch);
    setAddedBatchNotice(true);
  };

  const isIngredientInShopping = (ingName: string) =>
    shoppingItems.some(
      (item) => item.chefId === chef.id && item.name.toLowerCase() === ingName.toLowerCase()
    );

  const chefTechniques = chef.signatureRecipe.techniquesUsed
    .map((id) => TECHNIQUES_GLOSSARY[id])
    .filter(Boolean);

  const sheet = chef.signatureRecipe.technicalSheet;
  const coverPhoto = chef.signatureRecipe.gallery[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141413]/70 backdrop-blur-xs flex items-center justify-center p-0 sm:p-5 lg:p-10 overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Monographie gastronomique de ${chef.name}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        className="w-full max-w-[1220px] h-[100dvh] sm:h-auto sm:max-h-[92dvh] bg-[#FAF9F6] border border-[#E5E2DC] flex flex-col overflow-hidden shadow-2xl overscroll-contain"
      >
        {/* Top Luxury Magazine Monograph Header */}
        <div className="px-4 sm:px-8 lg:px-12 py-4 sm:py-6 bg-white border-b border-[#E5E2DC] flex items-start justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-[#5C5B57]">
              <MichelinStars
                stars={chef.stars}
                greenStar={chef.greenStar}
                size="sm"
                variant="carmine"
                showLabel
              />
              <span className="text-[#E5E2DC]" aria-hidden="true">
                |
              </span>
              <span className="font-mono tabular-nums text-[#B89758]">
                Consécration {chef.starYear}
              </span>
              <span className="text-[#E5E2DC]" aria-hidden="true">
                |
              </span>
              <span>
                {chef.city} · {chef.departmentCode} ({chef.departmentName}) · {chef.country}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#141413] mt-1.5 truncate">
              {chef.name}
            </h2>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5C5B57]">
              <span className="font-serif italic text-lg sm:text-xl text-[#141413]">
                {chef.restaurant}
              </span>
              <span className="text-xs text-[#5C5B57] hidden md:inline">
                {chef.restaurantAddress}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleSave(chef.id)}
              className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                isSaved
                  ? 'bg-[#9E1B24] text-[#FAF9F6] border-[#9E1B24]'
                  : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
              }`}
            >
              <Bookmark
                className="w-4 h-4"
                strokeWidth={1.35}
                fill={isSaved ? 'currentColor' : 'none'}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">
                {isSaved ? 'Dans le Carnet' : 'Ajouter au Carnet'}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la monographie"
              className="min-w-[48px] min-h-[48px] border border-[#E5E2DC] bg-white hover:bg-[#141413] hover:text-[#FAF9F6] text-[#141413] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.35} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 4-Tab Monograph Switcher (48px+ touch targets, 8px+ gap, smooth touch scroll) */}
        <div
          role="tablist"
          aria-label="Sections de la monographie"
          className="px-4 sm:px-8 lg:px-12 bg-[#FAF9F6] border-b border-[#E5E2DC] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0"
        >
          {(
            [
              { id: 'bio', label: 'I. Portrait & Philosophie' },
              { id: 'gallery', label: 'II. Planches Photographiques' },
              { id: 'recipe', label: 'III. Recette & Ingrédients' },
              {
                id: 'glossary',
                label: `IV. Savoir-Faire (${chefTechniques.length})`,
              },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[48px] py-3 px-4 text-xs uppercase tracking-[0.14em] font-medium border-b-2 transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'border-[#9E1B24] text-[#141413] bg-white/60'
                    : 'border-transparent text-[#5C5B57] hover:text-[#141413]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Area (overscroll-behavior-y: contain) */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
          {/* TAB 1: LUXURY MAGAZINE SPREAD — PORTRAIT, PHILOSOPHY, SIGNATURE & DISTINCTIONS */}
          {activeTab === 'bio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Editorial Essay Column (7 columns) */}
              <div className="lg:col-span-7 space-y-10">
                {/* 1. Philosophie Culinaire (Editorial Pull Quote) */}
                <section
                  aria-label="Philosophie Culinaire"
                  className="p-6 sm:p-9 bg-white border border-[#E5E2DC] relative"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#B89758] mb-3">
                    Philosophie Culinaire
                  </p>
                  <blockquote className="font-serif italic text-2xl sm:text-3xl leading-[1.35] text-[#141413] text-balance">
                    « {chef.quote} »
                  </blockquote>
                  <footer className="mt-4 pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#5C5B57]">
                    <span>— {chef.name}</span>
                    <span className="text-[#B89758]">{chef.cuisineType}</span>
                  </footer>
                </section>

                {/* 2. Notice Biographique (16px+ comfortable reading size & 1.65 line-height) */}
                <section aria-label="Biographie">
                  <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758] mb-4">
                    Portrait & Écriture Gastronomique
                  </p>
                  <div className="space-y-5 max-w-prose text-base sm:text-[17px] leading-[1.65] text-[#141413]">
                    {chef.biography.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'first-letter:text-6xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none first-letter:text-[#9E1B24]'
                            : 'text-[#5C5B57]'
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>

                {/* 3. Parcours Gastronomique Chronologique */}
                <section aria-label="Parcours et filiation">
                  <div className="border-b border-[#E5E2DC] pb-4 mb-7">
                    <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                      Filiation & Maisons Formatrices
                    </p>
                    <h3 className="font-serif text-3xl font-normal text-[#141413] mt-1">
                      Parcours Initiatique & Consécration
                    </h3>
                  </div>

                  <div className="space-y-7">
                    {chef.culinaryJourney.map((step, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-7 border-b border-[#E5E2DC] last:border-b-0"
                      >
                        <div className="sm:col-span-4">
                          <p className="font-mono text-xs font-medium text-[#9E1B24] tabular-nums">
                            {step.period}
                          </p>
                          <p className="text-sm text-[#5C5B57] mt-1">{step.city}</p>
                        </div>
                        <div className="sm:col-span-8">
                          <h4 className="font-serif text-2xl font-medium text-[#141413]">
                            {step.house}
                          </h4>
                          <p className="text-[11px] uppercase tracking-[0.14em] text-[#B89758] mt-0.5">
                            {step.role}
                          </p>
                          <p className="mt-2.5 text-base text-[#5C5B57] leading-[1.55]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column (5 columns): Signature & Créations + Informations & Distinctions */}
              <aside className="lg:col-span-5 space-y-8">
                {/* Section "Signature & Créations" (Strict 4:3 Dish Photo Ratio) */}
                <div className="bg-white border border-[#E5E2DC] overflow-hidden">
                  <div
                    onClick={() => setActiveTab('gallery')}
                    className="relative aspect-[4/3] bg-[#F3F1EC] overflow-hidden cursor-pointer group"
                  >
                    <ResilientImage
                      src={coverPhoto.url}
                      alt={chef.signatureRecipe.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 text-[#FAF9F6]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89758]">
                        Signature & Créations
                      </p>
                      <h4 className="font-serif italic text-2xl text-[#FAF9F6] mt-0.5 leading-snug">
                        {chef.signatureRecipe.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-5">
                    <p className="text-base text-[#5C5B57] leading-[1.55]">
                      {chef.signatureRecipe.story}
                    </p>

                    {/* Specialties (48px+ touch targets & 8px+ gap) */}
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89758] mb-2.5">
                        Répertoire de Spécialités
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {chef.specialties.map((spec) => (
                          <button
                            key={spec}
                            type="button"
                            onClick={() => {
                              onFilterBySpecialty(spec);
                              onClose();
                            }}
                            className="min-h-[48px] px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E5E2DC] text-[#141413] hover:border-[#B89758] hover:text-[#9E1B24] transition-colors cursor-pointer"
                          >
                            {spec}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setActiveTab('recipe')}
                        className="min-h-[48px] py-2.5 px-4 text-xs uppercase tracking-[0.15em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Recette & Courses</span>
                        <ArrowUpRight className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('gallery')}
                        className="min-h-[48px] py-2.5 px-4 text-xs uppercase tracking-[0.15em] font-medium bg-[#FAF9F6] hover:border-[#B89758] text-[#141413] border border-[#E5E2DC] transition-colors cursor-pointer"
                      >
                        Galerie ({chef.signatureRecipe.gallery.length} vues)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Encadré "Informations & Distinctions" */}
                <div className="bg-white border border-[#E5E2DC] p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758] pb-3.5 border-b border-[#E5E2DC]">
                    Informations & Distinctions
                  </p>

                  <dl className="divide-y divide-[#E5E2DC] text-base">
                    <div className="py-3.5">
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
                        Maison d’Exercice
                      </dt>
                      <dd className="font-serif text-xl font-medium text-[#141413] mt-0.5">
                        {chef.restaurant}
                      </dd>
                      <dd className="text-sm text-[#5C5B57] mt-1 flex items-start gap-1.5">
                        <MapPin
                          className="w-4 h-4 text-[#B89758] mt-0.5 shrink-0"
                          strokeWidth={1.35}
                          aria-hidden="true"
                        />
                        <span>
                          {chef.restaurantAddress} · {chef.city} ({chef.departmentCode}),{' '}
                          {chef.country}
                        </span>
                      </dd>
                    </div>

                    {(chef.phone || chef.website) && (
                      <div className="py-3.5 space-y-2">
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
                          Réservations & Coordonnées
                        </dt>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {chef.phone && (
                            <dd>
                              <a
                                href={`tel:${chef.phone.replace(/\s+/g, '')}`}
                                className="min-h-[48px] px-3.5 inline-flex items-center gap-2 font-mono text-xs font-medium text-[#141413] bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] tabular-nums"
                              >
                                <Phone
                                  className="w-3.5 h-3.5 text-[#B89758]"
                                  strokeWidth={1.35}
                                  aria-hidden="true"
                                />
                                <span>{chef.phone}</span>
                              </a>
                            </dd>
                          )}
                          {chef.website && (
                            <dd>
                              <a
                                href={chef.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-h-[48px] px-3.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9E1B24] bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] break-all"
                              >
                                <span>{chef.website.replace(/^https?:\/\//, '')}</span>
                                <ExternalLink
                                  className="w-3.5 h-3.5 text-[#B89758] shrink-0"
                                  strokeWidth={1.35}
                                  aria-hidden="true"
                                />
                              </a>
                            </dd>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="py-3.5">
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57] mb-2">
                        Palmarès au Guide Michelin
                      </dt>
                      <dd className="space-y-2.5">
                        {chef.starHistory.map((item, idx) => (
                          <div key={idx} className="text-sm bg-[#FAF9F6] p-3.5 border border-[#E5E2DC]">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-semibold text-[#141413] tabular-nums">
                                {item.year}
                              </span>
                              <MichelinStars stars={item.stars} size="xs" variant="carmine" />
                            </div>
                            <p className="font-medium text-[#141413] mt-1">{item.restaurant}</p>
                            <p className="text-[#5C5B57] mt-0.5 text-xs">{item.note}</p>
                          </div>
                        ))}
                      </dd>
                    </div>

                    {chef.greenStar && (
                      <div className="py-3.5">
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
                          Engagement Durable
                        </dt>
                        <dd className="font-medium text-emerald-800 mt-1 flex items-center gap-2 text-sm">
                          <GreenStarIcon className="w-4 h-4" />
                          <span>Distinction Étoile Verte Michelin</span>
                        </dd>
                      </div>
                    )}

                    <div className="py-3.5">
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
                        État Civil & Origine
                      </dt>
                      <dd className="font-mono text-xs text-[#141413] mt-1 tabular-nums">
                        Nationalité {chef.nationality} · Né(e) en {chef.birthYear}
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          )}

          {/* TAB 2: INTERACTIVE PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E5E2DC]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                    Planches Photographiques Haute Définition
                  </p>
                  <h3 className="font-serif text-3xl lg:text-4xl font-normal text-[#141413] mt-1">
                    {chef.signatureRecipe.title}
                  </h3>
                  <p className="text-base text-[#5C5B57] mt-1.5 max-w-2xl leading-[1.5]">
                    {chef.signatureRecipe.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('recipe')}
                  className="min-h-[48px] px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Consulter la Recette & Fiche Technique
                </button>
              </div>

              <InteractivePhotoGallery
                photos={chef.signatureRecipe.gallery}
                dishTitle={chef.signatureRecipe.title}
                chefName={chef.name}
              />

              <div className="bg-white border border-[#E5E2DC] p-6 sm:p-7">
                <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#B89758]">
                  Genèse de la Création
                </p>
                <p className="mt-2.5 text-base text-[#141413] leading-[1.6] max-w-3xl">
                  {chef.signatureRecipe.story}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: DETAILED SIGNATURE RECIPE, INTERACTIVE INGREDIENTS & SHOPPING LIST ("EN CUISINE") */}
          {activeTab === 'recipe' && (
            <div className="space-y-10">
              {/* Recipe Header + Dish Cover Photo in 16:9 */}
              <div className="pb-7 border-b border-[#E5E2DC] space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                      Partition Culinaire & Fiche Technique · {chef.restaurant}
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#141413] mt-1.5">
                      {chef.signatureRecipe.title}
                    </h3>
                    <p className="text-base text-[#5C5B57] mt-2 max-w-2xl leading-[1.55]">
                      {chef.signatureRecipe.story}
                    </p>
                  </div>

                  {/* Interactive Servings Scaler (48x48px buttons) + Print */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <div className="bg-white border border-[#E5E2DC] p-3">
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-[#5C5B57] mb-2">
                        Nombre de Couverts :
                      </span>
                      <div className="flex items-center gap-2">
                        {[2, 4, 6, 8].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setServings(count)}
                            className={`min-w-[48px] min-h-[48px] px-3 py-2 text-sm font-mono border transition-all cursor-pointer tabular-nums ${
                              servings === count
                                ? 'bg-[#141413] text-[#FAF9F6] border-[#141413]'
                                : 'bg-[#FAF9F6] text-[#141413] border-[#E5E2DC] hover:border-[#B89758]'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="min-h-[48px] inline-flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-[0.15em] font-medium bg-white hover:bg-[#141413] hover:text-[#FAF9F6] text-[#141413] border border-[#E5E2DC] transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                      <span>Imprimer</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Operational Recipe Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 py-5 px-6 bg-white border border-[#E5E2DC] text-base">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#B89758] shrink-0" strokeWidth={1.35} aria-hidden="true" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
                      Préparation
                    </p>
                    <p className="font-mono font-medium text-[#141413] tabular-nums mt-0.5">
                      {chef.signatureRecipe.prepTimeMinutes} min
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-[#B89758] shrink-0" strokeWidth={1.35} aria-hidden="true" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">Cuisson</p>
                    <p className="font-mono font-medium text-[#141413] tabular-nums mt-0.5">
                      {chef.signatureRecipe.cookTimeMinutes} min
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#B89758] shrink-0" strokeWidth={1.35} aria-hidden="true" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">Exigence</p>
                    <p className="font-medium text-[#141413] mt-0.5">
                      {chef.signatureRecipe.difficulty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wine className="w-5 h-5 text-[#9E1B24] shrink-0" strokeWidth={1.35} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C5B57]">
                      Accord Sommelier
                    </p>
                    <p
                      className="font-medium text-[#141413] truncate mt-0.5"
                      title={chef.signatureRecipe.winePairing}
                    >
                      {chef.signatureRecipe.winePairing}
                    </p>
                  </div>
                </div>
              </div>

              {/* Two-Column Recipe Execution: Interactive Ingredients (48px+ rows, 16px+) + Preparation Steps (16px+, line-height 1.5) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* Ingredients Column */}
                <div className="lg:col-span-5 bg-white border border-[#E5E2DC] p-5 sm:p-7 h-fit">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E2DC] mb-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#141413]">
                        Ingrédients ({servings} couverts)
                      </h4>
                      <span className="text-xs text-[#5C5B57]">
                        Touchez pour cocher ou envoyer vers l’onglet Courses
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendAllToShopping}
                      className="min-h-[48px] px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] inline-flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer shrink-0"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                      <span>Tout envoyer vers Courses</span>
                    </button>
                  </div>

                  {addedBatchNotice && (
                    <div className="mb-4 p-3.5 bg-[#FAF9F6] border border-[#B89758] flex items-center justify-between gap-2 text-sm text-[#141413]">
                      <span>Ingrédients ajoutés à votre liste de courses.</span>
                      <button
                        type="button"
                        onClick={onOpenShoppingDrawer}
                        className="min-h-[48px] px-3 text-xs uppercase tracking-[0.14em] font-semibold text-[#9E1B24] underline underline-offset-4 cursor-pointer shrink-0"
                      >
                        Ouvrir Courses
                      </button>
                    </div>
                  )}

                  <ul className="divide-y divide-[#E5E2DC]">
                    {chef.signatureRecipe.ingredients.map((ing, idx) => {
                      const done = !!checkedIngredients[idx];
                      const inShopping = isIngredientInShopping(ing.name);
                      const scaledQty = `${formatAmount(ing.amount)} ${ing.unit}`.trim();

                      return (
                        <li key={idx} className="py-1.5 flex items-stretch gap-2">
                          {/* 48px+ Interactive Checkbox Row (16px font, line-height 1.5) */}
                          <button
                            type="button"
                            onClick={() => toggleIngredient(idx)}
                            className="flex-1 min-h-[52px] py-2 text-left flex items-center justify-between gap-3 cursor-pointer group"
                          >
                            <span className="flex items-start gap-3.5">
                              <span
                                className={`mt-1 w-6 h-6 border flex items-center justify-center shrink-0 transition-colors ${
                                  done
                                    ? 'bg-[#9E1B24] border-[#9E1B24] text-white'
                                    : 'border-[#B89758] bg-[#FAF9F6] group-hover:border-[#141413]'
                                }`}
                              >
                                {done && <Check className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />}
                              </span>
                              <span
                                className={`text-base leading-[1.5] ${
                                  done ? 'line-through text-[#5C5B57]/60' : 'text-[#141413]'
                                }`}
                              >
                                {ing.name}
                                {ing.prep && (
                                  <span className="block text-sm text-[#5C5B57] leading-[1.4]">
                                    ({ing.prep})
                                  </span>
                                )}
                              </span>
                            </span>
                            <span className="font-mono text-sm font-medium text-[#141413] tabular-nums whitespace-nowrap shrink-0">
                              {scaledQty}
                            </span>
                          </button>

                          {/* 48x48px Send Single Ingredient to Courses Button */}
                          <button
                            type="button"
                            onClick={() =>
                              onAddIngredientToShopping({
                                name: ing.name,
                                quantityLabel: scaledQty,
                                prep: ing.prep,
                                chefId: chef.id,
                                chefName: chef.name,
                                recipeTitle: chef.signatureRecipe.title,
                              })
                            }
                            title={
                              inShopping
                                ? `${ing.name} est déjà dans Courses`
                                : `Envoyer ${ing.name} vers Courses`
                            }
                            aria-label={`Envoyer ${ing.name} vers Courses`}
                            className={`min-w-[48px] min-h-[48px] self-center flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                              inShopping
                                ? 'bg-[#FAF9F6] border-[#B89758] text-[#9E1B24]'
                                : 'bg-[#FAF9F6] border-[#E5E2DC] text-[#5C5B57] hover:text-[#141413] hover:border-[#B89758]'
                            }`}
                          >
                            {inShopping ? (
                              <Check className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                            ) : (
                              <Plus className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Wine Pairing & Chef Tip */}
                  <div className="mt-7 pt-5 border-t border-[#E5E2DC] space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#B89758]">
                        Accord Mets & Vins
                      </p>
                      <p className="font-serif italic text-xl text-[#141413] mt-1">
                        {chef.signatureRecipe.winePairing}
                      </p>
                    </div>
                    <div className="p-5 bg-[#FAF9F6] border border-[#E5E2DC]">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#9E1B24]">
                        Confidence du Chef
                      </p>
                      <p className="text-base text-[#141413] mt-1.5 leading-[1.55]">
                        {chef.signatureRecipe.chefTip}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preparation Steps Column (16px+ font, 1.55 line-height, 48px+ touchable cards) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="pb-4 border-b border-[#E5E2DC] flex items-center justify-between gap-2">
                    <h4 className="font-serif text-2xl font-normal text-[#141413]">
                      Progression & Dressage
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="min-h-[48px] px-3 inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#9E1B24] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Voir les planches du dressage
                    </button>
                  </div>

                  <ol className="space-y-4">
                    {chef.signatureRecipe.steps.map((step, idx) => {
                      const completed = !!checkedSteps[idx];
                      return (
                        <li key={idx}>
                          <button
                            type="button"
                            onClick={() => toggleStep(idx)}
                            className={`w-full min-h-[64px] text-left p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                              completed
                                ? 'bg-[#FAF9F6] border-[#E5E2DC] text-[#5C5B57]'
                                : 'bg-white border-[#E5E2DC] hover:border-[#B89758] text-[#141413]'
                            }`}
                          >
                            <span
                              className={`font-mono text-sm font-medium px-3 py-1.5 tabular-nums shrink-0 ${
                                completed
                                  ? 'bg-[#E5E2DC] text-[#5C5B57]'
                                  : 'bg-[#141413] text-[#B89758]'
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            <span
                              className={`text-base sm:text-[17px] leading-[1.55] ${
                                completed ? 'line-through' : ''
                              }`}
                            >
                              {step}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              {/* PROFESSIONAL TECHNICAL SHEET (FICHE TECHNIQUE D'EXÉCUTION) */}
              <div className="bg-white border border-[#E5E2DC] p-6 sm:p-9 space-y-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E2DC]">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                      Fiche Technique de Brigade
                    </p>
                    <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413] mt-1">
                      Paramètres Thermiques & Ordonnancement
                    </h4>
                  </div>
                  <div className="text-xs font-mono text-[#5C5B57] space-y-1 sm:text-right">
                    <p>Rendement : {sheet.yieldLabel}</p>
                    <p>Service : {sheet.serviceTemp}</p>
                  </div>
                </div>

                {/* Equipment & Critical Temperatures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#FAF9F6] border border-[#E5E2DC]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#141413] mb-3.5 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} aria-hidden="true" />
                      <span>Batterie & Équipement Requis</span>
                    </p>
                    <ul className="space-y-2 text-base text-[#141413] leading-[1.5]">
                      {sheet.equipment.map((eq, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="text-[#B89758]" aria-hidden="true">
                            ·
                          </span>
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-[#FAF9F6] border border-[#E5E2DC]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#141413] mb-3.5 flex items-center gap-2">
                      <Thermometer
                        className="w-4 h-4 text-[#9E1B24]"
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                      <span>Repères Thermiques Critiques</span>
                    </p>
                    <dl className="divide-y divide-[#E5E2DC] text-base">
                      {sheet.criticalTemperatures.map((item, i) => (
                        <div key={i} className="py-2.5 flex items-center justify-between gap-4">
                          <dt className="text-[#5C5B57]">{item.label}</dt>
                          <dd className="font-mono text-xs font-semibold text-[#9E1B24] tabular-nums text-right">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Production Phases Matrix */}
                {sheet.phases.length > 0 && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#5C5B57] mb-3.5">
                      Phases d’Allotissement & Progression
                    </p>
                    <div className="border border-[#E5E2DC] divide-y divide-[#E5E2DC]">
                      {sheet.phases.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline"
                        >
                          <div className="sm:col-span-4">
                            <p className="font-medium text-base text-[#141413]">{p.phase}</p>
                            <p className="font-mono text-xs text-[#B89758] mt-0.5 tabular-nums">
                              {p.duration}
                            </p>
                          </div>
                          <div className="sm:col-span-8 text-base text-[#5C5B57] leading-[1.5]">
                            {p.details}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quality Checkpoints + Link to Technique Glossary */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  {sheet.qualityCheckpoints.length > 0 && (
                    <div className="lg:col-span-8 p-6 bg-[#FAF9F6] border border-[#E5E2DC]">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#141413] mb-3 flex items-center gap-2">
                        <ClipboardCheck
                          className="w-4 h-4 text-[#B89758]"
                          strokeWidth={1.35}
                          aria-hidden="true"
                        />
                        <span>Contrôle Qualité au Passe</span>
                      </p>
                      <ul className="space-y-2 text-base text-[#141413] leading-[1.5]">
                        {sheet.qualityCheckpoints.map((cp, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="font-mono text-xs text-[#9E1B24] mt-1">✓</span>
                            <span>{cp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="lg:col-span-4 p-6 bg-[#141413] text-[#FAF9F6] flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89758]">
                        Savoir-Faire Mobilisés
                      </p>
                      <p className="font-serif text-2xl mt-1">
                        {chefTechniques.length} gestes techniques détaillés
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('glossary')}
                      className="mt-5 w-full min-h-[48px] py-2.5 px-4 text-xs uppercase tracking-[0.16em] font-medium bg-[#9E1B24] hover:bg-[#B89758] hover:text-[#141413] text-[#FAF9F6] transition-colors cursor-pointer"
                    >
                      Consulter le Savoir-Faire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHEF-SPECIFIC TECHNIQUES GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E5E2DC]">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                    <BookOpenCheck className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
                    <span>Lexique Technique · {chef.name}</span>
                  </div>
                  <h3 className="font-serif text-3xl lg:text-4xl font-normal text-[#141413] mt-1">
                    Gestes & Procédés Culinaires Mobilisés
                  </h3>
                  <p className="text-base text-[#5C5B57] mt-1.5 max-w-2xl leading-[1.5]">
                    Définitions précises et mode opératoire pour réussir les techniques employées
                    dans « {chef.signatureRecipe.title} ».
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('recipe')}
                  className="min-h-[48px] px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Retour à la Fiche Technique
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {chefTechniques.map((tech) => (
                  <article
                    key={tech.id}
                    className="bg-white border border-[#E5E2DC] p-6 sm:p-8 flex flex-col justify-between space-y-5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#E5E2DC]">
                        <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#B89758]">
                          {tech.category}
                        </span>
                        <span className="font-mono text-xs text-[#9E1B24] tabular-nums">
                          {tech.temperatureOrTiming}
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] mt-3.5">
                        {tech.term}
                      </h4>
                      <p className="mt-2.5 text-base text-[#141413] leading-[1.55]">
                        {tech.summary}
                      </p>

                      <div className="mt-5 p-5 bg-[#FAF9F6] border border-[#E5E2DC]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89758]">
                          Protocole d’Exécution en Brigade
                        </p>
                        <p className="mt-1.5 text-base text-[#5C5B57] leading-[1.55]">
                          {tech.howToPerform}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-[#E5E2DC] flex items-center justify-between text-xs text-[#5C5B57]">
                      <span>Paramètre clé : {tech.temperatureOrTiming}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
