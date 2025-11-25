# Networking

Networking stack for the homelab

## Containers

### Caddy

Used for reverse proxying requests to services and enforcing TLS

### Tailscale

Used for remote access to the homelab network

## Getting Started

1. Start the stack with `docker compose -f compose.yaml up -d`
2. Add the caddy root ca to your system's trust store
    - Add the caddy cert located at `./volumes/caddy_data/caddy/pki/authorities/local/root.crt` to your system's trust store ([Ubuntu instructions](https://documentation.ubuntu.com/server/how-to/security/install-a-root-ca-certificate-in-the-trust-store/#install-a-pem-format-certificate))
3. Try it out `curl https://localhost`