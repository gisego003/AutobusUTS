const express = require("express");

const rabbitmqController = new (require("../api/controllers/rabbitmq.controller"))();
const usuarioController = new (require("../api/controllers/usuario.controller"))();

const router = express.Router();

router.get("/", (req,res)=>{
    res.status(200).json({message: "Servidor corriendo"})
})

const rabbitmqPath = "/rabbitmq";
router.get(`${rabbitmqPath}`, rabbitmqController.get);
router.post(`${rabbitmqPath}/testExchange`, rabbitmqController.testExchange);


const usuarioPath="/usuario";
router.get(`${usuarioPath}`, usuarioController.getAll);
router.get(`${usuarioPath}/:id`, usuarioController.getById);
router.post(`${usuarioPath}`, usuarioController.post);
router.post(`${usuarioPath}/login`, usuarioController.login);
router.put(`${usuarioPath}`, usuarioController.put);
router.delete(`${usuarioPath}`, usuarioController.delete);


module.exports = router;