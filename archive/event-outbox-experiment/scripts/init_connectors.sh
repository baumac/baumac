#!/bin/zsh
printf "-----------------------------------------\n"
printf "Creating protobuf outbox connector \n"
docker exec event-outbox-connect-1 curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d '{
    "name": "protobuf-outbox-connector",
    "config": {
      "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
      "tasks.max": "1",
      "database.hostname": "db",
      "database.port": "5432",
      "database.user": "postgres",
      "database.password": "postgres",
      "database.dbname": "postgres",
      "database.server.name": "dbserver1",
      "errors.log.enable": "true",
      "errors.log.include.messages": "true",
      "table.include.list": "public.protobuf_event_outbox",
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
      "topic.prefix": ".",
      "slot.name" : "protobuf_connector"
    }
}'

printf "-----------------------------------------\n"
printf "Creating avro outbox connector \n"
docker exec event-outbox-connect-1 curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d '{
    "name": "avro-outbox-connector",
    "config": {
      "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
      "tasks.max": "1",
      "database.hostname": "db",
      "database.port": "5432",
      "database.user": "postgres",
      "database.password": "postgres",
      "database.dbname": "postgres",
      "database.server.name": "dbserver1",
      "errors.log.enable": "true",
      "errors.log.include.messages": "true",
      "table.include.list": "public.avro_event_outbox",
      "transforms": "outbox",
      "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
      "transforms.outbox.route.topic.replacement": "${routedByValue}",
      "transforms.outbox.route.by.field": "event_topic",
      "transforms.outbox.table.expand.json.payload": "true",
      "transforms.outbox.table.field.event.id": "id",
      "transforms.outbox.table.field.event.key": "event_key",
      "transforms.outbox.table.field.event.payload": "event",
      "value.converter": "io.confluent.connect.avro.AvroConverter",
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
      "topic.prefix": ".",
      "slot.name" : "avro_connector"
    }
}'
