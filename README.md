# Algorithms Slackbot

Posts algorithm questions to slack every weekday morning.

## Scrape Links for Algorithm Questions

1. Set environment variables: `source ./setenv.sh gregjohnson-bucket us-west-2 slackbots`.
2. Run docker image to scrape links: `docker-compose up -d`.
3. Check links are in `s3://<S3_BUCKET>/<S3_PREFIX>/urls.txt`.


## Deploy

1. Build the docker image: `docker-compose build`.
2. Push the docker image to AWS ECR: `./upload_ecr.sh`.
3. Deploy the docker image to ECS Fargate with the AWS Console (TODO: terraform).
