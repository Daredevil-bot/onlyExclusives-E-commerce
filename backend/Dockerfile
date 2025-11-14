# ------------------------------
# Stage 1: Build environment
# ------------------------------
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your backend code
COPY . .

# Expose the port your Express app runs on
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
