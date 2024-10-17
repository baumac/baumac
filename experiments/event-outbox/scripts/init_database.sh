#!/bin/zsh
printf "-----------------------------------------\n"
printf "Creating the protobuf outbox table if it does not already exist \n"
docker exec event-outbox-db-1 psql -h localhost -p 5432 -U postgres postgres -c "CREATE TABLE IF NOT EXISTS public.protobuf_event_outbox(id uuid NOT NULL constraint pk_protobuf_event_outbox_id primary key, event_topic varchar(255) NOT NULL, event_key varchar(64) NOT NULL, event jsonb NOT NULL);"

printf "-----------------------------------------\n"
printf "Creating the avro outbox table if it does not already exist \n"
docker exec event-outbox-db-1 psql -h localhost -p 5432 -U postgres postgres -c "CREATE TABLE IF NOT EXISTS public.avro_event_outbox(id uuid NOT NULL constraint pk_avro_event_outbox_id primary key, event_topic varchar(255) NOT NULL, event_key varchar(64) NOT NULL, event jsonb NOT NULL);"
