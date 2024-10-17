FROM confluentinc/cp-kafka-connect:7.7.0


# install connectors
RUN confluent-hub install --no-prompt debezium/debezium-connector-postgresql:2.5.4
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-protobuf-converter:7.7.0
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-avro-converter:7.7.0
