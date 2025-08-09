# Docker-Compose Starter Kit

This starter kit provides a basic setup for running applications using Docker Compose in a production setting.

Notable features of this setup include:
- Traefik as a reverse proxy
  - handles routing of incoming requests to the correct application based on the request host
  - automatically handles certificates using Lets Encrypt
  - redirects all incoming HTTP requests to HTTPS
- Authelia as an authentication and authorization server
  - https://www.authelia.com/integration/prologue/get-started/#moving-to-production 
  - resume reading here https://www.authelia.com/integration/prologue/get-started/
  - traefik integration https://www.authelia.com/integration/proxies/traefik/

 
##  Quick Start
1. Copy `.env.example` to `.env` and fill it in
2. Create a dedicated production docker context:
   `docker context create production --docker "host=ssh://<username>@<hostname>"`
3. Change docker context to production context:
   `docker context use production`
4. Create an external network:
   `docker network create traefik-network`
5. Start docker compose setup:
   `docker compose up -f prod.yaml -d`

### Development Setup
To run this starter kit in a development setting, follow the quick start steps above, but use the `dev.yaml` compose file
instead of the `prod.yaml` file. This will:
- have Traefik not acquire real certificates from Lets Encrypt
- start Traefik with the debug logs enabled
- allow access to the Traefik admin dashboard

## Adding new apps/endpoints

To add a new app to the Traefik setup, add the docker network and apply the following labels to the container:
```
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.my-app-php.rule=Host(`www.example.com`)'
      - 'traefik.http.routers.my-app-php.entrypoints=websecure'
      - 'traefik.http.routers.my-app-php.tls.certresolver=myresolver'
      - 'traefik.http.services.my-app-php.loadbalancer.server.port=80'
    networks:
      - traefik-network
```

Note: each app must have a unique name and host to avoid conflicts with Traefik routing.

## TBD

If you want to add a new docker compose app and use Traefik for certificate handling and traffic redirection you
simply have to define the labels and networks in the projects own `docker-compose.production.yml` file as shown
in the example above and adapt is slightly. When the app is started on the production machine where Traefik is
already running Traefik will automatically detect the relevant docker container, create a certificate using
Lets Encrypt and start redirecting traffic to the newly deployed app. For this to work make sure to set up
corresponding DNS records so that the Lets Encrypt certificates can automatically obtained.
