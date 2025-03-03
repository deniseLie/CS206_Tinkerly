# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your app listens on (e.g., 3000)
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]