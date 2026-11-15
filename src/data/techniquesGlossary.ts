import { TechniqueEntry } from '../types/chef';

export const TECHNIQUES_GLOSSARY: Record<string, TechniqueEntry> = {
  'impregnation-aromatique': {
    id: 'impregnation-aromatique',
    term: 'Imprégnation Aromatique',
    category: 'Sauces & Émulsions',
    summary:
      'Procédé signature consistant à marier plusieurs couches d’infusions (herbes, thés, épices, fleurs) à basse température afin de saturer une farce ou un bouillon sans masquer le produit principal.',
    temperatureOrTiming: '55 °C – 65 °C · 20 à 45 min hors ébullition',
    howToPerform:
      'Porter le liquide support (crème, fumet ou lait) à frémissement, retirer du feu, immerger les aromates (mélisse, tonka, thé) à couvert puis passer au chinois étamine sans presser pour garder la limpidité.',
  },
  'laminage-pate-fine': {
    id: 'laminage-pate-fine',
    term: 'Laminage Extrafin (Pâte Translucide)',
    category: 'Découpe & Dressage',
    summary:
      'Abaisse progressive d’une pâte aux jaunes d’œufs jusqu’à 0,5 mm d’épaisseur pour obtenir des ravioles ou berlingots qui laissent deviner la garniture après pochage.',
    temperatureOrTiming: 'Repos 2 h à +4 °C · Pochage 90 à 120 s à 92 °C',
    howToPerform:
      'Pétrir longuement la pâte, la laisser détendre filmée au froid puis la passer cran par cran au laminoir en farinant au minimum avant de souder les bords à l’eau claire.',
  },
  'mandoline-concentrique': {
    id: 'mandoline-concentrique',
    term: 'Taillage à la Mandoline & Montage en Rosace',
    category: 'Découpe & Dressage',
    summary:
      'Coupe régulière au millimètre de racines ou fruits crus permettant une cuisson homogène et une disposition florale géométrique.',
    temperatureOrTiming: 'Épaisseur 1,0 mm · Blanchiment éclair 15 s',
    howToPerform:
      'Régler la lame japonaise à 1 mm, trancher les légumes bien secs, assouplir brièvement dans une eau miellée frémissante si nécessaire puis imbriquer en cercles serrés de l’extérieur vers le centre.',
  },
  'beurre-noisette-clarifie': {
    id: 'beurre-noisette-clarifie',
    term: 'Beurre Noisette Clarifié',
    category: 'Cuissons',
    summary:
      'Cuisson douce du beurre jusqu’à caramélisation des protéines du petit-lait (caséine) suivie d’une filtration, offrant un arôme de noisette torréfiée et un point de fumée élevé.',
    temperatureOrTiming: '145 °C – 155 °C · Filtration à chaud',
    howToPerform:
      'Faire fondre le beurre à feu moyen en écoutant le crépitement s’atténuer ; dès qu’une couleur ambrée et une odeur de noisette apparaissent, stopper la cuisson sur un bain froid et filtrer au papier mousseline.',
  },
  'extraction-sauce-absolue': {
    id: 'extraction-sauce-absolue',
    term: 'Extraction & Réduction de Sauce Absolue',
    category: 'Sauces & Émulsions',
    summary:
      'Construction d’une sauce sans farine ni liant artificiel par réduction successive de sucs marins ou carnés, déglacés aux vins et montés à l’émulsion.',
    temperatureOrTiming: 'Réduction douce à 88 °C · Émulsion à 62 °C',
    howToPerform:
      'Suer les parures sans coloration, déglacer en deux temps, mouiller à hauteur, laisser mijoter sans gros bouillons, fouler au chinois étamine puis émulsionner au mixeur plongeant avec une matière grasse noble.',
  },
  'cuisson-unilaterale-nacree': {
    id: 'cuisson-unilaterale-nacree',
    term: 'Cuisson Nacrée à l’Unilatérale',
    category: 'Cuissons',
    summary:
      'Saisie quasi exclusive sur la face peau ou la face de présentation afin d’obtenir un contraste maximal entre croûte croustillante et chair translucide à cœur.',
    temperatureOrTiming: '46 °C – 52 °C à cœur selon le poisson ou coquillage',
    howToPerform:
      'Bien sécher le pavé sur papier absorbant, déposer côté peau dans un sautoir chaud huilé en maintenant une légère pression 15 s pour éviter qu’il ne se rétracte, puis terminer à chaleur douce ou en arrosant de beurre mousseux.',
  },
  'fumaison-a-froid': {
    id: 'fumaison-a-froid',
    term: 'Fumaison Douce sous Cloche',
    category: 'Fermentation & Maturation',
    summary:
      'Aromatisation instantanée de crustacés ou poissons crus/mi-cuits par exposition brève à la fumée froide de bois nobles (cèdre, hêtre, épicéa).',
    temperatureOrTiming: '< 28 °C · 90 à 180 secondes sous cloche',
    howToPerform:
      'Déposer le produit assaisonné sur grille ou pierre froide, embraser de petits copeaux secs non traités à l’aide d’un fumoir ou d’un chalumeau et capturer la fumée sous cloche hermétique.',
  },
  'croute-de-sel': {
    id: 'croute-de-sel',
    term: 'Cuisson Étouffée en Croûte de Sel',
    category: 'Cuissons',
    summary:
      'Enrobage hermétique d’une racine entière ou d’un poisson dans un mortier de gros sel et blancs d’œufs qui cuit le produit dans sa propre vapeur minérale.',
    temperatureOrTiming: '180 °C au four · 45 à 90 min · Repos 15 min',
    howToPerform:
      'Mélanger 1 kg de gros sel gris avec 2 blancs d’œufs et 50 ml d’eau, enfermer le produit non pelé dans une coque régulière de 1 cm d’épaisseur et laisser reposer 15 minutes après sortie du four avant de briser.',
  },
  'demi-deuil': {
    id: 'demi-deuil',
    term: 'Contisage en Demi-Deuil',
    category: 'Cuissons',
    summary:
      'Technique patrimoniale consistant à glisser de fines lames de truffe noire directement entre la peau et la chair d’une volaille avant cuisson.',
    temperatureOrTiming: 'Pochage 82 °C – 85 °C ou Rôtissage 175 °C',
    howToPerform:
      'Décoller délicatement la peau depuis le cou avec les doigts humides sans la percer, insérer des rondelles de truffe noire de 1,5 mm sur chaque suprême et brider la volaille pour tendre la peau.',
  },
  'arrosage-beurre-mousseux': {
    id: 'arrosage-beurre-mousseux',
    term: 'Rôtissage & Arrosage au Beurre Mousseux',
    category: 'Cuissons',
    summary:
      'Cuisson en cocotte ou sautoir où la pièce est constamment nappée d’un beurre chaud mousseux parfumé d’herbes pour caraméliser et attendrir uniformément.',
    temperatureOrTiming: '140 °C dans le sautoir · Repos 15 min sur grille',
    howToPerform:
      'Incliner légèrement la poêle pour rassembler le beurre moussant avec thym et ail en chemise, puis arroser en continu à la cuillère à arroser pendant les dernières minutes avant un long repos à 55 °C.',
  },
  'mousseline-soufflee': {
    id: 'mousseline-soufflee',
    term: 'Mousseline de Poisson Soufflée sur Glace',
    category: 'Pâtisserie & Textures',
    summary:
      'Émulsion à froid d’une chair blanche fine (brochet, sandre) avec du blanc d’œuf et de la crème liquide qui gonfle au four comme un soufflé salé.',
    temperatureOrTiming: 'Mixage à 2 °C sur glace · Cuisson 210 °C, 12–14 min',
    howToPerform:
      'Refroidir le bol du cutter et tous les ingrédients à 2 °C ; mixer d’abord la chair avec le sel et le blanc d’œuf jusqu’à texture élastique puis incorporer la crème fleurette en filet régulier.',
  },
  'sabayon-monte': {
    id: 'sabayon-monte',
    term: 'Sabayon Minute au Vin Blanc',
    category: 'Sauces & Émulsions',
    summary:
      'Émulsion mousseuse tiède obtenue en fouettant vigoureusement des jaunes d’œufs avec un vin blanc ou un fumet réduit au bain-marie.',
    temperatureOrTiming: '68 °C – 72 °C au fouet en continu',
    howToPerform:
      'Fouetter les jaunes avec le liquide froid au bain-marie frémissant en dessinant des « 8 » jusqu’à ce que le mélange double de volume et fasse le ruban sans jamais dépasser 74 °C (risque de coagulation).',
  },
  'beurre-blanc-emulsion': {
    id: 'beurre-blanc-emulsion',
    term: 'Beurre Blanc Monté à Froid',
    category: 'Sauces & Émulsions',
    summary:
      'Sauce émulsionnée chaude et instable née d’une réduction quasi à sec de vin blanc, vinaigre et échalotes dans laquelle on incorpore du beurre froid en dés.',
    temperatureOrTiming: 'Maintien entre 52 °C et 58 °C (ne jamais bouillir)',
    howToPerform:
      'Réduire vin blanc, Champagne et échalotes ciselées jusqu’à consistance sirupeuse, baisser au minimum ou travailler hors du feu et fouetter des cubes de beurre froid un à un pour créer une crème satinée.',
  },
  'noyau-glace-coulant': {
    id: 'noyau-glace-coulant',
    term: 'Insert Congelé à Cœur Coulant',
    category: 'Pâtisserie & Textures',
    summary:
      'Procédé inventé à Laguiole consistant à enfermer une bille de ganache congelée dans un appareil à biscuit cuit à four très chaud pour obtenir un cœur liquide.',
    temperatureOrTiming: 'Congélation -18 °C (4 h) · Cuisson 200 °C, 12 min',
    howToPerform:
      'Couler une ganache riche en beurre de cacao en demi-sphères et congeler à cœur ; insérer la bille glacée au centre du biscuit chemisé juste avant d’enfourner pour créer un différentiel thermique net.',
  },
  'chemise-architecture-pates': {
    id: 'chemise-architecture-pates',
    term: 'Montage Architectural en Timbale',
    category: 'Découpe & Dressage',
    summary:
      'Alignement manuel de pâtes précuites à l’intérieur d’un cercle graissé pour constituer une paroi cylindrique rigide autour d’une farce noble.',
    temperatureOrTiming: 'Pré-cuisson 6 min · Réchauffage vapeur 6 min à 85 °C',
    howToPerform:
      'Cuire les spaghettis très al dente, les ranger parallèlement sur un linge humide, chemiser soigneusement les parois d’un cercle beurré, garnir le centre de farce liée et réchauffer à couvert avant démoulage.',
  },
  'espuma-siphon': {
    id: 'espuma-siphon',
    term: 'Espuma Aérienne au Siphon',
    category: 'Pâtisserie & Textures',
    summary:
      'Création d’une mousse chaude ou froide sans blanc d’œuf battu, obtenue par injection de protoxyde d’azote (N₂O) dans une base filtrée gélatinée ou crémée.',
    temperatureOrTiming: 'Filtration étamine · Maintien bain-marie 62 °C',
    howToPerform:
      'Passer impérativement la préparation au tamis fin pour éviter tout grain, remplir le siphon aux deux tiers, visser une à deux cartouches de N₂O, secouer énergiquement et maintenir tiède avant d’extruder.',
  },
  'lacto-fermentation': {
    id: 'lacto-fermentation',
    term: 'Lacto-Fermentation Contrôlée',
    category: 'Fermentation & Maturation',
    summary:
      'Transformation enzymatique naturelle des sucres de baies, légumes ou jus grâce à un ajout précis de sel marin en anaérobie, produisant une acidité complexe sans vinaigre.',
    temperatureOrTiming: '2 % de sel au poids · 5 à 14 jours à 20–24 °C',
    howToPerform:
      'Peser les fruits ou légumes sains, ajouter exactement 2 % de leur poids en sel fin non iodé, mettre sous vide ou en bocal hermétique à l’abri de la lumière et stopper au froid dès l’acidité souhaitée.',
  },
  'cuisson-sous-vide-roner': {
    id: 'cuisson-sous-vide-roner',
    term: 'Cuisson Basse Température Sous Vide',
    category: 'Cuissons',
    summary:
      'Cuisson au degré près en bain-marie thermostaté sous vide permettant de préserver l’hydratation cellulaire et la tendreté absolue des volailles et poissons.',
    temperatureOrTiming: '62 °C à 64 °C (volaille) · 45 à 60 min',
    howToPerform:
      'Assaisonner la pièce, mettre sous vide avec une noix de beurre et des aromates, immerger totalement dans le bain thermostaté puis sécher et saisir la peau 90 secondes à sec pour le croustillant.',
  },
  'ichiban-dashi': {
    id: 'ichiban-dashi',
    term: 'Extraction du Premier Bouillon (Ichiban Dashi)',
    category: 'Sauces & Émulsions',
    summary:
      'Bouillon fondamental de la gastronomie japonaise tirant un maximum d’umami de la synergie entre l’algue kombu (glutamate) et la bonite séchée (inosinate).',
    temperatureOrTiming: 'Kombu à 60 °C (60 min) · Bonite à 85 °C (60 s)',
    howToPerform:
      'Infuser le kombu essuyé à 60 °C sans jamais bouillir, le retirer avant 70 °C, monter brièvement à 85 °C, couper le feu et jeter le katsuobushi ; filtrer dès que les copeaux tombent au fond sans presser.',
  },
  'saisie-binchotan': {
    id: 'saisie-binchotan',
    term: 'Marquage Éclair au Charbon Binchotan',
    category: 'Cuissons',
    summary:
      'Saisie infrarouge instantanée sur charbon de chêne blanc japonais atteignant plus de 900 °C sans fumée pour caraméliser la surface en laissant le cœur cru.',
    temperatureOrTiming: '5 à 10 secondes par face · Refroidissement choc',
    howToPerform:
      'Approcher le bloc de poisson ou de crustacé à 2 cm des braises blanches incandescences pendant quelques secondes seulement pour fumer et saisir l’extérieur, puis trancher au yanagiba.',
  },
  'desseralite-naturelle': {
    id: 'desseralite-naturelle',
    term: 'Desseralité & Sucrage Alternatif',
    category: 'Pâtisserie & Textures',
    summary:
      'Approche pâtissière contemporaine supprimant le sucre raffiné au profit de la sucrosité naturelle des fruits, miels bruts, céréales torréfiées et amertumes nobles.',
    temperatureOrTiming: 'Équilibre acide/amer · Ganache à 42 °C',
    howToPerform:
      'Torréfier les céréales (sarrasin, seigle) pour réveiller leurs sucres lents, travailler les chocolats crus peu sucrés et utiliser des vinaigres de fruits ou miels de forêt pour allonger la finale en bouche.',
  },
  'leche-de-tigre-fermente': {
    id: 'leche-de-tigre-fermente',
    term: 'Leche de Tigre Cristallin & Acidités Andines',
    category: 'Sauces & Émulsions',
    summary:
      'Bouillon marin froid à base de jus de citron vert, parures de poisson blanc, piments aromatiques et herbes, filtré pour accompagner les crustacés crus.',
    temperatureOrTiming: 'Service glacé à 4 °C · Infusion 20 min',
    howToPerform:
      'Mixer brièvement des parures de poisson très frais avec glaçons, citron vert pressé à la main, tiges de coriandre, céleri et piment sans graine, laisser reposer 20 min au froid puis passer à l’étamine.',
  },
};
