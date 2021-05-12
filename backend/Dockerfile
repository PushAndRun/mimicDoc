FROM node:15    

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Only for Production
# RUN npm ci --only=production

# Copy app source
COPY . .

# Open Port
EXPOSE 8081

#Run
CMD [ "node", "server.js" ]