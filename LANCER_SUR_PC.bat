@echo off
chcp 65001 >nul
title Atlas des Chefs Etoiles - Lancement PC
echo ========================================================
echo   ATLAS DES CHEFS ETOILES - EXECUTION SUR PC
echo ========================================================
echo.

where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Demarrage du serveur local sur http://localhost:3000 ...
    start "" "http://localhost:3000"
    npx --yes serve -s dist -l 3000
    goto :eof
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Demarrage du serveur Python sur http://localhost:3000 ...
    start "" "http://localhost:3000"
    cd dist
    python -m http.server 3000
    goto :eof
)

echo Ouverture directe de l'application...
start "" "%~dp0dist\index.html"
pause
