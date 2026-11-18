@echo off
chcp 65001 >nul
title L'Atlas des Chefs Etoiles — Lancement Direct (Sans Python ni Serveur)
echo ============================================================================
echo   L'ATLAS DES CHEFS ETOILES — EDITION HAUTE GASTRONOMIE
echo   Lancement direct 100%% autonome (Aucun Python ni Node.js requis)
echo ============================================================================
echo.

set "APP_FILE=%~dp0Atlas_Chefs_Etoiles_Autonome.html"
if not exist "%APP_FILE%" set "APP_FILE=%~dp0public\downloads\Atlas_Chefs_Etoiles_Autonome.html"
if not exist "%APP_FILE%" set "APP_FILE=%~dp0dist\index.html"

where msedge >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Ouverture en mode Application native via Microsoft Edge...
    start "" msedge --app="file:///%APP_FILE:\=/%"
    exit /b 0
)

where chrome >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Ouverture en mode Application native via Google Chrome...
    start "" chrome --app="file:///%APP_FILE:\=/%"
    exit /b 0
)

echo [OK] Ouverture dans votre navigateur par defaut...
start "" "%APP_FILE%"
exit /b 0
