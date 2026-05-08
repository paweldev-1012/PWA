#!/bin/bash
# Script to generate placeholder icons
# In production, replace with actual icons

mkdir -p /home/claude/foodrush/public/icons

# Create a simple SVG icon
cat > /tmp/icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#FF3008" rx="80"/>
  <text x="256" y="320" font-size="280" text-anchor="middle" fill="white" font-family="Arial Black, sans-serif" font-weight="900">F</text>
</svg>
EOF

echo "Icons placeholder created. Run: npx pwa-asset-generator icon.svg public/icons"
echo "Or use: https://maskable.app to generate proper PWA icons"
