FROM node:18

# Set working directory
WORKDIR /workspace

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Command to start dev server
CMD ["npm", "start"]
