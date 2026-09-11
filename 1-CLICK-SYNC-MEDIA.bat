@echo off
title Syncing Photos and Video to Birthday Website...
cd /d "%~dp0"
echo ============================================================
echo   SYNCING YOUR PHOTOS AND VIDEO TO THE WEBSITE
echo ============================================================
echo.
node scripts/sync-media.js
echo.
echo ============================================================
echo   DONE! Your photos and video are now in the website.
echo   Refresh your browser to see the updates!
echo ============================================================
echo.
pause
