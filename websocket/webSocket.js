
var io = require('socket.io')(global.server);
const configs = require("../rabbitmq/rabbitmq.configs");
const eventProducer = new (require("../rabbitmq/producers/eventProducer.producer"))();
let allClients=[];
io.on('connection', (ws) => {
    allClients.push(ws);
    console.log('a user is connected', ws);
    // ws.on("setUser", (user) => {

    //     // ws.on(`${configs.exchanges.autobusUTS.nombre}.${user._id}`, (data) => {
    //     //     // let routingKey = "";
    //     //     // if (user.tipo === "Alumno")
    //     //     //     routingKey = configs.exchanges.autobusUTS.routingKey.actualizarCamion;
    //     //     // else
    //     //     //     routingKey = configs.exchanges.autobusUTS.routingKey.actualizarAlumno;

    //     //     // eventProducer.publish(data, configs.exchanges.autobusUTS.nombre, routingKey);
    //     // });
    //     // if(user.tipo==="Alumno"){
    //     //     ws.on("ActualizarCamion",(data)=>{

    //     //     });
    //     // }
    //     // else if(user.tipo==="Chofer"){
    //     //     ws.on("ActualizarAlumno",(data)=>{

    //     //     });
    //     // }
    // });


    ws.on("ActualizarAlumnoServer",(data)=>{
        console.log("ActualizarAlumnoServer", data);
        io.emit("ActualizarAlumnoCliente", data);
    });
    ws.on("ActualizarCamionServer",(data)=>{
        console.log("ActualizarAlumnoServer", data);
        io.emit("ActualizarCamionCliente", data);
    });


    ws.on('disconnect', ()=> {
        console.log('Got disconnect!');
  
        var i = allClients.indexOf(ws);
        allClients.splice(i, 1);
     });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var io = require('socket.io')(server);

// io.on('connection', (ws) => {
//     console.log('a user is connected', ws);
//     // ws.on("setUser", (user)=>{
//     //     if(user.tipo==="Alumno"){
//     //         ws.on("ActualizarCamion",()=>{

//     //         });
//     //     }
//     //     else if(user.tipo==="Chofer"){
//     //         ws.on("ActualizarAlumno",()=>{

//     //         });
//     //     }
//     // });
//     ws.on("ActualizarAlumno",(data)=>{
//         console.log("ActualizarAlumno", data);
//     });
//     ws.on("ActualizarCamion",(data)=>{
//         console.log("ActualizarCamion", data);

//     });
// });