# Cloudflared Caddy

Docker compose networking example that exposes services to the internet via subdomains using a reverse proxy 
without the need for a public IP address

## Containers

### Caddy

Used for reverse proxying requests from the internet to services (and enforcing TLS)

### Cloudflared

Used for exposing services to the internet without the need for a public IP address

### Whoami

Used for demoing the routing via subdomain

## Try It out

1. Write your cloud flare tunnel token to `cloudflared_tunnel_token.txt`
2. Replace the `whoami.localhost` domain in `caddyfile`
3. Start the services with `docker compose up`
4. Call the whoami service via caddy ` curl -v https://whoami.localhost --cacert ./volumes/caddy_data/caddy/pki/authorities/local/root.crt`
5. Call the whoami service via your domain `curl mydomain.com`
    - Note: this request will be routed via the cloudflared -> caddy -> whoami container
    - Note: this step is untested because I never acquired a custom domain to test with