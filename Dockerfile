# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./ 
RUN npm install -g pnpm && pnpm install --frozen-lockfile


# Copy the rest of the app source code
COPY . .

ARG DB_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
ARG NEXT_PUBLIC_TWILIO_ACCOUNT_SID
ARG NEXT_PUBLIC_TWILIO_AUTH_TOKEN
ARG NEXT_PUBLIC_URL

# Use these variables in your app, or set them as environment variables
ENV DB_URL=$DB_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
ENV NEXT_PUBLIC_TWILIO_ACCOUNT_SID=$NEXT_PUBLIC_TWILIO_ACCOUNT_SID
ENV NEXT_PUBLIC_TWILIO_AUTH_TOKEN=$NEXT_PUBLIC_TWILIO_AUTH_TOKEN
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL


# Build the Next.js app
RUN pnpm run build

# Stage 2: Production Stage
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install only production dependencies
COPY package.json pnpm-lock.yaml* ./ 
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
CMD ["pnpm", "start"]
