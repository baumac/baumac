

# Manifesto

1. Each app in the apps dir:
   1. must produce a docker container
   2. must contain deployment instructions as raw k8s yaml in appname/deploy
   3. must accept configuration via environment variables
2. Each infra component in the infra dir:
   1. must only rely on other files in infra/* (infra must be decoupled from all other directories)
   2. 
