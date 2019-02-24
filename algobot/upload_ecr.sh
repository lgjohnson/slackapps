#!/usr/bin/env bash

REPO_URI=119459060071.dkr.ecr.us-west-2.amazonaws.com/slack-repository

docker tag algobot $REPO_URI

DOCKER_LOGIN_CMD=$(aws ecr get-login --no-include-email)

eval $DOCKER_LOGIN_CMD

docker push $REPO_URI
