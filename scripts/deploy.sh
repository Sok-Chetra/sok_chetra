#!/bin/bash

# Navigate to the project directory
cd /var/www/html/sok_chetra

# Print the current status
echo "Rebuilding and restarting PM2 process..."

# Pull the latest code (optional, if you are using git)
# git pull origin main

# Build the Next.js app (only if needed)
echo "Building Next.js app..."
npm run build

# Restart the existing PM2 process (using the correct app name "sok_chetra")
pm2 restart sok_chetra || echo "No PM2 app found with name sok_chetra"

# Print the current status of PM2
pm2 status

# Optionally, you can also restart Apache if you want to make sure everything is up to date
# echo "Restarting Apache..."
# sudo systemctl restart apache2

echo "Deployment complete!"
