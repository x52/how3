# Use the official Node.js image with version 16.20.0 as the base
FROM node:16.20.0

ENV PORT=3000
ENV MONGODB_URI=mongodb://localhost:27017/how3
ENV JWT_SECRET=secretWizardLizardMonitorEntropyAligator
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or any other port your Express app is listening on)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
