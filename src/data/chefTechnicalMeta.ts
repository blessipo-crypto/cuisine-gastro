import { TechnicalSheet } from '../types/chef';

export interface ChefTechnicalMeta {
  techniquesUsed: string[];
  technicalSheet: TechnicalSheet;
}

export const CHEF_TECHNICAL_META: Record<string, ChefTechnicalMeta> = {
  'anne-sophie-pic': {
    techniquesUsed: ['impregnation-aromatique', 'laminage-pate-fine', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '12 berlingots (4 assiettes de 3 pièces)',
      serviceTemp: '62 °C (bouillon versé à table à 70 °C)',
      equipment: ['Laminoir à pâtes', 'Pinceau fin', 'Chinois étamine', 'Poche à douille 8 mm', 'Mixeur plongeant'],
      criticalTemperatures: [
        { label: 'Infusion mélisse / tonka', value: '60 °C (20 min hors du feu)' },
        { label: 'Pochage des berlingots', value: '92 °C frémissants · 2 min 15 s' },
        { label: 'Repos de la détrempe', value: '+4 °C pendant 2 heures' },
      ],
      phases: [
        { phase: '01. Pâte & Farce Banon', duration: '35 min + 2 h repos', details: 'Pétrissage aux jaunes d’œufs, émulsion de chèvre affiné à la tonka et mise en poche froide.' },
        { phase: '02. Laminage & Façonnage', duration: '25 min', details: 'Abaisse à 0,5 mm, découpe carrés 7×7 cm et pliage pyramidal scellé à l’eau.' },
        { phase: '03. Bouillon de Cresson & Service', duration: '15 min', details: 'Blanchiment éclair 20 s du cresson, glaçage immédiat, mixage au beurre monté et pochage minute.' },
      ],
      qualityCheckpoints: [
        'Absence de bulles d’air dans le berlingot avant soudure pour éviter l’éclatement au pochage.',
        'Couleur vert émeraude préservée par refroidissement sur glace pilée immédiat.',
      ],
    },
  },
  'alain-passard': {
    techniquesUsed: ['mandoline-concentrique', 'beurre-noisette-clarifie'],
    technicalSheet: {
      yieldLabel: '1 tarte de Ø 24 cm (4 à 6 parts)',
      serviceTemp: '55 °C (tiède à la sortie du four)',
      equipment: ['Mandoline japonaise', 'Cercle à tarte perforé Ø 24 cm', 'Pinceau soie', 'Pierre de cuisson ou plaque épaisse'],
      criticalTemperatures: [
        { label: 'Beurre noisette clarifié', value: '148 °C avant filtration' },
        { label: 'Cuisson au four ventilé', value: '185 °C pendant 30 à 35 min' },
      ],
      phases: [
        { phase: '01. Taillage & Assouplissement', duration: '30 min', details: 'Tranchage à 1 mm des betteraves, carottes et pommes, blanchiment bref à l’eau miellée.' },
        { phase: '02. Montage en Rosace', duration: '30 min', details: 'Fonçage du feuilletage inversé et imbrication serrée en pétales concentriques.' },
        { phase: '03. Cuisson & Lustrage', duration: '35 min', details: 'Cuisson sur sole chaude avec badigeonnage de beurre noisette à mi-parcours et points d’huile de livèche.' },
      ],
      qualityCheckpoints: [
        'Feuilletage croustillant dessous sans détrempage grâce à l’épongement minutieux des lames.',
        'Bords des pétales légèrement confits et dorés sans brûlure.',
      ],
    },
  },
  'arnaud-donckele': {
    techniquesUsed: ['extraction-sauce-absolue', 'cuisson-unilaterale-nacree', 'beurre-noisette-clarifie'],
    technicalSheet: {
      yieldLabel: '4 assiettes (8 noix de Saint-Jacques)',
      serviceTemp: '58 °C (assiette creuse préchauffée)',
      equipment: ['Sautoir cuivre étamé', 'Chinois étamine', 'Mixeur plongeant', 'Sonde thermique', 'Tapis silicone'],
      criticalTemperatures: [
        { label: 'Réduction Champagne / safran', value: '88 °C (frémissement doux)' },
        { label: 'Cœur de la Saint-Jacques', value: '48 °C maximum (chair nacrée)' },
      ],
      phases: [
        { phase: '01. Sauce Absolue aux Barbes', duration: '40 min', details: 'Suage sans coloration, double réduction au Champagne, infusion safran 15 min et passage étamine.' },
        { phase: '02. Tuile Dentelle de Corail', duration: '15 min', details: 'Appareil eau-huile-farine-corail cuit à la poêle antiadhésive jusqu’à évaporation totale.' },
        { phase: '03. Saisie Minute & Émulsion', duration: '5 min', details: 'Snackage 45 s par face au beurre clarifié, émulsion aérienne de la sauce et pose caviar.' },
      ],
      qualityCheckpoints: [
        'Noix parfaitement séchées avant saisie pour obtenir une croûte maillard dorée nette.',
        'Sauce mousseuse stable sans déphasage ni goût d’alcool cru.',
      ],
    },
  },
  'alexandre-mazzia': {
    techniquesUsed: ['fumaison-a-froid', 'extraction-sauce-absolue', 'cuisson-unilaterale-nacree'],
    technicalSheet: {
      yieldLabel: '4 portions (8 langoustines royales)',
      serviceTemp: '44 °C (tiède, texture soyeuse)',
      equipment: ['Cloche de fumaison', 'Fumoir à froid / copeaux de cèdre', 'Cuit-vapeur doux', 'Chinois fin'],
      criticalTemperatures: [
        { label: 'Fumaison au cèdre', value: '< 26 °C · 2 minutes sous cloche' },
        { label: 'Extraction huile de pin', value: '50 °C (évite l’oxydation chlorophylle)' },
        { label: 'Remise en température vapeur', value: '58 °C · 45 secondes' },
      ],
      phases: [
        { phase: '01. Dashi Torréfié & Huile Verte', duration: '30 min', details: 'Infusion des têtes grillées au grué de cacao et pimentón ; mixage des aiguilles de pin à 50 °C.' },
        { phase: '02. Décorticage & Fumaison', duration: '15 min', details: 'Mise à cru des queues et passage sous cloche de cèdre.' },
        { phase: '03. Vapeur Éclair & Dressage', duration: '5 min', details: 'Tiédissement 45 s, pose sur grès noir avec argousier et versement du bouillon.' },
      ],
      qualityCheckpoints: [
        'Fumée légère et boisée sans âcreté ni dépôt de suie sur le crustacé.',
        'Chair translucide conservant son croquant naturel.',
      ],
    },
  },
  'mauro-colagreco': {
    techniquesUsed: ['croute-de-sel', 'mandoline-concentrique'],
    technicalSheet: {
      yieldLabel: '4 portions (4 betteraves moyennes)',
      serviceTemp: '22 °C (température de cave ambiante ou tiède)',
      equipment: ['Plaque de four perforée', 'Mandoline', 'Emporte-pièce Ø 6 cm', 'Zesteur Microplane'],
      criticalTemperatures: [
        { label: 'Cuisson en croûte de sel', value: '180 °C pendant 90 min' },
        { label: 'Repos sous croûte', value: '15 min avant ouverture' },
      ],
      phases: [
        { phase: '01. Mortier de Sel & Cuisson', duration: '15 min + 1 h 30', details: 'Enrobage hermétique des betteraves non pelées dans sel de Camargue et blancs d’œufs.' },
        { phase: '02. Taillage & Crème Citron', duration: '20 min', details: 'Épluchage à chaud, tranchage en disques réguliers et montage de la crème d’Isigny au citron de Menton.' },
        { phase: '03. Dressage & Caviar', duration: '10 min', details: 'Imbrication des disques, quenelle de caviar Kristal et filet d’huile Taggiasca.' },
      ],
      qualityCheckpoints: [
        'Croûte intacte sans fissure durant la cuisson pour concentrer les sucres.',
        'Assaisonnement équilibré : ne pas ajouter de sel supplémentaire sur la betterave.',
      ],
    },
  },
  'regis-jacques-marcon': {
    techniquesUsed: ['demi-deuil', 'arrosage-beurre-mousseux', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 à 6 couverts (1 volaille de 1,6 kg)',
      serviceTemp: '65 °C à table',
      equipment: ['Cocotte en fonte épaisse', 'Ficelle de boucher', 'Sonde à cœur', 'Pinceau', 'Chinois étamine'],
      criticalTemperatures: [
        { label: 'Cuisson en cocotte', value: '175 °C pendant 35 min avec arrosage' },
        { label: 'Température à cœur du suprême', value: '66 °C après repos de 15 min' },
      ],
      phases: [
        { phase: '01. Contisage & Bridage', duration: '25 min', details: 'Insertion des lames de truffe noire sous peau et mise en forme de la volaille.' },
        { phase: '02. Rôtissage au Beurre Mousseux', duration: '35 min + 15 min repos', details: 'Coloration douce, enfournement et arrosage régulier avec thym et sarriette.' },
        { phase: '03. Glacis aux Morilles & Cèpes', duration: '20 min', details: 'Sauté des morilles nettoyées et réduction du jus brun parfumé à la poudre de cèpes.' },
      ],
      qualityCheckpoints: [
        'Morilles parfaitement dessablées après trempage dans le lait tiède et double rinçage.',
        'Peau dorée et croustillante, jus brillant et nappant.',
      ],
    },
  },
  'emmanuel-renaut': {
    techniquesUsed: ['cuisson-unilaterale-nacree', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 assiettes (4 pavés de 150 g)',
      serviceTemp: '54 °C',
      equipment: ['Poêle inox à fond épais', 'Casserole cuivre', 'Chinois fin', 'Mixeur plongeant'],
      criticalTemperatures: [
        { label: 'Cuisson unilatérale de l’omble', value: '48 °C – 50 °C à cœur (côté peau 4 min)' },
        { label: 'Infusion des pousses de sapin', value: '75 °C hors du feu (15 min)' },
      ],
      phases: [
        { phase: '01. Sauce au Sapin', duration: '25 min', details: 'Réduction du vin de Savoie, infusion des jeunes bourgeons, crémage et montage au beurre froid.' },
        { phase: '02. Préparation des Filets', duration: '15 min', details: 'Désarrêtage minutieux à la pince et incisions légères de la peau.' },
        { phase: '03. Cuisson Unilatérale & Dressage', duration: '10 min', details: 'Saisie douce côté peau jusqu’à chair nacrée, ajout de l’oxalis au dernier instant.' },
      ],
      qualityCheckpoints: [
        'Peau craquante sans rétractation et chair rose nacrée jamais sèche.',
        'Dosage subtil du sapin (notes résineuses fraîches sans amertume).',
      ],
    },
  },
  'christophe-bacquie': {
    techniquesUsed: ['extraction-sauce-absolue', 'cuisson-unilaterale-nacree'],
    technicalSheet: {
      yieldLabel: '4 assiettes',
      serviceTemp: '60 °C',
      equipment: ['Cuit-vapeur', 'Sonde thermique', 'Fouet', 'Siphon ou mixeur plongeant'],
      criticalTemperatures: [
        { label: 'Blanchiment ail au lait', value: '3 départs à froid jusqu’à ébullition' },
        { label: 'Vapeur douce cabillaud', value: '58 °C pendant 8 min (52 °C à cœur)' },
      ],
      phases: [
        { phase: '01. Aïoli Moderne Léger', duration: '25 min', details: 'Triple blanchiment de l’ail au lait, purée fine montée à l’huile d’olive fruité vert.' },
        { phase: '02. Barigoule de Légumes & Fumet', duration: '25 min', details: 'Cuisson croquante des artichauts violets et fenouils, infusion safran du fumet.' },
        { phase: '03. Vapeur Douce & Service', duration: '10 min', details: 'Cuisson nacrée du dos de cabillaud, montage en assiette creuse chaude.' },
      ],
      qualityCheckpoints: [
        'Feuilletage nacré du cabillaud se détachant en pétales sous la fourchette.',
        'Aïoli aérien sans lourdeur ni piquant excessif.',
      ],
    },
  },
  'paul-pairet-marc-haeberlin': {
    techniquesUsed: ['mousseline-soufflee', 'sabayon-monte'],
    technicalSheet: {
      yieldLabel: '4 assiettes (4 pavés de 140 g)',
      serviceTemp: '68 °C',
      equipment: ['Cutter ou robot lame sur bol glacé', 'Bain-marie', 'Fouet ballon', 'Plat à gratin beurré', 'Salamandre ou gril'],
      criticalTemperatures: [
        { label: 'Température de mixage mousseline', value: '+2 °C impératifs' },
        { label: 'Cuisson au four', value: '210 °C pendant 12 à 14 min' },
        { label: 'Montage du sabayon', value: '68 °C – 72 °C au bain-marie' },
      ],
      phases: [
        { phase: '01. Mousseline de Brochet', duration: '30 min', details: 'Mixage à froid du brochet avec blanc d’œuf puis incorporation lente de crème fleurette glacée.' },
        { phase: '02. Fondue de Poireaux & Pochage Four', duration: '25 min', details: 'Étuve douce des poireaux, masquage en dôme des pavés de saumon et cuisson au Riesling.' },
        { phase: '03. Sabayon & Glaçage', duration: '10 min', details: 'Montage du sabayon au jus réduit et passage éclair 30 s sous salamandre.' },
      ],
      qualityCheckpoints: [
        'Mousseline aérienne et lisse sans grumeau ni séparation de la crème.',
        'Sabayon mousseux doré en surface sans œufs brouillés.',
      ],
    },
  },
  'christophe-hay-andree-rosier': {
    techniquesUsed: ['cuisson-unilaterale-nacree', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 assiettes',
      serviceTemp: '58 °C',
      equipment: ['Poêle épaisse', 'Casserole couverte pour coques', 'Chinois', 'Mixeur plongeant'],
      criticalTemperatures: [
        { label: 'Saisie des chipirons', value: '210 °C · 45 secondes max' },
        { label: 'Cœur du merlu de ligne', value: '50 °C (5 min côté peau + 2 min couvert)' },
      ],
      phases: [
        { phase: '01. Jus de Coques & Crème d’Ail', duration: '25 min', details: 'Ouverture à sec des coques, filtration du jus iodé et réduction crémée au piment d’Espelette.' },
        { phase: '02. Saisie des Chipirons', duration: '10 min', details: 'Cuisson éclair des chipirons très secs à l’huile d’olive brûlante.' },
        { phase: '03. Cuisson Unilatérale Merlu', duration: '10 min', details: 'Saisie côté peau et finition couverte hors du feu.' },
      ],
      qualityCheckpoints: [
        'Chipirons tendres (cuits moins d’une minute pour éviter le caoutchouc).',
        'Lames nacrées du merlu intactes au dressage.',
      ],
    },
  },
  'sebastien-bras': {
    techniquesUsed: ['noyau-glace-coulant'],
    technicalSheet: {
      yieldLabel: '4 biscuits individuels (cercles Ø 7 cm × H 4,5 cm)',
      serviceTemp: '55 °C à cœur / Croustillant chaud extérieur',
      equipment: ['4 cercles inox Ø 7 cm', 'Moules demi-sphères Ø 3 cm', 'Batteur', 'Spatule maryse'],
      criticalTemperatures: [
        { label: 'Congélation du noyau ganache', value: '-18 °C pendant 4 heures minimum' },
        { label: 'Cuisson four préchauffé', value: '200 °C pendant 12 à 14 min' },
      ],
      phases: [
        { phase: '01. Noyaux de Ganache Pralinée', duration: '20 min + 4 h froid', details: 'Émulsion crème-chocolat-praliné coulée en demi-sphères et congelée à cœur.' },
        { phase: '02. Appareil à Biscuit', duration: '20 min', details: 'Fonte chocolat-beurre, blanchiment œufs-sucre et pliage délicat de la farine.' },
        { phase: '03. Montage & Cuisson Minute', duration: '15 min', details: 'Chemisage des cercles, insertion du noyau glacé au centre et cuisson immédiate à 200 °C.' },
      ],
      qualityCheckpoints: [
        'Noyau parfaitement centré dans le cercle pour ne pas percer les parois.',
        'Démoulage délicat dès sortie du four sur assiette tiède.',
      ],
    },
  },
  'christian-le-squer': {
    techniquesUsed: ['chemise-architecture-pates', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 timbales individuelles (cercles Ø 6 cm)',
      serviceTemp: '62 °C',
      equipment: ['4 cercles hauts Ø 6 cm', 'Linge humide propre', 'Mandoline à truffe', 'Sautoir'],
      criticalTemperatures: [
        { label: 'Cuisson des spaghettis', value: '100 °C · 6 min (fermes pour tenue)' },
        { label: 'Remise en température vapeur', value: '85 °C pendant 6 min sous cloche' },
      ],
      phases: [
        { phase: '01. Alignement & Chemisage', duration: '35 min', details: 'Cuisson al dente, alignement parallèle des brins sur linge humide et montage en cercles beurrés.' },
        { phase: '02. Farce Jambon-Comté-Truffe', duration: '20 min', details: 'Brunoise serrée de jambon de Paris liée à la crème réduite de Comté 24 mois et truffe hachée.' },
        { phase: '03. Réchauffage & Démoulage', duration: '15 min', details: 'Garnissage des timbales, passage au four doux vapeur et nappage d’émulsion truffée.' },
      ],
      qualityCheckpoints: [
        'Stries verticales parfaitement jointives sans espace visible au démoulage.',
        'Émulsion de Comté lisse sans séparation de gras.',
      ],
    },
  },
  'christophe-et-christian-tedeschi-et-bordeaux-pascal': {
    techniquesUsed: ['desseralite-naturelle', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 compositions multi-assiettes (12 assiettes satellites)',
      serviceTemp: 'Contrastes : 45 °C (anglaise) / 18 °C (tartelette)',
      equipment: ['Cercles à tartelette Ø 6 cm', 'Tapis silicone', 'Thermomètre à sucre', 'Pinceau'],
      criticalTemperatures: [
        { label: 'Cuisson pâte sucrée cacao', value: '170 °C pendant 15 min à blanc' },
        { label: 'Caramel sec pour spirale', value: '168 °C (ambre clair)' },
        { label: 'Cuisson crème anglaise', value: '83 °C à la nappe' },
      ],
      phases: [
        { phase: '01. Tartelettes & Ganache Miroir', duration: '35 min', details: 'Cuisson des fonds cacao, coulage d’une ganache lissée au beurre demi-sel.' },
        { phase: '02. Spirales de Caramel & Anglaise', duration: '25 min', details: 'Filage du caramel sur silicone et cuisson de l’anglaise pralinée à 83 °C.' },
        { phase: '03. Dressage Multi-Assiettes', duration: '10 min', details: 'Orchestration des trois assiettes satellitaires autour du chocolat, du caramel et du praliné.' },
      ],
      qualityCheckpoints: [
        'Ganache brillante sans bulle d’air en surface.',
        'Tuiles caramel conservées en boîte hermétique avec déshydratant jusqu’au service.',
      ],
    },
  },
  'nicolas-magaud-lyon-mathieu-viannay': {
    techniquesUsed: ['demi-deuil', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 à 6 personnes (1 poularde de 1,8 kg)',
      serviceTemp: '66 °C',
      equipment: ['Grand faitout ou marmite ovale', 'Vessie de porc ou poche cuisson haute température', 'Sonde à cœur', 'Écumoire'],
      criticalTemperatures: [
        { label: 'Pochage doux du bouillon', value: '82 °C – 85 °C (jamais bouillir) · 1 h 15' },
        { label: 'Cœur des suprêmes', value: '68 °C' },
      ],
      phases: [
        { phase: '01. Contisage & Mise en Vessie', duration: '35 min', details: 'Insertion de généreuses rondelles de truffe sous peau et fermeture hermétique avec un trait de madère.' },
        { phase: '02. Pochage à Frémissement', duration: '75 min', details: 'Immersion totale à 85 °C en maintenant le bouillon tout juste frémissant.' },
        { phase: '03. Légumes du Pot & Sauce Suprême', duration: '25 min', details: 'Glacis des racines et morilles, réduction du bouillon crémé de Bresse.' },
      ],
      qualityCheckpoints: [
        'Peau nacrée intacte laissant apparaître nettement les médaillons noirs par transparence.',
        'Aucun bouillonnement fort pendant le pochage pour garder la chair soyeuse.',
      ],
    },
  },
  'massimo-bottura': {
    techniquesUsed: ['espuma-siphon', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 assiettes (5 textures par assiette)',
      serviceTemp: 'Jeu de températures : 60 °C (soufflé) / 50 °C (espuma) / 20 °C (tuile)',
      equipment: ['Siphon 0,5 L + 2 cartouches N₂O', 'Bain-marie', 'Tapis silicone', 'Râpe Microplane', 'Chinois étamine'],
      criticalTemperatures: [
        { label: 'Infusion crème Parmesan 24 mois', value: '65 °C max (évite séparation caséine)' },
        { label: 'Tuiles Parmesan 40 mois', value: '170 °C · 6 min au four' },
        { label: 'Maintien siphon espuma', value: '62 °C au bain-marie' },
      ],
      phases: [
        { phase: '01. Sauce 24 mois & Espuma 30 mois', duration: '30 min', details: 'Infusions séparées à 65 °C, filtration étamine et mise en siphon N₂O.' },
        { phase: '02. Demi-Soufflé & Tuiles 40 mois', duration: '25 min', details: 'Cuisson vapeur du demi-soufflé et tuiles dentelles au four.' },
        { phase: '03. Dressage des 5 Textures', duration: '10 min', details: 'Mise en scène géométrique des 5 âges avec gouttes de vinaigre balsamique DOP.' },
      ],
      qualityCheckpoints: [
        'Ne jamais porter les bases de parmesan à ébullition pour éviter l’aspect granuleux.',
        'Service immédiat dès l’extrusion de l’espuma.',
      ],
    },
  },
  'rene-redzepi': {
    techniquesUsed: ['lacto-fermentation', 'cuisson-unilaterale-nacree'],
    technicalSheet: {
      yieldLabel: '4 assiettes',
      serviceTemp: '10 °C – 14 °C (frais de cave)',
      equipment: ['Bocal hermétique ou sacs sous vide', 'Mixeur haute vitesse', 'Pince de précision', 'Lit de glace pilée'],
      criticalTemperatures: [
        { label: 'Lacto-fermentation groseilles', value: '22 °C pendant 5 à 7 jours (2 % sel)' },
        { label: 'Huile d’aiguilles de pin', value: 'Mixage à 45 °C puis filtration papier' },
      ],
      phases: [
        { phase: '01. Jus Fermenté & Huile Verte', duration: '30 min (+ fermentation préalable)', details: 'Extraction du jus lacto-fermenté de groseilles blanches et centrifugation/filtration de l’huile de pin.' },
        { phase: '02. Crumble de Seigle Malté', duration: '15 min', details: 'Dessiccation au four doux du pain de seigle et broyage grossier.' },
        { phase: '03. Dressage à Cru sur Grès Froid', duration: '10 min', details: 'Queues de langoustines crues lustrées à l’huile de pin, baies d’argousier et herbes nordiques.' },
      ],
      qualityCheckpoints: [
        'Langoustines ultra-fraîches conservées sur lit de glace jusqu’au dressage.',
        'Équilibre net entre acidité lactique et douceur naturelle du crustacé.',
      ],
    },
  },
  'joan-roca': {
    techniquesUsed: ['cuisson-sous-vide-roner', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 assiettes',
      serviceTemp: '62 °C',
      equipment: ['Thermo-plongeur (Roner)', 'Machine à mise sous vide', 'Poêle antiadhésive lourde', 'Couteau trancheur fin'],
      criticalTemperatures: [
        { label: 'Bain-marie sous vide volaille', value: '64,0 °C pendant 45 min' },
        { label: 'Saisie peau uniquement', value: '200 °C · 90 à 120 secondes' },
      ],
      phases: [
        { phase: '01. Cuisson Basse Température', duration: '45 min', details: 'Mise sous vide des suprêmes avec beurre et thym ; cuisson précise à 64 °C.' },
        { phase: '02. Refroidissement & Séchage Peau', duration: '10 min', details: 'Épongement minutieux et saisie côté peau seule pour obtenir une croustillance vitreuse.' },
        { phase: '03. Morilles, Pignons & Jus Truffé', duration: '15 min', details: 'Glacis des morilles, tranchage en biseau et finition truffe noire.' },
      ],
      qualityCheckpoints: [
        'Absence totale d’eau en surface de peau avant passage à la poêle.',
        'Chair rosée-blanche uniformément juteuse d’un bord à l’autre.',
      ],
    },
  },
  'clare-smyth': {
    techniquesUsed: ['beurre-blanc-emulsion', 'cuisson-unilaterale-nacree'],
    technicalSheet: {
      yieldLabel: '4 portions (8 noix de Saint-Jacques d’Écosse)',
      serviceTemp: '58 °C',
      equipment: ['Coquilles naturelles nettoyées', 'Sautoir fond épais', 'Fouet', 'Thermomètre'],
      criticalTemperatures: [
        { label: 'Maintien du beurre blanc', value: '54 °C – 58 °C max' },
        { label: 'Saisie de la noix', value: '60 s face 1 + 30 s arrosage · 47 °C à cœur' },
      ],
      phases: [
        { phase: '01. Réduction Champagne & Algues', duration: '20 min', details: 'Réduction quasi à sec du Champagne avec échalote et dulse.' },
        { phase: '02. Montage Beurre Blanc', duration: '10 min', details: 'Incorporation progressive du beurre froid en dés au fouet hors du feu.' },
        { phase: '03. Saisie & Dressage en Coquille', duration: '10 min', details: 'Caramélisation nette, pose sur coquille chaude avec œufs de hareng fumé et dulse.' },
      ],
      qualityCheckpoints: [
        'Beurre blanc brillant et nappant sans jamais bouillir.',
        'Caramélisation couleur noisette sur la face supérieure de la noix.',
      ],
    },
  },
  'yoshihiro-murata': {
    techniquesUsed: ['ichiban-dashi', 'saisie-binchotan'],
    technicalSheet: {
      yieldLabel: '4 bols kaiseki',
      serviceTemp: '12 °C (frais harmonieux)',
      equipment: ['Couteau japonais Yanagiba', 'Gril ou chalumeau / binchotan', 'Casserole émaillée', 'Râpe à wasabi'],
      criticalTemperatures: [
        { label: 'Infusion Kombu (Ichiban Dashi)', value: '60 °C pendant 60 min (sans bouillir)' },
        { label: 'Infusion Bonite (Katsuobushi)', value: '85 °C feu coupé · 60 secondes' },
        { label: 'Saisie surface Otoro', value: '10 secondes par face' },
      ],
      phases: [
        { phase: '01. Ichiban Dashi & Gelée', duration: '70 min + prise au froid', details: 'Extraction limpide kombu-bonite, gélification légère à l’agar et bris à la fourchette.' },
        { phase: '02. Tataki Éclair d’Otoro', duration: '10 min', details: 'Marquage rapide en surface, choc thermique sur pierre glacée et coupe nette.' },
        { phase: '03. Dressage Bizen', duration: '5 min', details: 'Lit de gelée cristalline, oursin d’Hokkaido, wasabi râpé minute et julienne de yuzu.' },
      ],
      qualityCheckpoints: [
        'Ne jamais presser les copeaux de bonite lors du filtrage pour garder le bouillon cristallin.',
        'Coupe franche en un seul mouvement tiré du Yanagiba.',
      ],
    },
  },
  'jiro-ono-ken-jiro-ishikawa-seiji-yamamoto': {
    techniquesUsed: ['ichiban-dashi', 'saisie-binchotan'],
    technicalSheet: {
      yieldLabel: '4 bols de dégustation',
      serviceTemp: '10 °C',
      equipment: ['Couteau Yanagiba', 'Gril brûlant / binchotan', 'Papier étamine', 'Bols laqués'],
      criticalTemperatures: [
        { label: 'Saisie surface thon', value: '8 secondes max · Cœur à 8 °C' },
        { label: 'Dashi fumé', value: '85 °C infusion puis refroidissement +4 °C' },
      ],
      phases: [
        { phase: '01. Dashi Glacé au Shiro Shoyu', duration: '45 min + prise froid', details: 'Infusion bonite fumée, assaisonnement sauce soja blanche et prise en gelée souple.' },
        { phase: '02. Saisie & Quadrillage', duration: '10 min', details: 'Saisie éclair, refroidissement immédiat et incisions fines en surface.' },
        { phase: '03. Finition Florale', duration: '5 min', details: 'Montage en laque noire, oursins, fleur de shiso et wasabi frais.' },
      ],
      qualityCheckpoints: [
        'Contraste thermique net entre croûte torréfiée et cœur cru fondant.',
      ],
    },
  },
  'elena-arzak': {
    techniquesUsed: ['cuisson-unilaterale-nacree', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 assiettes',
      serviceTemp: '48 °C',
      equipment: ['Plancha haute température', 'Tamiseur poudre fine', 'Chinois étamine'],
      criticalTemperatures: [
        { label: 'Marinade agrumes', value: '15 min à +4 °C' },
        { label: 'Plancha langoustine', value: '220 °C · 25 secondes face ventrale seule' },
      ],
      phases: [
        { phase: '01. Bouillon d’Algues & Poudre Cacao', duration: '25 min', details: 'Infusion kombu-codium au gingembre et tamisage fin du cacao torréfié.' },
        { phase: '02. Marinade & Plancha Éclair', duration: '20 min', details: 'Enrobage huile navarraise aux agrumes puis passage éclair 25 s.' },
        { phase: '03. Dressage Sculptural', duration: '5 min', details: 'Voile léger de cacao, perles de pamplemousse et bouillon émeraude.' },
      ],
      qualityCheckpoints: [
        'Voile de cacao impalpable pour apporter amertume aromatique sans sécheresse.',
      ],
    },
  },
  'daniel-humm': {
    techniquesUsed: ['lacto-fermentation', 'mandoline-concentrique', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 tartes individuelles',
      serviceTemp: '42 °C',
      equipment: ['Centrifugeuse / extracteur', 'Emporte-pièce Ø 8 cm', 'Cercle Ø 9 cm', 'Mixeur haute puissance'],
      criticalTemperatures: [
        { label: 'Réduction jus de carotte (glace)', value: '82 °C très doux jusqu’à réduction de 80 %' },
        { label: 'Cuisson pâte huile d’olive', value: '175 °C pendant 15 min' },
      ],
      phases: [
        { phase: '01. Glace de Carotte & Crème Cajou', duration: '45 min', details: 'Réduction lente du jus centrifugé et mixage lisse des noix de cajou fermentées.' },
        { phase: '02. Taillage & Glacis des Racines', duration: '35 min', details: 'Blanchiment bref et enrobage lustré des betteraves et panais dans la réduction.' },
        { phase: '03. Rosace & Tonburi', duration: '15 min', details: 'Montage concentrique sur fond croustillant, points d’huile de livèche et caviar végétal.' },
      ],
      qualityCheckpoints: [
        'Brillance miroir naturelle des racines obtenue sans beurre ni gélatine animale.',
      ],
    },
  },
  'dominique-crenn': {
    techniquesUsed: ['cuisson-unilaterale-nacree', 'beurre-blanc-emulsion'],
    technicalSheet: {
      yieldLabel: '4 bols (8 noix du Pacifique)',
      serviceTemp: '55 °C',
      equipment: ['Poêle acier', 'Sautoir cuivre', 'Bols céramique artisanale'],
      criticalTemperatures: [
        { label: 'Réduction cidre & algue', value: 'Réduction de 75 % à frémissement' },
        { label: 'Saisie Saint-Jacques', value: '40 secondes face 1 · 46 °C à cœur' },
      ],
      phases: [
        { phase: '01. Beurre Blanc au Cidre Breton', duration: '25 min', details: 'Réduction du cidre brut avec algue fraîche, crémage et montage au beurre demi-sel.' },
        { phase: '02. Saisie & Dressage Poétique', duration: '15 min', details: 'Saisie unilatérale, laitue de mer, œufs de truite fumée et fleurs de bourrache.' },
      ],
      qualityCheckpoints: [
        'Acidité vive du cidre équilibrée par le gras du beurre demi-sel.',
      ],
    },
  },
  'andreas-caminada': {
    techniquesUsed: ['arrosage-beurre-mousseux', 'extraction-sauce-absolue'],
    technicalSheet: {
      yieldLabel: '4 assiettes (2 pigeonneaux entiers sur coffre)',
      serviceTemp: '58 °C (service rosé saignant)',
      equipment: ['Sautoir épais', 'Grille de repos', 'Sonde à cœur', 'Couteau d’office'],
      criticalTemperatures: [
        { label: 'Rôtissage sur coffre', value: '8 min avec arrosage au beurre de genièvre' },
        { label: 'Repos thermique indispensable', value: '15 min à 52 °C avant levée des filets' },
        { label: 'Cœur du filet de pigeonneau', value: '50 °C – 52 °C (rosé uniforme)' },
      ],
      phases: [
        { phase: '01. Tartare de Betterave & Jus Genièvre', duration: '35 min', details: 'Brunoise millimétrée de betterave rôtie à l’huile de noix ; réduction du jus aux baies concassées.' },
        { phase: '02. Cuisson sur Coffre & Repos', duration: '25 min', details: 'Saisie lente sur coffre, arrosage continu puis long repos sur grille.' },
        { phase: '03. Levée des Filets & Service', duration: '10 min', details: 'Découpe nette des suprêmes rosés, pose des morilles et trait de jus.' },
      ],
      qualityCheckpoints: [
        'Respect strict des 15 min de repos : aucun exsudat rouge ne doit couler dans l’assiette.',
      ],
    },
  },
  'jessica-prealpato': {
    techniquesUsed: ['desseralite-naturelle'],
    technicalSheet: {
      yieldLabel: '4 tartelettes individuelles (Ø 8 cm)',
      serviceTemp: '20 °C (ganache souple) / Glace à -12 °C',
      equipment: ['4 cercles à tartelette perforés', 'Thermomètre sonde', 'Poêle sèche pour sarrasin', 'Spatule coudée'],
      criticalTemperatures: [
        { label: 'Torréfaction du sarrasin (kasha)', value: '4 min à sec à feu moyen' },
        { label: 'Cuisson fond seigle-sarrasin', value: '170 °C · 15 min à blanc' },
        { label: 'Émulsion ganache miel-chocolat', value: '42 °C – 45 °C' },
      ],
      phases: [
        { phase: '01. Pâte Seigle & Sarrasin Torréfié', duration: '25 min', details: 'Torréfaction à sec, mouture partielle, sablage et cuisson des fonds.' },
        { phase: '02. Ganache au Miel de Châtaignier', duration: '15 min', details: 'Infusion crème-miel versée en 3 fois sur chocolat cru 75 % haché.' },
        { phase: '03. Finition & Tuile Muscovado', duration: '15 min', details: 'Coulage sur fonds tièdes, noisettes rôties, grué et spirale croustillante.' },
      ],
      qualityCheckpoints: [
        'Émulsion brillante et élastique réalisée en trois ajouts progressifs au centre du bol.',
      ],
    },
  },
  'virgilio-martinez': {
    techniquesUsed: ['leche-de-tigre-fermente', 'lacto-fermentation'],
    technicalSheet: {
      yieldLabel: '4 assiettes sur pierre froide',
      serviceTemp: '8 °C (glacé)',
      equipment: ['Mixeur haute vitesse', 'Chinois étamine', 'Lit de glace', 'Pierre d’ardoise refroidie'],
      criticalTemperatures: [
        { label: 'Infusion du leche de tigre', value: '+4 °C sur glace pendant 20 min' },
        { label: 'Service final', value: '6 °C – 8 °C' },
      ],
      phases: [
        { phase: '01. Leche de Tigre Cristallin', duration: '30 min', details: 'Mixage court parures-citron vert-ají limo-glaçons, repos 20 min et filtration sans presser.' },
        { phase: '02. Huile de Coriandre & Maïs Violet', duration: '15 min', details: 'Extraction huile verte et mouture fine du maïs violet torréfié.' },
        { phase: '03. Dressage sur Ardoise Froide', duration: '10 min', details: 'Langoustines crues lustrées, perles d’algues, baies acides et voile de leche de tigre.' },
      ],
      qualityCheckpoints: [
        'Mixage très bref avec glaçons pour préserver une fraîcheur acidulée sans amertume du ziste.',
      ],
    },
  },
};
