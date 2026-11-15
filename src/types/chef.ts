export type StarCount = 1 | 2 | 3;

export type ContinentZone = 'France' | 'Europe' | 'Asie' | 'Amériques';

export type CuisineCategory =
  | 'Haute Gastronomie Française'
  | 'Cuisine Végétale & Botanique'
  | 'Cuisine Marine & Littorale'
  | 'Avant-Garde & Fermentation'
  | 'Cuisine Alpine & Terroir'
  | 'Gastronomie Japonaise Kaiseki'
  | 'Cuisine Italienne Contemporaine'
  | 'Pâtisserie & Arts Sucrés';

export type TechniqueCategory =
  | 'Cuissons'
  | 'Sauces & Émulsions'
  | 'Fermentation & Maturation'
  | 'Pâtisserie & Textures'
  | 'Découpe & Dressage';

export interface TechniqueEntry {
  id: string;
  term: string;
  category: TechniqueCategory;
  summary: string;
  temperatureOrTiming: string;
  howToPerform: string;
}

export interface TechnicalSheet {
  yieldLabel: string;
  serviceTemp: string;
  equipment: string[];
  criticalTemperatures: { label: string; value: string }[];
  phases: { phase: string; duration: string; details: string }[];
  qualityCheckpoints: string[];
}

export interface StarTimelineItem {
  stars: StarCount;
  year: number;
  restaurant: string;
  note: string;
}

export interface CareerMilestone {
  period: string;
  house: string;
  city: string;
  role: string;
  description: string;
}

export interface RecipeIngredient {
  name: string;
  amount: number | null;
  unit: string;
  prep?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  angle: string;
  focalNote: string;
}

export interface SignatureRecipe {
  title: string;
  subtitle: string;
  story: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: 'Maîtrise' | 'Technique' | 'Exigeante';
  baseServings: number;
  winePairing: string;
  chefTip: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  gallery: GalleryPhoto[];
  techniquesUsed: string[];
  technicalSheet: TechnicalSheet;
}

export interface Chef {
  id: string;
  name: string;
  nationality: string;
  birthYear: number;
  restaurant: string;
  restaurantAddress: string;
  phone: string;
  website: string;
  stars: StarCount;
  greenStar?: boolean;
  starYear: number;
  firstStarYear: number;
  starHistory: StarTimelineItem[];
  city: string;
  departmentCode: string;
  departmentName: string;
  region?: string;
  country: string;
  zone: ContinentZone;
  cuisineType: CuisineCategory;
  specialties: string[];
  quote: string;
  biography: string[];
  culinaryJourney: CareerMilestone[];
  signatureRecipe: SignatureRecipe;
}
