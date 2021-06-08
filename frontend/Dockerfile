# Install Node Image
FROM node:15 as client

# Create app directory
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build

# Build nginx server
FROM nginx:latest
COPY --from=client /usr/src/app/dist/ /var/www/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
