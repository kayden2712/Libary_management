@echo off
REM ================================
REM Chạy Spring Boot (Backend) và React (Frontend)
REM ================================

REM Lấy đường dẫn thư mục hiện tại (thư mục chứa file .bat)
set "ROOT=%~dp0"

REM ------------------------------
REM 1. Chạy Spring Boot Backend
REM ------------------------------
echo Starting Spring Boot backend...
start cmd /k "cd /d %ROOT%Backend && mvnw.cmd spring-boot:run"

REM ------------------------------
REM 2. Chạy React Frontend
REM ------------------------------
echo Starting React frontend...
start cmd /k "cd /d %ROOT%Frontend && npm start"

echo ===============================
echo  All services started!
echo ===============================
pause
