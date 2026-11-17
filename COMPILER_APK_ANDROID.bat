@echo off
chcp 65001 >nul
title Compilation APK Android - Atlas des Chefs Etoiles
echo ========================================================
echo   COMPILATION AUTOMATIQUE DE L'APK ANDROID
echo ========================================================
echo.

echo [1/3] Installation des dependances Node.js...
call npm install

echo.
echo [2/3] Compilation Web (Vite) et synchronisation Capacitor Android...
call npm run android:sync

echo.
echo [3/3] Generation du fichier APK Debug avec Gradle...
cd android
if exist gradlew.bat (
    call gradlew.bat assembleDebug
    echo.
    echo ========================================================
    echo   SUCCES ! Votre fichier APK est pret ici :
    echo   android\app\build\outputs\apk\debug\app-debug.apk
    echo ========================================================
    explorer.exe "app\build\outputs\apk\debug"
) else (
    echo Ouverture du projet dans Android Studio pour generer l'APK...
    cd ..
    call npx cap open android
)
pause
