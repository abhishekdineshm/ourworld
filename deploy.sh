#!/bin/bash

    # --- Configuration ---
    PROJECT_DIR="/home/ec2-user/ourworld"
    # ---------------------

    echo "========================================"
    echo "🚀 Starting Deployment for OurWorld"
    echo "========================================"

    # 1. Navigate to the project folder
    if [ -d "$PROJECT_DIR" ]; then
      cd "$PROJECT_DIR"
      echo "✅ Navigated to $PROJECT_DIR"
    else
      echo "❌ Error: Directory $PROJECT_DIR not found."
      exit 1
    fi

    # 2. Force Git Pull (Overwrites local changes to match GitHub)
    echo "📥 Fetching latest code from GitHub..."
    git fetch origin
    git reset --hard origin/main

    if [ $? -eq 0 ]; then
      echo "✅ Code updated successfully."
    else
      echo "❌ Error: Git pull failed."
      exit 1
    fi

    # 3. Install Dependencies
    echo "📦 Installing/Updating dependencies..."
    npm install
    
    # 4. Build the Application
    echo "🏗️  Building the React application..."
    npm run build

    if [ $? -eq 0 ]; then
      echo "✅ Build successful."
    else
      echo "❌ Error: Build failed."
      exit 1
    fi

    # 5. Fix Permissions for Nginx
    echo "🔒 Fixing file permissions for Nginx..."
    chmod -R 755 dist/

    # 6. Reload Nginx to serve new files
    echo "🔄 Reloading Nginx server..."
    sudo systemctl reload nginx

    echo "========================================"
    echo "🎉 DEPLOYMENT COMPLETE!"
    echo "   Visit https://ourworld.elevensquare.fun"
    echo "========================================"