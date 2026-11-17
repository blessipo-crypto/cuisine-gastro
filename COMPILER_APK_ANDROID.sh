#!/usr/bin/env bash
set -e
echo "========================================================"
echo "  COMPILATION AUTOMATIQUE DE L'APK ANDROID"
echo "========================================================"
cd "$(dirname "$0")"

echo "[1/3] Installation des dépendances..."
npm install

echo "[2/3] Compilation Web et synchronisation Android Capacitor..."
npm run android:sync

echo "[3/3] Génération de l'APK Debug..."
cd android
chmod +x ./gradlew
./gradlew assembleDebug

echo "========================================================"
echo "  SUCCÈS ! Votre fichier APK est disponible dans :"
echo "  android/app/build/outputs/apk/debug/app-debug.apk"
echo "========================================================"
