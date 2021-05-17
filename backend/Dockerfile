FROM node:15-buster

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN file="$(apt-get update && \
            apt-get install -y apt-utils && \
            apt-get install -y curl && \
            apt-get update && \
            apt-get install -y software-properties-common && \
            apt-get update && \
            add-apt-repository ppa:deadsnakes/ppa -y && \
            apt update && \
            apt install -y python3.7 && \
            curl https://bootstrap.pypa.io/get-pip.py | python3.7 &&\
            apt-get update)" && echo $file
RUN pip3 --version
RUN python3.7 -m pip install pandas
RUN python3.7 -m pip install --no-cache-dir tensorflow
RUN npm install

# Only for Production
# RUN npm ci --only=production

# Copy app source
COPY . .

# Open Port
EXPOSE 8081

#Run
CMD [ "node", "server.js" ]