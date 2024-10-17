#!/bin/zsh

printf "-----------------------------------------\n"
printf "Emptying the protobuf outbox table \n"
docker exec event-outbox-db-1 psql -h localhost -p 5432 -U postgres postgres -c "TRUNCATE protobuf_event_outbox;"

 printf "Sending protobuf event \n"
 docker exec event-outbox-db-1 psql -h localhost -p 5432 -U postgres postgres -c "INSERT INTO protobuf_event_outbox (id, event_key, event_topic, event) VALUES ('6c3604bd-7707-437e-b7b0-807045627507', 'eventKey', 'protobuf-poc-entityA', json_build_object('id', '1'));"
