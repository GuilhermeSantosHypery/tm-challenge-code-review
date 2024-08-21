#!/bin/bash

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 268770146307.dkr.ecr.us-east-1.amazonaws.com

docker compose up -d