#!/bin/zsh 

printf "-----------------------------------------\n"     
printf "Creating the outbox table if it does not already exist \n"
# docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "create table if not exists public.event_outbox(id uuid not null constraint pk_event_outbox_id primary key, org_id uuid not null, type varchar(64) not null, created_at timestamp(3) with time zone default now() not null, entity_type varchar(255), entity_id varchar(255), event_topic varchar(255) not null, event_key varchar(64) not null, event bytea not null);" 

docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "DROP table public.event_outbox" 
docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "create table if not exists public.event_outbox(id uuid not null constraint pk_event_outbox_id primary key, org_id uuid not null, type varchar(64) not null, created_at timestamp(3) with time zone default now() not null, entity_type varchar(255), entity_id varchar(255), event_topic varchar(255) not null, event_key varchar(64) not null, event jsonb not null);" 


printf "Emptying the outbox table \n"
docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "TRUNCATE event_outbox;"

# printf "Sending valid event \n"
# docker exec outbox-poc-db-1 psql -h localhost -p 5432 -U postgres postgres -c "Insert into event_outbox (id, org_id, type, entity_type, entity_id, event_key, event_topic, event) values ('6c3604bd-7707-437e-b7b0-807045627507', '6c3604bd-7707-437e-b7b0-807045627507', 'GEA','test_entity_type', '1', 'eventKey', 'konnect.cloud-gateway-configurations.gea-poc-entityA', '\x0a2464306130393930382d643539662d343038392d383666372d643331663765356266376239122436666131353734642d326530332d343734662d383561302d6630303066303065393861301a1c636c6f75645f676174657761795f636f6e66696775726174696f6e732203312e302a14636c6f75645f676174657761793a64656c65746532106170706c69636174696f6e2f6a736f6e4a080882c6bdb806100052070a050a03626172'::bytea);"