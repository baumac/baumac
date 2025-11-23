#!/bin/zsh
printf "-----------------------------------------\n"
printf "Creating the protobuf-poc-entityA-value schema \n"
curl -X PUT -H "Content-Type: application/json" http://localhost:8081/mode/protobuf-poc-entityA-value -d '{"mode": "IMPORT"}'

curl -X POST -H "Content-Type: application/json" "http://localhost:8081/subjects/protobuf-poc-entityA-value/versions?normalize=true" \
 -d '{
        "schemaType": "PROTOBUF",
        "version":1,
        "id":1,
        "schema": "syntax = \"proto3\";\r\n\r\nmessage PocEvent {\r\n        string id = 1;\r\n\r\n}"
    }'

curl -X PUT -H "Content-Type: application/json" http://localhost:8081/mode/protobuf-poc-entityA-value \
 -d '{"mode": "READWRITE"}'

printf "-----------------------------------------\n"
printf "Creating the avro-poc-entityA-value schema \n"
curl -X PUT -H "Content-Type: application/json" http://localhost:8081/mode/avro-poc-entityA-value -d '{"mode": "IMPORT"}'

curl -X POST -H "Content-Type: application/json" "http://localhost:8081/subjects/avro-poc-entityA-value/versions?normalize=true" \
 -d '{
        "schemaType": "AVRO",
        "version":1,
        "id":2,
        "schema": "{\"type\":\"record\",\"name\":\"event\",\"fields\":[{\"name\":\"id\",\"type\":\"string\"}]}"
    }'

curl -X PUT -H "Content-Type: application/json" http://localhost:8081/mode/avro-poc-entityA-value \
 -d '{"mode": "READWRITE"}'
