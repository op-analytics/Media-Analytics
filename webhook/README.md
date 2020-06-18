# What is this?
This is the configuration and scripts required to get our CD working in the prod server

# What does it do?
It allows us to run a web server that will redeploy our app every time it gets a
valid webhooks request

# How do you get it working
1. Github side setup
  - Create webhooks for the events that you want to trigger the webhooks
  - Create a secret to put in the secret field. Keep note of its value and try to
    make it as long as possible
2. Server side setup
  - Install docker, docker-compose and webhooks on your server
  - Clone the repo
  - change the values of the command-working-directory fields to the location of the
    repo
  - change the values of the execute-command fields to the location of the
    respective scripts

# Why does this work
We have github actions setup that rebuild and publish the docker containers on
successful merges. After those merges we want to run the webhooks to redeploy
the app
