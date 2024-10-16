#!/bin/zsh   
printf "-----------------------------------------\n"     
printf "create debezeium connector \n"

# Uncomment to create converter with binary delegate converter
# docker exec outbox-poc-connect-1 curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d '{
#     "name": "outbox-connector",
#     "config": {
#       "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
#       "tasks.max": "1",
#       "database.hostname": "db",
#       "database.port": "5432",
#       "database.user": "postgres",
#       "database.password": "postgres",
#       "database.dbname": "postgres",
#       "database.server.name": "dbserver1",
#       "table.include.list": "public.event_outbox",
#       "transforms": "outbox",
#       "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
#       "transforms.outbox.route.topic.replacement": "${routedByValue}",
#       "transforms.outbox.route.by.field": "event_topic",
#       "transforms.outbox.table.expand.json.payload": "false",
#       "transforms.outbox.table.field.event.id": "id",
#       "transforms.outbox.table.field.event.key": "event_key",
#       "transforms.outbox.table.field.event.payload": "event",
#       "value.converter": "io.debezium.converters.BinaryDataConverter",
#       "value.converter.schemas.enable": "true",
#       "value.converter.delegate.converter.type": "io.confluent.connect.protobuf.ProtobufConverter",
#       "value.converter.delegate.converter.type.schemas.enable": "true",
#       "value.converter.delegate.converter.type.subject.name.strategy": "TopicNameStrategy",
#       "value.converter.delegate.converter.type.schema.registry.url": "http://schema-registry:8081",
#       "value.converter.delegate.converter.type.auto.register.schemas": "false",
#       "value.converter.delegate.converter.type.use.latest.version": "true",
#       "value.converter.delegate.converter.type.normalize.schemas": "true",
#       "value.converter.delegate.converter.type.latest.compatibility.strict": "true",
#       "key.converter": "org.apache.kafka.connect.storage.StringConverter",
#       "key.converter.schemas.enable": "false",
#       "key.ignore": "true",
#       "topic.prefix": "."
#     }
# }'

docker exec outbox-poc-connect-1 curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d '{
    "name": "outbox-connector-2",
    "config": {
      "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
      "tasks.max": "1",
      "database.hostname": "db",
      "database.port": "5432",
      "database.user": "postgres",
      "database.password": "postgres",
      "database.dbname": "postgres",
      "database.server.name": "dbserver1",
      "table.include.list": "public.event_outbox",
      "transforms": "outbox",
      "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
      "transforms.outbox.route.topic.replacement": "${routedByValue}",
      "transforms.outbox.route.by.field": "event_topic",
      "transforms.outbox.table.expand.json.payload": "true",
      "transforms.outbox.table.field.event.id": "id",
      "transforms.outbox.table.field.event.key": "event_key",
      "transforms.outbox.table.field.event.payload": "event",
      "value.converter": "io.confluent.connect.protobuf.ProtobufConverter",
      "value.converter.schemas.enable": "true",
      "value.converter.subject.name.strategy": "TopicNameStrategy",
      "value.converter.schema.registry.url": "http://schema-registry:8081",
      "value.converter.auto.register.schemas": "false",
      "value.converter.use.latest.version": "true",
      "value.converter.normalize.schemas": "true",
      "value.converter.latest.compatibility.strict": "false",
      "key.converter": "org.apache.kafka.connect.storage.StringConverter",
      "key.converter.schemas.enable": "false",
      "key.ignore": "true",
      "topic.prefix": "."
    }
}'
