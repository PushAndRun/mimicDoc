FROM node:15    

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN apt-get update
RUN apt-get --assume-yes install software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get --assume-yes install -y python3.5 python3-venv python3-pip
RUN python3.5 -m pip install pip
RUN pip3 --version
RUN python3.5 -m pip install pandas
RUN python3.5 -m pip install --no-cache-dir tensorflow
RUN npm install

# Only for Production
# RUN npm ci --only=production

# Copy app source
COPY . .

# Open Port
EXPOSE 8081

#Run
CMD [ "node", "server.js" ]