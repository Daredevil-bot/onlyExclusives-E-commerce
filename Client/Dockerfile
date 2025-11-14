# ------------------------------
# Stage 1: Build React app
# ------------------------------
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
# use legacy-peer-deps so npm won't fail on incompatible peer deps
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ------------------------------
# Stage 2: Serve React app with Nginx
# ------------------------------
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for web access
EXPOSE 80

# Default Nginx start command
CMD ["nginx", "-g", "daemon off;"]
