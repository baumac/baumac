# Debezium outbox event POC

POC containing a postgres db, kafka cluster, confluent-schema registry, and debezium that proves out the flow of
writing an event to the "event_outbox" table in Protobuf bytes and having Debezium validate the message and write it to a Kafka topic.

## Usage

### Step 1: start services

```bash
docker-compose -f compose.yaml up
```

### Step 2: Run Setup script

Init the schema and converter

```zsh
./scripts/init_schema.sh
./scripts/init_connector.sh
```

### Step 3: Try it out

#### Case 1: send valid event

```zsh
./send_valid_event
```

#### Case 2: send invalid event

```zsh
./send_invalid_event
```
