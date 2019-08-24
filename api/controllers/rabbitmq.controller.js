const EventProducer = require('../../rabbitmq/producers/eventProducer.producer');
const rabbitmqConfigs = require("../../rabbitmq/rabbitmq.configs");

class RabbitmqController {
    get(req, res) {
        try {
            
            global.connection.channel.assertExchange(rabbitmqConfigs.exchanges.my_exchange, 'fanout', {
                durable: true
            });
            global.connection.channel.publish(rabbitmqConfigs.exchanges.my_exchange, 'my_exchange', Buffer.from("Hola mundo"));

            res.status(200).json({ message: "Evento publicado" })
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    testExchange(req, res) {
        let body = req.body;
        try {
            let eventProducer= new EventProducer();
            eventProducer.publish(body.msg,body.exchange, body.routerkey);
            res.status(200).json({ message: "Evento publicado" })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = RabbitmqController;