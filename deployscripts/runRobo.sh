#!/bin/bash

PURPLE='\033[0;35m'
NC='\033[0m' # No Color

cd RobotDoc

printf "${PURPLE}####    CHECKOUT BACKEND-DEPLOY BRANCH    ####${NC}\n"
printf "\n"
git checkout backend-deploy

printf "\n"
printf "${PURPLE}####    Pulling latest changes    ####${NC}\n"
printf "\n"

git pull

printf "\n"
printf "${PURPLE}####    Building and Running    ####${NC}\n"
printf "\n"

sudo docker-compose up -d --force-recreate --remove-orphans --build

printf "\n"
printf "${PURPLE}####    Containers Running    ####${NC}\n"
printf "\n"

sudo docker ps

printf "\n"
printf "${PURPLE}####    Cleaning old images    ####${NC}\n"
printf "\n"

sudo docker image prune -f

printf "\n"
printf "${PURPLE}####    FRONTEND running on: http://13.69.50.227:8080/    ####${NC}\n"
printf "${PURPLE}####    BACKEND  running on: http://13.69.50.227:8081/    ####${NC}\n"
printf "\n"
