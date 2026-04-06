@echo off
color 0A
title Cong cu ho tro du an XetulaiPQ

:menu
cls
echo ========================================================
echo           CONG CU QUAN LY DU AN XETULAIPQ
echo ========================================================
echo 1. Chay Dev Server (npm run dev)
echo 2. Build Project (npm run build)
echo 3. Deploy len GitHub (Tu dong add, commit, push)
echo 4. Thoat
echo ========================================================
set /p choice="Vui long chon chuc nang (1-4): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto deploy
if "%choice%"=="4" goto exit

echo Lua chon khong hop le! Vui long chon lai.
timeout /t 2 >nul
goto menu

:dev
cls
echo ========================================================
echo Dang khoi dong Dev Server (npm run dev)...
echo Nhan Ctrl+C de dung server khi muon thoat.
echo ========================================================
call npm run dev
pause
goto menu

:build
cls
echo ========================================================
echo Dang tien hanh build du an (npm run build)...
echo ========================================================
call npm run build
echo ========================================================
echo Build hoan tat!
pause
goto menu

:deploy
cls
echo ========================================================
echo Dang deploy code len GitHub...
echo Repository: https://github.com/tm-quang/xetulaipq.git
echo ========================================================
echo.
set /p commit_msg="Nhap noi dung commit (hoac nhan Enter de dung mac dinh): "
if "%commit_msg%"=="" set commit_msg=Auto deploy update %date% %time%

echo.
echo [1/3] Dang them cac file thay doi (git add .)...
git add .

echo.
echo [2/3] Dang commit code (git commit)...
git commit -m "%commit_msg%"

echo.
echo [3/3] Dang push len GitHub (git push -u origin main)...
git push -u origin main

echo.
echo ========================================================
echo Da hoan tat day Code len GitHub!
pause
goto menu

:exit
exit
