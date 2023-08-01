#!/bin/sh
# build_and_start.sh

# build the docker image
sudo docker compose build

# stop current running containers
sudo docker compose down

# start the services
sudo docker compose up -d
