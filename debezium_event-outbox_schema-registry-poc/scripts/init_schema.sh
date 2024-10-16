#!/bin/zsh
curl -X PUT -H "Content-Type: application/json" http://localhost:8081/mode/konnect.cloud-gateway-configurations.gea-poc-entityA-value -d '{"mode": "IMPORT"}'

# curl -X POST -H "Content-Type: application/json" http://localhost:8081/subjects/konnect.cloud-gateway-configurations.gea-poc-entityA-value/versions \
#  -d '{
#         "schemaType": "PROTOBUF",
#         "version":1, 
#         "id":1, 
#         "schema": "syntax = \"proto3\";\r\n\r\nimport \"google\/protobuf\/timestamp.proto\";\r\n\r\nmessage GeaPocEntityAEvent {\r\n  string id = 1;\r\n  string oid = 2;\r\n  string source = 3;\r\n  string specversion = 4;\r\n  string type = 5;\r\n  string datacontenttype = 6;\r\n  optional string dataschema = 7;\r\n  optional string subject = 8;\r\n  optional google.protobuf.Timestamp time = 9;\r\n  EntityAEventV1 data = 10;\r\n\r\n  message EntityAEventV1 {\r\n    EventV1 v1 = 1;\r\n  \r\n    message EventV1 {\r\n      string foo = 1;\r\n    }\r\n  }\r\n}" 
#     }'

curl -X POST -H "Content-Type: application/json" "http://localhost:8081/subjects/konnect.cloud-gateway-configurations.gea-poc-entityA-value/versions?normalize=true" \
 -d '{
        "schemaType": "PROTOBUF",
        "version":1, 
        "id":1, 
        "schema": "syntax = \"proto3\";\r\n\r\n\r\n\r\nmessage GeaPocEntityAEvent {\r\n  string id = 1;\r\n  string oid = 2;\r\n  string source = 3;\r\n  string specversion = 4;\r\n  string type = 5;\r\n  string datacontenttype = 6;\r\n  optional string dataschema = 7;\r\n  optional string subject = 8;\r\n\r\n  EntityAEventV1 data = 10;\r\n\r\n  message EntityAEventV1 {\r\n    EventV1 v1 = 1;\r\n  \r\n    message EventV1 {\r\n      string foo = 1;\r\n    }\r\n  }\r\n}" 
    }'

curl -X PUT -H "Content-Type: application/json" http://localhost:8081/mode/konnect.cloud-gateway-configurations.gea-poc-entityA-value \
 -d '{"mode": "READWRITE"}' 
