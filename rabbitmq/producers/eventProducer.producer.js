
//const configs = require("../rabbitmq.configs");
//const rabbitmq = require("amqplib/callback_api");




class EventProducer{

  publish(msg, exchange, routerkey){
    // rabbitmq.connect(configs.connection, (err, connection)=>{
    //   if(err){
    //       console.error("Error de conexion", err);
    //       throw err;
    //   }
    //   connection.createChannel((err1, channel)=>{
    //       if(err1){
    //           console.error("Error de conexion", err);
    //           throw err1;
    //       }
  
    //       // const msg = "Hola mundo";
          
    global.connection.channel.assertExchange(exchange.nombre, exchange.tipo,{
              durable:true
          });
          if(typeof(msg)!==String)
          {
            msg = JSON.stringify(msg);
          }
          global.connection.channel.publish(exchange.nombre, routerkey, Buffer.from(msg));
          //connection.close(x=> console.log(x))
          // console.log(connection);
//       })
//   });
  }

}

module.exports = EventProducer;


// const configs = require("../rabbitmq.configs");

// const rabbitmq = require("amqplib");

// const open = rabbitmq.connect(configs.connection);

// open.then((conn) => {
//     return conn.createChannel();
// })
//     .then((channel) => {
//         return channel.assertQueue(configs.queues.task)
//             .then(ok => {
//                 return channel.sentToQueue(configs.queues.task, Buffer.from("Somenting to do"));
//             });
//     })
//     .catch(x => console.warn("Error en producer", x));

// console.log("test.producer iniciado");

// var q = 'tasks';

// var open = require('amqplib').connect('amqp://localhost');

// // Publisher
// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue(q).then(function(ok) {
//     return ch.sendToQueue(q, Buffer.from('something to do'));
//   });
// }).catch(console.warn);

// // function initProducer(){

// // }

// // module.exports = initProducer;

// var amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'logs';
//         var msg = process.argv.slice(2).join(' ') || 'Hello World!';

//         channel.assertExchange(exchange, 'fanout', {
//             durable: false
//         });
//         channel.publish(exchange, '', Buffer.from(msg));
//         console.log(" [x] Sent %s", msg);
//     });

//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });

// var amqp = require('amqp');
// var connection = amqp.createConnection({ host: "localhost", port: 5672 });
// var count = 1;

// connection.on('ready', function () {
//   connection.exchange("my_exchange.*", options={type:'fanout'}, function(exchange) {   

//     var sendMessage = function(exchange, payload) {
//       console.log('about to publish')
//       var encoded_payload = JSON.stringify(payload);
//       exchange.publish('', encoded_payload, {})
//     }

//     // // Recieve messages
//     // connection.queue("my_queue_name", function(queue){
//     //   console.log('Created queue')
//     //   queue.bind(exchange, ''); 
//     //   queue.subscribe(function (message) {
//     //     console.log('subscribed to queue')
//     //     var encoded_payload = unescape(message.data)
//     //     var payload = JSON.parse(encoded_payload)
//     //     console.log('Recieved a message:')
//     //     console.log(payload)
//     //   })
//     // })

//     setInterval( function() {    
//       var test_message = 'TEST '+count
//       sendMessage(exchange, test_message)  
//       count += 1;
//     }, 2000) 
//  })
// })