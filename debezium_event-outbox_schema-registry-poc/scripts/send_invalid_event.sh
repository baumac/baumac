#!/bin/zsh 


printf "-----------------------------------------\n"     
printf "Creating the outbox table if it does not already exist \n"
docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "create table if not exists public.event_outbox(id uuid not null constraint pk_event_outbox_id primary key, org_id uuid not null, type varchar(64) not null, created_at timestamp(3) with time zone default now() not null, entity_type varchar(255), entity_id varchar(255), event_topic varchar(255) not null, event_key varchar(64) not null, event bytea not null);" 

printf "Emptying the outbox table \n"
docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "TRUNCATE event_outbox;"

printf "Sending invalid event \n"
docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "Insert into event_outbox (id, org_id, type, entity_type, entity_id, event_key, event_topic, event) values ('6c3604bd-7707-437e-b7b0-807045627507', '6c3604bd-7707-437e-b7b0-807045627507', 'GEA','test_entity_type', '1', 'eventKey', 'konnect.cloud-gateway-configurations.gea-poc-entityA', '\x0a03666f6f10011802'::bytea);"