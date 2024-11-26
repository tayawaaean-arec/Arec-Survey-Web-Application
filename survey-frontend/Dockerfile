# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

EXPOSE 3000  
   
# Build the application
RUN npm run build

# Start the application
CMD [ "npm", "run", "start" ]