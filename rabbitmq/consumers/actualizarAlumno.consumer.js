const configs = require("../rabbitmq.configs");
const rabbitmq = require("amqplib/callback_api");

class ActualizarAlumnoConsumer {

    connectToQueue(id) {
        // global.connection = { connection: {}, channel: {} };

        // rabbitmq.connect(configs.connection, (err, connection) => {
        //     if (err) {
        //         console.error("Error de conexion", err);
        //         throw err;
        //     }
        //     globalConnection.connection = connection;
        //     globalConnection.connection.createChannel((err1, channel) => {
        //         if (err1) {
        //             console.error("Error de conexion", err);
        //             throw err1;
        //         }
        //         globalConnection.channel = channel;


                let exchange = configs.exchanges.autobusUTS;
                global.connection.channel.assertExchange(exchange.nombre, 'direct', {
                    durable: true
                });

                const queueName = `${exchange.nombre}.${id}`;

                global.connection.channel.assertQueue(queueName, { exchange: true, durable: true }, (err2, q) => {
                    if (err2) {
                        console.error("Error en assertQueue", err2);
                        throw err2;
                    }


                    global.connection.channel.bindQueue(q.queue, exchange.nombre, exchange.routingKey.actualizarAlumno);

                    global.connection.channel.consume(q.queue, (msg) => {
                        if (msg.content) {
                            console.log("ActualizarAlumno.consumer [x]% s", msg.content.toString());
                            global.connection.channel.ack(msg);
                        }
                    }, { noAct: true });
                });

        //     });
        // });



    }
}

module.exports = ActualizarAlumnoConsumer;