# Event Outbox

Experiment containing a postgres db, kafka cluster, confluent-schema registry, and debezium that proves out the flow of
writing an event in JSON format to an event_outbox table, and having Debzium validated the message and write it to a Kafka topic.

## Usage

### Step 1: start services

```bash
docker-compose up
```

### Step 2: Run Setup script

Init the connectors, database, and schemas

```zsh
./scripts/init_schemas.sh
./scripts/init_connectors.sh
./scripts/init_database.sh
```

### Step 3: Try it out

The below script writes a row to the event outbox table which will then be picked up by the Protobuf connector sent to the Kafka topic.

```zsh
./scripts/send_avro_event
```

The below script writes a row to the event outbox table which will then be picked up by the Avro connector sent to the Kafka topic.

```zsh
./scripts/send_protobuf_event
```
