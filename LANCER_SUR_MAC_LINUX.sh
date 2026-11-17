#!/usr/bin/env bash
echo "========================================================"
echo "  ATLAS DES CHEFS ETOILES - EXECUTION PC / MAC / LINUX"
echo "========================================================"
cd "$(dirname "$0")"

if command -v npx >/dev/null 2>&1; then
  echo "Démarrage sur http://localhost:3000 ..."
  npx --yes serve -s dist -l 3000
elif command -v python3 >/dev/null 2>&1; then
  echo "Démarrage sur http://localhost:3000 ..."
  cd dist && python3 -m http.server 3000
else
  echo "Ouvrez le fichier dist/index.html dans votre navigateur."
fi
