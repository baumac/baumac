# Observability

Observability stack for the homelab

## Containers

### Bezel Hub

Used for monitoring servers

### Bezel Agent

Used for communicating host server metrics to the hub

## Getting Started

Note: the following instructions are based on https://beszel.dev/guide/getting-started#getting-started

1. Start the hub with `docker compose up -f observability-hub-compose.yaml`
2. Navigate to https://observability.localhost and create an admin user
3. Via https://observability.localhost/ configure your first system and 
4. Save the docker key and secret to `bezel_agent_key.txt` and `bezel_agent_token.txt` respectively
5. Start the agent with `docker compose up -f observability-agent-compose.yaml` and verify that the agent appears in https://observability.localhost/

