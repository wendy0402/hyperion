var Kafka = require('no-kafka');
var producer = new Kafka.Producer({connectionString: 'localhost:9091', clientId: 'test-node'});

return producer.init().then(function(){
  return producer.send({
      topic: 'kafka-test-topic-node',
      partition: 0,
      message: {
          value: '{awesome nameee is awesome11}'
      }
  });
})
.then(function (result) {
  /*
  [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
  */

  console.log(result);
    process.exit();
});
