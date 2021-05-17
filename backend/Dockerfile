FROM node:15    

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN apt-get update
RUN apt-get install software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install -y python3.9
RUN python -m pip install pandas
RUN python -m pip install tensorflow
RUN npm3 install

# Only for Production
# RUN npm ci --only=production

# Copy app source
COPY . .

# Open Port
EXPOSE 8081

#Run
CMD [ "node", "server.js" ]