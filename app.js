import dotenv from "dotenv";
import express from "express";
dotenv.config();

const AlquilerApp = express();
AlquilerApp.use(express.json());




let config = JSON.parse(process.env.MY_CONFIG);
AlquilerApp.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});