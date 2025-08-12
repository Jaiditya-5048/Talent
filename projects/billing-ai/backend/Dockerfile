# Use official Node.js LTS image
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose backend port
EXPOSE 4000

# Start NestJS app
CMD ["npm", "run", "start:prod"]
