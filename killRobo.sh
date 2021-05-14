#!/bin/bash

PURPLE='\033[0;35m'
NC='\033[0m' # No Color

cd RobotDoc

printf "${PURPLE}####    Stopping all running containers    ####${NC}\n"
printf "\n"
sudo docker kill $(sudo docker ps -q)

printf "\n"
printf "${PURPLE}####    Done :)    ####${NC}\n"
printf "\n"
