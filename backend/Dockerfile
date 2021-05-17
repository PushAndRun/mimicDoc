FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3.7 && ln -sf python3.7 /usr/bin/python
RUN python3.7 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
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