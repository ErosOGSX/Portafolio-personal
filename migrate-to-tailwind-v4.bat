@echo off
echo Migrating to Tailwind CSS v4...
echo.

echo Removing old dependencies...
pnpm remove postcss autoprefixer tailwindcss

echo Installing Tailwind CSS v4...
pnpm add -D tailwindcss@next @tailwindcss/vite@next

echo.
echo Migration complete! 
echo.
echo Next steps:
echo 1. Run 'pnpm install' to ensure all dependencies are properly installed
echo 2. Run 'pnpm run dev' to start the development server
echo 3. Check that all styles are working correctly
echo.
pause