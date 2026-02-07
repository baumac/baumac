# DNS

DNS stack for the homelab

## Containers

### PiHole

Self Hosted DNS Server

### Unbound

Recursive DNS resolver

## Getting Started

1. Update the compose.yaml file
2. Start the stack with `docker compose -f compose.yaml up -d`
3. Update the unbound.conf
    a. Update the `0.0.0.0@53` line to be `0.0.0.0@5053`
    b. Remove the `LOCAL ZONE` and `FORWARD ZONE` sections
4. Try it out nslookup google.com ${UNBOUND_IP}