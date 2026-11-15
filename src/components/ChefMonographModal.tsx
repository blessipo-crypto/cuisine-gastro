import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Clock,
  Wine,
  ChefHat,
  Check,
  MapPin,
  Award,
  Sparkles,
  Phone,
  ExternalLink,
  Thermometer,
  Wrench,
  Printer,
  ClipboardCheck,
  BookOpenCheck,
} from 'lucide-react';
import { Chef } from '../types/chef';
import { TECHNIQUES_GLOSSARY } from '../data/techniquesGlossary';
import { InteractivePhotoGallery } from './InteractivePhotoGallery';

export type MonographTab = 'bio' | 'gallery' | 'recipe' | 'glossary';

interface ChefMonographModalProps {
  chef: Chef | null;
  initialTab?: MonographTab;
  isSaved: boolean;
  onToggleSave: (chefId: string) => void;
  onClose: () => void;
  onFilterBySpecialty: (specialty: string) => void;
}

export const ChefMonographModal: React.FC<ChefMonographModalProps> = ({
  chef,
  initialTab = 'bio',
  isSaved,
  onToggleSave,
  onClose,
  onFilterBySpecialty,
}) => {
  const [activeTab, setActiveTab] = useState<MonographTab>(initialTab);
  const [servings, setServings] = useState<number>(4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveTab(initialTab);
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

  const chefTechniques = chef.signatureRecipe.techniquesUsed
    .map((id) => TECHNIQUES_GLOSSARY[id])
    .filter(Boolean);

  const sheet = chef.signatureRecipe.technicalSheet;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-[2px] flex items-center justify-center p-0 sm:p-4 lg:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier gastronomique de ${chef.name}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1140px] h-full sm:h-auto sm:max-h-[92vh] bg-[#FBF9F5] sm:rounded-lg border border-stone-300 flex flex-col overflow-hidden"
      >
        {/* Top Monograph Header */}
        <div className="px-6 lg:px-10 py-5 bg-white border-b border-stone-200 flex items-start justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-stone-500">
              <span className="text-[#991B1B] font-medium">
                {'★'.repeat(chef.stars)} {chef.stars}{' '}
                {chef.stars > 1 ? 'Étoiles' : 'Étoile'} Michelin
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Étoile obtenue en {chef.starYear}</span>
              <span aria-hidden="true">·</span>
              <span>
                {chef.city}, {chef.departmentCode} ({chef.departmentName})
              </span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900 mt-1 truncate">
              {chef.name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-600">
              <span>
                {chef.restaurant} — <span className="text-stone-500">{chef.restaurantAddress}</span>
              </span>
              {chef.phone && (
                <a
                  href={`tel:${chef.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-800 hover:text-[#991B1B] transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                  <span>{chef.phone}</span>
                </a>
              )}
              {chef.website && (
                <a
                  href={chef.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#991B1B] hover:underline underline-offset-4"
                >
                  <span>Page de l’établissement</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleSave(chef.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isSaved
                  ? 'bg-[#991B1B] text-white border-[#991B1B]'
                  : 'bg-[#FBF9F5] text-stone-800 border-stone-300 hover:border-stone-500'
              }`}
            >
              <Bookmark
                className="w-3.5 h-3.5"
                fill={isSaved ? 'currentColor' : 'none'}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">
                {isSaved ? 'Enregistré' : 'Enregistrer'}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le dossier"
              className="w-9 h-9 rounded-md border border-stone-300 bg-white hover:bg-stone-900 hover:text-white text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 4-Tab Monograph Switcher */}
        <div className="px-6 lg:px-10 bg-[#F3EFE7] border-b border-stone-200 flex items-center gap-2 overflow-x-auto shrink-0">
          {(
            [
              { id: 'bio', label: '01. Biographie & Parcours' },
              { id: 'gallery', label: '02. Galerie Interactive du Plat' },
              { id: 'recipe', label: '03. Recette & Fiche Technique' },
              {
                id: 'glossary',
                label: `04. Glossaire des Techniques (${chefTechniques.length})`,
              },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'border-[#991B1B] text-[#991B1B]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">
          {/* TAB 1: BIOGRAPHY & CULINARY JOURNEY */}
          {activeTab === 'bio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Essay Column (70%) */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-4">
                    Notice Biographique
                  </p>
                  <div className="space-y-5 max-w-prose text-[16px] leading-[1.78] text-stone-800">
                    {chef.biography.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-[#991B1B]'
                            : ''
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Editorial Pull Quote */}
                <blockquote className="py-6 border-y border-stone-300">
                  <p className="font-serif italic text-2xl lg:text-[26px] leading-snug text-stone-900 text-balance">
                    « {chef.quote} »
                  </p>
                  <footer className="mt-3 font-mono text-xs uppercase tracking-widest text-stone-500">
                    — {chef.name}, {chef.restaurant}
                  </footer>
                </blockquote>

                {/* Parcours Gastronomique Chronologique */}
                <div>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
                        Parcours Gastronomique
                      </p>
                      <h3 className="font-serif text-2xl font-semibold text-stone-900 mt-0.5">
                        Maisons Formatrices & Étapes Clés
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {chef.culinaryJourney.map((step, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-6 border-b border-stone-200/80 last:border-b-0"
                      >
                        <div className="sm:col-span-3">
                          <p className="font-mono text-xs font-medium text-[#991B1B] tabular-nums">
                            {step.period}
                          </p>
                          <p className="text-xs text-stone-500 mt-0.5">{step.city}</p>
                        </div>
                        <div className="sm:col-span-9">
                          <h4 className="font-serif text-xl font-semibold text-stone-900">
                            {step.house}
                          </h4>
                          <p className="text-xs font-medium text-stone-600 mt-0.5">
                            {step.role}
                          </p>
                          <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Margin Sidebar Column (30%): Archival Accession Metadata */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-stone-200 rounded-lg p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-stone-500 pb-3 border-b border-stone-200">
                    Fiche Signalétique & Contact
                  </p>

                  <dl className="divide-y divide-stone-200 text-sm">
                    <div className="py-3">
                      <dt className="text-xs text-stone-500">Restaurant d’exercice</dt>
                      <dd className="font-medium text-stone-900 mt-0.5">{chef.restaurant}</dd>
                      <dd className="text-xs text-stone-500 mt-0.5">{chef.restaurantAddress}</dd>
                    </div>
                    {chef.phone && (
                      <div className="py-3">
                        <dt className="text-xs text-stone-500">Téléphone de l’établissement</dt>
                        <dd className="mt-1">
                          <a
                            href={`tel:${chef.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-stone-900 hover:text-[#991B1B] tabular-nums"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                            <span>{chef.phone}</span>
                          </a>
                        </dd>
                      </div>
                    )}
                    {chef.website && (
                      <div className="py-3">
                        <dt className="text-xs text-stone-500">Page officielle dédiée</dt>
                        <dd className="mt-1">
                          <a
                            href={chef.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#991B1B] hover:underline underline-offset-4 break-all"
                          >
                            <span>{chef.website.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        </dd>
                      </div>
                    )}
                    <div className="py-3">
                      <dt className="text-xs text-stone-500">Ville & Département / Région</dt>
                      <dd className="font-medium text-stone-900 mt-0.5 flex items-start gap-1.5">
                        <MapPin
                          className="w-3.5 h-3.5 text-[#991B1B] mt-1 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {chef.city} · {chef.departmentCode} ({chef.departmentName}),{' '}
                          {chef.country}
                        </span>
                      </dd>
                    </div>
                    <div className="py-3">
                      <dt className="text-xs text-stone-500">Année d’obtention des étoiles</dt>
                      <dd className="mt-1 space-y-1.5">
                        {chef.starHistory.map((item, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-mono font-semibold text-[#991B1B] tabular-nums">
                              {item.year}
                            </span>
                            <span className="mx-1.5 text-stone-400">·</span>
                            <span className="font-medium text-stone-900">
                              {'★'.repeat(item.stars)} — {item.restaurant}
                            </span>
                            <p className="text-stone-500 mt-0.5">{item.note}</p>
                          </div>
                        ))}
                      </dd>
                    </div>
                    <div className="py-3">
                      <dt className="text-xs text-stone-500">Type de cuisine</dt>
                      <dd className="font-medium text-stone-900 mt-0.5">{chef.cuisineType}</dd>
                    </div>
                    <div className="py-3">
                      <dt className="text-xs text-stone-500">Nationalité & Naissance</dt>
                      <dd className="font-mono text-xs text-stone-800 mt-0.5 tabular-nums">
                        {chef.nationality} · Né(e) en {chef.birthYear}
                      </dd>
                    </div>
                    {chef.greenStar && (
                      <div className="py-3">
                        <dt className="text-xs text-stone-500">Engagement durable</dt>
                        <dd className="font-medium text-emerald-800 mt-0.5 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Étoile Verte Michelin</span>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Indexed Specialties Quick Links */}
                <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-stone-600 mb-3">
                    Spécialités Indexées
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
                        className="px-2.5 py-1 text-xs font-medium bg-white border border-stone-300 rounded hover:border-[#991B1B] hover:text-[#991B1B] transition-colors cursor-pointer"
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Callout to Signature Dish */}
                <div className="bg-white border border-stone-200 rounded-lg p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
                    Plat Emblématique
                  </p>
                  <h4 className="font-serif italic text-xl font-semibold text-stone-900 mt-1.5">
                    {chef.signatureRecipe.title}
                  </h4>
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="w-full py-2 px-4 text-xs font-medium bg-stone-900 hover:bg-[#991B1B] text-white rounded-md transition-colors cursor-pointer"
                    >
                      Ouvrir la galerie interactive ({chef.signatureRecipe.gallery.length} photos)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('recipe')}
                      className="w-full py-2 px-4 text-xs font-medium bg-[#F3EFE7] hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-md transition-colors cursor-pointer"
                    >
                      Consulter la fiche technique & recette
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('glossary')}
                      className="w-full py-2 px-4 text-xs font-medium bg-white hover:bg-[#F3EFE7] text-stone-800 border border-stone-300 rounded-md transition-colors cursor-pointer"
                    >
                      Glossaire des techniques ({chefTechniques.length})
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* TAB 2: INTERACTIVE PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
                    Galerie Photographique Interactive
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900 mt-1">
                    {chef.signatureRecipe.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                    {chef.signatureRecipe.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('recipe')}
                  className="px-4 py-2 text-xs font-medium bg-stone-900 hover:bg-[#991B1B] text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Voir la fiche technique & recette
                </button>
              </div>

              <InteractivePhotoGallery
                photos={chef.signatureRecipe.gallery}
                dishTitle={chef.signatureRecipe.title}
                chefName={chef.name}
              />

              <div className="bg-white border border-stone-200 rounded-lg p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
                  Genèse du Plat Emblématique
                </p>
                <p className="mt-2 text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl">
                  {chef.signatureRecipe.story}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: DETAILED SIGNATURE RECIPE & PROFESSIONAL TECHNICAL SHEET */}
          {activeTab === 'recipe' && (
            <div className="space-y-8">
              {/* Recipe Header */}
              <div className="pb-6 border-b border-stone-200 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
                    Recette Phare & Fiche Technique · {chef.restaurant}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                    {chef.signatureRecipe.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
                    {chef.signatureRecipe.story}
                  </p>
                </div>

                {/* Interactive Servings Scaler + Print Technical Sheet */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <div className="bg-white border border-stone-200 rounded-md p-3">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2">
                      Adapter les proportions :
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[2, 4, 6, 8].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setServings(count)}
                          className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer tabular-nums ${
                            servings === count
                              ? 'bg-[#991B1B] text-white'
                              : 'bg-[#F3EFE7] text-stone-800 hover:bg-stone-200'
                          }`}
                        >
                          {count} pers.
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium bg-white hover:bg-stone-900 hover:text-white text-stone-800 border border-stone-300 rounded-md transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" aria-hidden="true" />
                    <span>Imprimer la fiche</span>
                  </button>
                </div>
              </div>

              {/* Operational Recipe Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-white border border-stone-200 rounded-lg text-sm">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-stone-500">Préparation</p>
                    <p className="font-mono font-medium text-stone-900 tabular-nums">
                      {chef.signatureRecipe.prepTimeMinutes} min
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <ChefHat className="w-4 h-4 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-stone-500">Cuisson</p>
                    <p className="font-mono font-medium text-stone-900 tabular-nums">
                      {chef.signatureRecipe.cookTimeMinutes} min
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-stone-500">Niveau</p>
                    <p className="font-medium text-stone-900">
                      {chef.signatureRecipe.difficulty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Wine className="w-4 h-4 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-stone-500">Accord Sommelier</p>
                    <p
                      className="font-medium text-stone-900 line-clamp-1"
                      title={chef.signatureRecipe.winePairing}
                    >
                      {chef.signatureRecipe.winePairing}
                    </p>
                  </div>
                </div>
              </div>

              {/* Two-Column Recipe Execution: Ingredients + Steps */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Ingredients Column */}
                <div className="lg:col-span-5 bg-white border border-stone-200 rounded-lg p-6 h-fit">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                    <h4 className="font-serif text-xl font-semibold text-stone-900">
                      Ingrédients ({servings} couverts)
                    </h4>
                    <span className="font-mono text-xs text-stone-500">Mise en place</span>
                  </div>

                  <ul className="divide-y divide-stone-100">
                    {chef.signatureRecipe.ingredients.map((ing, idx) => {
                      const done = !!checkedIngredients[idx];
                      return (
                        <li key={idx} className="py-2.5">
                          <button
                            type="button"
                            onClick={() => toggleIngredient(idx)}
                            className="w-full text-left flex items-start justify-between gap-3 cursor-pointer group"
                          >
                            <span className="flex items-start gap-2.5">
                              <span
                                className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                  done
                                    ? 'bg-[#991B1B] border-[#991B1B] text-white'
                                    : 'border-stone-300 group-hover:border-stone-500'
                                }`}
                              >
                                {done && <Check className="w-3 h-3" aria-hidden="true" />}
                              </span>
                              <span
                                className={`text-sm ${
                                  done ? 'line-through text-stone-400' : 'text-stone-800'
                                }`}
                              >
                                {ing.name}
                                {ing.prep && (
                                  <span className="text-xs text-stone-500"> ({ing.prep})</span>
                                )}
                              </span>
                            </span>
                            <span className="font-mono text-xs font-medium text-stone-900 tabular-nums whitespace-nowrap shrink-0">
                              {formatAmount(ing.amount)} {ing.unit}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Wine Pairing & Chef Tip */}
                  <div className="mt-6 pt-5 border-t border-stone-200 space-y-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
                        Accord Mets & Vins
                      </p>
                      <p className="text-sm font-medium text-stone-900 mt-1">
                        {chef.signatureRecipe.winePairing}
                      </p>
                    </div>
                    <div className="p-4 bg-[#F3EFE7] rounded-md border border-stone-200">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#991B1B]">
                        Secret du Chef
                      </p>
                      <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                        {chef.signatureRecipe.chefTip}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preparation Steps Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="pb-3 border-b border-stone-200 flex items-center justify-between">
                    <h4 className="font-serif text-xl font-semibold text-stone-900">
                      Progression Technique
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="text-xs font-medium text-[#991B1B] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Voir la galerie photo du dressage
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
                            className={`w-full text-left p-5 rounded-lg border transition-colors cursor-pointer flex items-start gap-4 ${
                              completed
                                ? 'bg-[#F3EFE7]/70 border-stone-200 text-stone-500'
                                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-800'
                            }`}
                          >
                            <span
                              className={`font-mono text-xs font-semibold px-2 py-1 rounded tabular-nums shrink-0 ${
                                completed
                                  ? 'bg-stone-300 text-stone-700'
                                  : 'bg-stone-900 text-[#FBF9F5]'
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            <span
                              className={`text-sm sm:text-[15px] leading-relaxed ${
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
              <div className="bg-white border border-stone-300 rounded-lg p-6 lg:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#991B1B]">
                      Fiche Technique Professionnelle
                    </p>
                    <h4 className="font-serif text-2xl font-semibold text-stone-900 mt-0.5">
                      Paramètres d’Exécution en Cuisine
                    </h4>
                  </div>
                  <div className="text-xs font-mono text-stone-600 space-y-0.5 sm:text-right">
                    <p>Rendement : {sheet.yieldLabel}</p>
                    <p>Température de service : {sheet.serviceTemp}</p>
                  </div>
                </div>

                {/* Equipment & Critical Temperatures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-[#FBF9F5] border border-stone-200 rounded-md">
                    <p className="font-mono text-xs uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                      <span>Matériel & Ustensiles Requis</span>
                    </p>
                    <ul className="space-y-1.5 text-sm text-stone-800">
                      {sheet.equipment.map((eq, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#991B1B]" aria-hidden="true">·</span>
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-[#FBF9F5] border border-stone-200 rounded-md">
                    <p className="font-mono text-xs uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                      <span>Repères Thermiques Critiques</span>
                    </p>
                    <dl className="divide-y divide-stone-200 text-sm">
                      {sheet.criticalTemperatures.map((item, i) => (
                        <div key={i} className="py-2 flex items-center justify-between gap-4">
                          <dt className="text-stone-600">{item.label}</dt>
                          <dd className="font-mono text-xs font-semibold text-[#991B1B] tabular-nums text-right">
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
                    <p className="font-mono text-xs uppercase tracking-wider text-stone-600 mb-3">
                      Phases d’Allotissement & Progression
                    </p>
                    <div className="border border-stone-200 rounded-md divide-y divide-stone-200">
                      {sheet.phases.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline"
                        >
                          <div className="sm:col-span-4">
                            <p className="font-medium text-sm text-stone-900">{p.phase}</p>
                            <p className="font-mono text-xs text-[#991B1B] mt-0.5 tabular-nums">
                              {p.duration}
                            </p>
                          </div>
                          <div className="sm:col-span-8 text-sm text-stone-700 leading-relaxed">
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
                    <div className="lg:col-span-8 p-5 bg-[#F3EFE7]/75 border border-stone-200 rounded-md">
                      <p className="font-mono text-xs uppercase tracking-wider text-stone-600 mb-2.5 flex items-center gap-2">
                        <ClipboardCheck className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                        <span>Points de Contrôle Qualité au Passe</span>
                      </p>
                      <ul className="space-y-1.5 text-sm text-stone-800">
                        {sheet.qualityCheckpoints.map((cp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono text-xs text-[#991B1B] mt-0.5">✓</span>
                            <span>{cp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="lg:col-span-4 p-5 bg-stone-900 text-[#FBF9F5] rounded-md flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-stone-400">
                        Techniques mobilisées
                      </p>
                      <p className="font-serif text-lg mt-1">
                        {chefTechniques.length} gestes clés expliqués
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('glossary')}
                      className="mt-4 w-full py-2 px-3 text-xs font-medium bg-[#991B1B] hover:bg-white hover:text-stone-900 text-white rounded transition-colors cursor-pointer"
                    >
                      Ouvrir le glossaire du chef
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHEF-SPECIFIC TECHNIQUES GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#991B1B]">
                    <BookOpenCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Glossaire Technique du Chef · {chef.name}</span>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900 mt-1">
                    Gestes & Procédés Culinaires Utilisés
                  </h3>
                  <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                    Définitions précises et mode opératoire pour réussir les techniques employées
                    dans « {chef.signatureRecipe.title} ».
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('recipe')}
                  className="px-4 py-2 text-xs font-medium bg-stone-900 hover:bg-[#991B1B] text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Retour à la Fiche Technique
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chefTechniques.map((tech) => (
                  <article
                    key={tech.id}
                    className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#991B1B]">
                          {tech.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-600 tabular-nums">
                          <Thermometer className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
                          {tech.temperatureOrTiming}
                        </span>
                      </div>

                      <h4 className="mt-3 font-serif text-2xl font-semibold text-stone-900">
                        {tech.term}
                      </h4>
                      <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                        {tech.summary}
                      </p>

                      <div className="mt-4 p-4 bg-[#F3EFE7] border border-stone-200 rounded-md">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-stone-600">
                          Comment réaliser ce geste
                        </p>
                        <p className="mt-1.5 text-xs sm:text-sm text-stone-800 leading-relaxed">
                          {tech.howToPerform}
                        </p>
                      </div>
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
