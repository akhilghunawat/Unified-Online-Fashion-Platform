@echo off
echo ========================================
echo   ClickKart - Starting All Services
echo ========================================
echo.

REM Check if MongoDB URL is configured
if not exist "backend\.env" (
    echo ERROR: backend\.env file not found!
    echo Please create backend\.env with your MongoDB connection string
    echo.
    echo Example:
    echo MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/clickkart
    echo JWT_SECRET=your_secret_key
    echo PORT=4000
    echo.
    pause
    exit /b 1
)

echo [1/3] Starting Backend Server...
start "ClickKart Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend...
start "ClickKart Frontend" cmd /k "cd frontend && npm start"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Admin Panel...
start "ClickKart Admin" cmd /k "cd admin && npm run dev"

echo.
echo ========================================
echo   All services are starting!
echo ========================================
echo.
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
