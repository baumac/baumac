# Guiding Principles

1. Each app in the ./apps dir:
    1. must run inside a docker container
    2. must be deployable to a kubernetes cluster via ArgoCd. To achieve this they must:
       1. must contain helm deployment instructions in ${app}/deploy
       2. must contain argo deployment instructions ${app}/deploy/argocd-app.yaml
    3. must be runnable locally using docker-compose
    4. must supply its own openapi spec and commands for creating a client

2. Each infra component in the infra dir:
    1. must only rely on other files in infra/*
