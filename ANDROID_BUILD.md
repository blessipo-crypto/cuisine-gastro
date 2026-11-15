# Compilation de l'APK Android — Atlas des Chefs Étoilés

Le projet Android Capacitor (`android/`) est déjà configuré et synchronisé avec le dossier compilé `dist/`.

## Prérequis sur votre PC
- **Node.js 20+**
- **Android Studio** (avec Android SDK & JDK 17+)

## Générer le fichier `.apk`
1. Installez les dépendances si nécessaire :
   ```bash
   npm install
   ```
2. Recompilez l'application Web et synchronisez les ressources Android :
   ```bash
   npm run android:sync
   ```
3. Générez l'APK :
   - **Avec Android Studio** :
     ```bash
     npm run android:open
     ```
     Puis dans le menu : **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
   - **En ligne de commande** (depuis le dossier `android/`) :
     ```bash
     ./gradlew assembleDebug
     ```
     L'APK généré se trouvera dans :
     `android/app/build/outputs/apk/debug/app-debug.apk`
