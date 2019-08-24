const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const router = require("./router/router");
const requestConfigs = require("./request.configs");
require("./api/persistence/dbconnection");
// const rabbitMqConnection = require("./rabbitmq/rabbitmq.connection")

const app = express();

const port = 8090;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'abcd1234'}));
app.use(requestConfigs.setHeaders);

app.use("/", router);

const server = app.listen(port, () => {
    console.log(`Servidor conrriendo en el puerto ${port}`);
});
global.server = server;

require("./websocket/webSocket");
//  var http = require('http').Server(app);



// app.listen()

