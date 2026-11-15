import { Chef } from '../types/chef';

export interface RegionDefinition {
  name: string;
  zone: 'France' | 'Monde';
  subtitle: string;
  departments?: { code: string; name: string }[];
}

export const FRANCE_REGION_DEFINITIONS: RegionDefinition[] = [
  {
    name: 'Bretagne',
    zone: 'France',
    subtitle: 'Côtes-d’Armor, Finistère, Ille-et-Vilaine & Morbihan',
    departments: [
      { code: '22', name: 'Côtes-d’Armor' },
      { code: '29', name: 'Finistère' },
      { code: '35', name: 'Ille-et-Vilaine' },
      { code: '56', name: 'Morbihan' },
    ],
  },
  {
    name: 'Île-de-France',
    zone: 'France',
    subtitle: 'Paris & Grand Paris',
    departments: [{ code: '75', name: 'Paris' }],
  },
  {
    name: 'Auvergne-Rhône-Alpes',
    zone: 'France',
    subtitle: 'Lyon, Savoie, Haute-Savoie, Drôme, Ain, Loire & Haute-Loire',
    departments: [
      { code: '01', name: 'Ain' },
      { code: '26', name: 'Drôme' },
      { code: '42', name: 'Loire' },
      { code: '43', name: 'Haute-Loire' },
      { code: '69', name: 'Rhône' },
      { code: '73', name: 'Savoie' },
      { code: '74', name: 'Haute-Savoie' },
    ],
  },
  {
    name: 'Provence-Alpes-Côte d’Azur & Monaco',
    zone: 'France',
    subtitle: 'Bouches-du-Rhône, Var, Alpes-Maritimes & Principauté de Monaco',
    departments: [
      { code: '06', name: 'Alpes-Maritimes' },
      { code: '13', name: 'Bouches-du-Rhône' },
      { code: '83', name: 'Var' },
      { code: 'MC', name: 'Principauté de Monaco' },
    ],
  },
  {
    name: 'Pays de la Loire',
    zone: 'France',
    subtitle: 'Loire-Atlantique & Vendée',
    departments: [
      { code: '44', name: 'Loire-Atlantique' },
      { code: '85', name: 'Vendée' },
    ],
  },
  {
    name: 'Nouvelle-Aquitaine',
    zone: 'France',
    subtitle: 'Gironde, Charente-Maritime, Landes & Pyrénées-Atlantiques',
    departments: [
      { code: '17', name: 'Charente-Maritime' },
      { code: '33', name: 'Gironde' },
      { code: '40', name: 'Landes' },
      { code: '64', name: 'Pyrénées-Atlantiques' },
    ],
  },
  {
    name: 'Occitanie',
    zone: 'France',
    subtitle: 'Aude, Aveyron & Haute-Garonne',
    departments: [
      { code: '11', name: 'Aude' },
      { code: '12', name: 'Aveyron' },
      { code: '31', name: 'Haute-Garonne' },
    ],
  },
  {
    name: 'Grand Est',
    zone: 'France',
    subtitle: 'Alsace & Champagne',
    departments: [
      { code: '51', name: 'Marne' },
      { code: '68', name: 'Haut-Rhin' },
    ],
  },
  {
    name: 'Bourgogne-Franche-Comté',
    zone: 'France',
    subtitle: 'Côte-d’Or & Saône-et-Loire',
    departments: [
      { code: '21', name: 'Côte-d’Or' },
      { code: '71', name: 'Saône-et-Loire' },
    ],
  },
  {
    name: 'Normandie',
    zone: 'France',
    subtitle: 'Calvados & Seine-Maritime',
    departments: [
      { code: '14', name: 'Calvados' },
      { code: '76', name: 'Seine-Maritime' },
    ],
  },
  {
    name: 'Centre-Val de Loire',
    zone: 'France',
    subtitle: 'Loir-et-Cher & Val de Loire',
    departments: [{ code: '41', name: 'Loir-et-Cher' }],
  },
  {
    name: 'Hauts-de-France',
    zone: 'France',
    subtitle: 'Flandres & Nord',
    departments: [{ code: '59', name: 'Nord' }],
  },
  {
    name: 'Corse',
    zone: 'France',
    subtitle: 'Corse-du-Sud',
    departments: [{ code: '2A', name: 'Corse-du-Sud' }],
  },
];

export const WORLD_REGION_DEFINITIONS: RegionDefinition[] = [
  { name: 'Espagne & Péninsule Ibérique', zone: 'Monde', subtitle: 'Catalogne, Pays Basque & Madrid' },
  { name: 'Italie', zone: 'Monde', subtitle: 'Lombardie, Émilie-Romagne, Vénétie & Abruzzes' },
  { name: 'Europe du Nord (Scandinavie)', zone: 'Monde', subtitle: 'Danemark, Suède & Norvège' },
  { name: 'Royaume-Uni', zone: 'Monde', subtitle: 'Londres & Cumbrie' },
  { name: 'Europe Centrale & Alpine', zone: 'Monde', subtitle: 'Suisse, Allemagne & Autriche' },
  { name: 'Benelux', zone: 'Monde', subtitle: 'Belgique & Pays-Bas' },
  { name: 'Asie de l’Est', zone: 'Monde', subtitle: 'Japon, Corée du Sud & Hong Kong' },
  { name: 'Asie du Sud-Est', zone: 'Monde', subtitle: 'Singapour & Thaïlande' },
  { name: 'Amérique du Nord', zone: 'Monde', subtitle: 'États-Unis, Canada & Mexique' },
  { name: 'Amérique du Sud', zone: 'Monde', subtitle: 'Pérou & Brésil' },
];

const FRENCH_DEPT_TO_REGION: Record<string, string> = {
  '22': 'Bretagne',
  '29': 'Bretagne',
  '35': 'Bretagne',
  '56': 'Bretagne',
  '75': 'Île-de-France',
  '77': 'Île-de-France',
  '78': 'Île-de-France',
  '91': 'Île-de-France',
  '92': 'Île-de-France',
  '93': 'Île-de-France',
  '94': 'Île-de-France',
  '95': 'Île-de-France',
  '01': 'Auvergne-Rhône-Alpes',
  '26': 'Auvergne-Rhône-Alpes',
  '42': 'Auvergne-Rhône-Alpes',
  '43': 'Auvergne-Rhône-Alpes',
  '69': 'Auvergne-Rhône-Alpes',
  '73': 'Auvergne-Rhône-Alpes',
  '74': 'Auvergne-Rhône-Alpes',
  '06': 'Provence-Alpes-Côte d’Azur & Monaco',
  '13': 'Provence-Alpes-Côte d’Azur & Monaco',
  '83': 'Provence-Alpes-Côte d’Azur & Monaco',
  MC: 'Provence-Alpes-Côte d’Azur & Monaco',
  '44': 'Pays de la Loire',
  '85': 'Pays de la Loire',
  '17': 'Nouvelle-Aquitaine',
  '33': 'Nouvelle-Aquitaine',
  '40': 'Nouvelle-Aquitaine',
  '64': 'Nouvelle-Aquitaine',
  '11': 'Occitanie',
  '12': 'Occitanie',
  '31': 'Occitanie',
  '51': 'Grand Est',
  '68': 'Grand Est',
  '21': 'Bourgogne-Franche-Comté',
  '71': 'Bourgogne-Franche-Comté',
  '14': 'Normandie',
  '76': 'Normandie',
  '41': 'Centre-Val de Loire',
  '59': 'Hauts-de-France',
  '2A': 'Corse',
  '2B': 'Corse',
};

export function resolveChefRegion(chef: Pick<Chef, 'departmentCode' | 'country' | 'zone' | 'region'>): string {
  if (chef.region) return chef.region;
  if (chef.zone === 'France') {
    return FRENCH_DEPT_TO_REGION[chef.departmentCode] ?? 'Autres Régions de France';
  }
  switch (chef.country) {
    case 'Espagne':
      return 'Espagne & Péninsule Ibérique';
    case 'Italie':
      return 'Italie';
    case 'Danemark':
    case 'Suède':
    case 'Norvège':
      return 'Europe du Nord (Scandinavie)';
    case 'Royaume-Uni':
      return 'Royaume-Uni';
    case 'Suisse':
    case 'Allemagne':
    case 'Autriche':
      return 'Europe Centrale & Alpine';
    case 'Belgique':
    case 'Pays-Bas':
      return 'Benelux';
    case 'Japon':
    case 'Corée du Sud':
    case 'Hong Kong':
      return 'Asie de l’Est';
    case 'Singapour':
    case 'Thaïlande':
      return 'Asie du Sud-Est';
    case 'États-Unis':
    case 'Canada':
    case 'Mexique':
      return 'Amérique du Nord';
    case 'Pérou':
    case 'Brésil':
      return 'Amérique du Sud';
    default:
      return chef.country;
  }
}
