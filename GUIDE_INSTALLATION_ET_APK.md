# Guide d'Exécution & Packaging — L'Atlas des Chefs Étoilés

## Faut-il Python ou un serveur pour exécuter l'application ?
**NON ! Aucun Python, Node.js, ni serveur n'est requis.**

---

## Option 1 : Le Fichier Unique 100 % Autonome (Le plus simple — Sans Python)

1. Dans l'en-tête de l'application (en haut à droite), cliquez sur le bouton rouge **« Télécharger / APK »**.
2. Cliquez sur **« Télécharger Atlas_Chefs_Etoiles_Autonome.html »**.
3. **Pour l'exécuter** :
   - **Sur PC (Windows / Mac / Linux)** : **Double-cliquez simplement sur le fichier `Atlas_Chefs_Etoiles_Autonome.html`**. Il s'ouvrira immédiatement dans votre navigateur web (Chrome, Edge, Firefox, Safari) avec toutes les photos, fiches chefs, recettes, mode obscur et plein écran intégrés.
   - **Sur Smartphone Android** : Transférez ou téléchargez `Atlas_Chefs_Etoiles_Autonome.html` sur votre téléphone et appuyez dessus pour l'ouvrir dans **Google Chrome**.

---

## Option 2 : Le Pack Exécutable PC (`atlas-chefs-executable-pc-mobile.zip`)

1. Téléchargez **`atlas-chefs-executable-pc-mobile.zip`** depuis le menu **« Télécharger / APK »**.
2. Décompressez l'archive `.zip` sur votre Bureau.
3. Double-cliquez sur **`LANCER_SUR_PC.bat`** (ou directement sur `Atlas_Chefs_Etoiles_Autonome.html`).
   - Le script ouvre automatiquement l'application dans une fenêtre dédiée Chrome/Edge (mode Application) **sans avoir besoin de Python ni d'aucune installation**.

---

## Option 3 : Générer un fichier `.APK` Android Natif (`atlas-chefs-projet-complet-apk.zip`)

Si vous souhaitez compiler un fichier d'installation Android `.apk` :
1. Téléchargez et extrayez **`atlas-chefs-projet-complet-apk.zip`**.
2. Ouvrez le dossier `android/` dans **Android Studio** puis cliquez sur **Build > Build Bundle(s) / APK(s) > Build APK(s)** (ou double-cliquez sur `COMPILER_APK_ANDROID.bat` si le SDK Android est installé).
