# Stage 1: Build the React Application
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files to install dependencies first (caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app (creates the 'dist' folder)
RUN npm run build

# Stage 2: Serve the App with Nginx
FROM nginx:alpine

# Copy the build output from Stage 1 to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]