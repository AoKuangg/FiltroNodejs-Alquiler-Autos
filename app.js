import dotenv from "dotenv";
import express from "express";
import appClientes from "./routers/Clientes.js";
import appAutos from "./routers/Autos.js";
import appAlquiler from "./routers/Alquiler.js";
import appReserva from "./routers/Reserva.js";
dotenv.config();

const AlquilerApp = express();
AlquilerApp.use(express.json());



AlquilerApp.use("/clientes",appClientes);
AlquilerApp.use("/autos",appAutos);
AlquilerApp.use("/alquiler",appAlquiler);
AlquilerApp.use("/reserva",appReserva);


let config = JSON.parse(process.env.MY_CONFIG);
AlquilerApp.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});