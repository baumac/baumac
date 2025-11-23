#!/bin/zsh

printf "-----------------------------------------\n"
printf "Emptying the avro outbox table \n"
docker exec event-outbox-db-1 psql -h localhost -p 5432 -U postgres postgres -c "TRUNCATE avro_event_outbox;"

 printf "Sending avro event \n"
 docker exec event-outbox-db-1 psql -h localhost -p 5432 -U postgres postgres -c "INSERT INTO avro_event_outbox (id, event_key, event_topic, event) VALUES ('6c3604bd-7707-437e-b7b0-807045627507', 'eventKey', 'avro-poc-entityA', json_build_object('id', '1'));"
