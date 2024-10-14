# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./ 
RUN pnpm install --frozen-lockfile

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN pnpm run build

# Stage 2: Production Stage
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./ 
RUN pnpm install --production --frozen-lockfile

# Copy the Next.js build from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production

# Expose the Next.js port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
