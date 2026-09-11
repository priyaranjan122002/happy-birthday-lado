@echo off
title Unblock Phone Access (Port 5173)
color 0A
echo.
echo ========================================================
echo   UNBLOCKING WINDOWS FIREWALL FOR PHONE ACCESS
echo ========================================================
echo.
netsh advfirewall firewall add rule name=" Vite Dev Server 5173\ dir=in action=allow protocol=TCP localport=5173
echo.
echo [OK] Port 5173 is now allowed!
echo Now on your Samsung phone, open: http://10.153.102.127:5173/
echo ========================================================
echo.
pause
