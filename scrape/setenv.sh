#!/usr/bin/env bash

# USAGE:
#   `source setenv.sh gregjohnson-bucket us-west-2 slackbots`

export SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
export ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export S3_BUCKET=$1
export S3_BUCKET_REGION=$2
export S3_PREFIX=$3

