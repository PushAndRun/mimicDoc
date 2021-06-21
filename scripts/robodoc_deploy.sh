#!/bin/bash

PURPLE='\033[0;35m'
NC='\033[0m' # No Color
dockercompose="robodoc/docker-compose.yml"
serverjs="robodoc/backend/server.js"
frontenddocker="robodoc/frontend/Dockerfile"
backenddocker="robodoc/backend/Dockerfile2"
nginx="robodoc/frontend/nginx.conf"

printf "\n"
printf "${PURPLE}####    RobotDoc    ####${NC}\n"
while true; do
    read -p "Do you wish to install the RoboDoc server on this machine? (y yes/n no) " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) echo "Good bye then!"; exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

printf "\n"
printf "${PURPLE}####   Downloading   ####${NC}\n"
printf "\n"

curl -LJ --header "PRIVATE-TOKEN: 9HbvSao-yKm4s-VH43gc" "https://git.tu-berlin.de/api/v4/projects/7844/repository/archive?sha=fe25a766" -o robodoc.tar.gz
printf "\n"
printf "${PURPLE}####    Extracting    ####${NC}\n"
printf "\n"

mkdir robodoc && tar -xvf robodoc.tar.gz -C robodoc --strip-components 1 && rm robodoc.tar.gz

printf "\n"
printf "${PURPLE}####  Configuration  ####${NC}\n"
printf "\n"

read -p "What port do you want the frontend to be run on? The Website will be running on this port. (e.g. 80) " frontendport
read -p "What port do you want the backend to be run on? This is your API Port. (e.g. 8081) " backendport

if [[ $backendport != "" && $frontendport != "" ]]; then
gsed -i "s/80:80/$frontendport:80/" $dockercompose
gsed -i "s/8081:8081/$backendport:8081/" $dockercompose
fi


printf "\n"
printf "${PURPLE}####  Run Robodoc in Docker  ####${NC}\n"
printf "\n"


cd robodoc || return

docker-compose up -d --build

printf "\n"
printf "${PURPLE}####  Started Containers  ####${NC}\n"
printf "\n"

docker ps | grep "robodoc"


printf "\n"
printf "${PURPLE}####  Done  ####${NC}\n"
printf "${PURPLE}####    FRONTEND running on Port $frontendport    ####${NC}\n"
printf "${PURPLE}####    BACKEND  running on Port $backendport    ####${NC}\n"
printf "\n"

