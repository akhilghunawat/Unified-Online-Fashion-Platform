@echo off
echo ========================================
echo   ClickKart - Dependency Checker
echo ========================================
echo.

set "error_found=0"

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js is NOT installed
    echo     Download from: https://nodejs.org/
    set "error_found=1"
) else (
    for /f "tokens=*" %%i in ('node --version') do set node_version=%%i
    echo [OK] Node.js %node_version% is installed
)

echo.
echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] npm is NOT installed
    set "error_found=1"
) else (
    for /f "tokens=*" %%i in ('npm --version') do set npm_version=%%i
    echo [OK] npm %npm_version% is installed
)

echo.
echo ========================================
echo   Checking Backend Dependencies
echo ========================================
if exist "backend\node_modules\" (
    echo [OK] Backend dependencies are installed
) else (
    echo [X] Backend dependencies NOT installed
    echo     Run: cd backend ^&^& npm install
    set "error_found=1"
)

if exist "backend\.env" (
    echo [OK] Backend .env file exists
) else (
    echo [!] Backend .env file NOT found
    echo     Create backend\.env with MongoDB connection
    echo     See MONGODB_SETUP.md for help
    set "error_found=1"
)

if exist "backend\uploads\images\" (
    for /f %%A in ('dir /b /a-d "backend\uploads\images\*.png" 2^>nul ^| find /c /v ""') do set img_count=%%A
    if !img_count! gtr 0 (
        echo [OK] Product images found: !img_count! files
    ) else (
        echo [!] No product images found
        echo     Images should be in backend\uploads\images\
    )
) else (
    echo [!] Images directory not found
    echo     Creating backend\uploads\images\
    mkdir "backend\uploads\images" 2>nul
)

echo.
echo ========================================
echo   Checking Frontend Dependencies
echo ========================================
if exist "frontend\node_modules\" (
    echo [OK] Frontend dependencies are installed
) else (
    echo [X] Frontend dependencies NOT installed
    echo     Run: cd frontend ^&^& npm install
    set "error_found=1"
)

echo.
echo ========================================
echo   Checking Admin Dependencies
echo ========================================
if exist "admin\node_modules\" (
    echo [OK] Admin dependencies are installed
) else (
    echo [X] Admin dependencies NOT installed
    echo     Run: cd admin ^&^& npm install
    set "error_found=1"
)

echo.
echo ========================================
echo   Summary
echo ========================================
if %error_found% equ 0 (
    echo [OK] All checks passed!
    echo.
    echo You can now:
    echo 1. Test MongoDB: cd backend ^&^& node test-connection.js
    echo 2. Seed database: cd backend ^&^& node seed.js
    echo 3. Start all: start-all.bat
) else (
    echo [!] Some issues found. Please fix them before running.
    echo.
    echo Quick fixes:
    echo - Install Node.js from https://nodejs.org/
    echo - Run: cd backend ^&^& npm install
    echo - Run: cd frontend ^&^& npm install
    echo - Run: cd admin ^&^& npm install
    echo - Create backend\.env file (see MONGODB_SETUP.md)
)

echo.
echo ========================================
pause
