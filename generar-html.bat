@echo off
chcp 65001 >nul
title Barrio Bamba - Generar archivo HTML
cd /d "%~dp0"

echo ============================================
echo   BARRIO BAMBA - generar archivo de doble clic
echo ============================================
echo.

if not exist "node_modules" (
  echo Instalando dependencias por primera vez. Espera un momento...
  call npm install
  echo.
)

echo Empaquetando todo en un solo archivo...
call npm run build
copy /Y "dist\index.html" "barrio-bamba.html" >nul

echo.
echo LISTO. Se actualizo: barrio-bamba.html
echo Haz doble clic en ese archivo para abrir el sitio.
echo.
pause
