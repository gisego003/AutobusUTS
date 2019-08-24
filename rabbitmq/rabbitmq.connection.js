
const configs = require("./rabbitmq.configs");
const rabbitmq = require("amqplib/callback_api");

global.connection = { connection: {}, channel: {} };

let promesa = new Promise((resolve, reject) => {

    try {
        rabbitmq.connect(configs.connection, (err, connection) => {
            if (err) {
                console.error("Error de conexion", err);
                throw err;
            }
            global.connection.connection = connection;
            global.connection.connection.createChannel((err1, channel) => {
                if (err1) {
                    console.error("Error de conexion", err);
                    throw err1;
                }
                global.connection.channel = channel;
                resolve();
            });
        });
    } catch (error) {
        reject(error);
    }
});
promesa
    .then(
        x => {

        // require("./rabbitmq/producers/test.producer");
        // require("./rabbitmq/consumers/test1.consumer");
        // require("./rabbitmq/consumers/test2.consumer");
        // let actualizarAlumnoConsumer = new (require("./consumers/actualizarAlumno.consumer"))();
        // actualizarAlumnoConsumer.connectToQueue()
        // let actualizarAutobusConsumer = new (require("./consumers/actualizarAutobus.consumer"))();
        // actualizarAutobusConsumeractualizarAlumnoConsumer.connectToQueue()
    })
    .catch(x => {
        console.log(x);

    })

module.exports = promesa;