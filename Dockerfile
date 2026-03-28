# Use official Node.js slim image
FROM node:20-slim

# Install Chrome and dependencies Puppeteer needs
RUN apt-get update && apt-get install -y \
    wget gnupg2 ca-certificates \
    fonts-liberation libnss3 lsb-release xdg-utils \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Use system Chrome instead of Puppeteer’s Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV PORT=10000
EXPOSE 10000

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your project
COPY . .

# Run your app
CMD ["node", "index.js"]