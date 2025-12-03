FROM node:16

WORKDIR /usr/src/app

# Copy root package files
COPY package.json yarn.lock ./

# Install root dependencies
RUN yarn install --production=false

# Copy www package files first for better caching
COPY www/package.json www/yarn.lock ./www/

# Install frontend dependencies (including webpack-cli)
WORKDIR /usr/src/app/www
RUN yarn install --production=false

# Copy all source files
WORKDIR /usr/src/app
COPY . .

# Build frontend
RUN cd www && yarn build

# Set production environment
ENV NODE_ENV=production

# Expose the application port
EXPOSE 8080

# Start the application
CMD [ "node", "src/index.js" ]
