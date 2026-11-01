#!/usr/bin/env bash
echo "========================================================"
echo "       Launching Strydex Community Portal"
echo "========================================================"
echo ""

if [ ! -d "node_modules" ]; then
    echo "[1/2] Installing dependencies..."
    npm install
else
    echo "[1/2] Dependencies already installed."
fi

echo ""
echo "[2/2] Starting development server..."
echo "Opening http://localhost:5173/ in browser..."
echo ""

if which xdg-open > /dev/null; then
  xdg-open http://localhost:5173/ &
elif which open > /dev/null; then
  open http://localhost:5173/ &
fi

npm run dev
