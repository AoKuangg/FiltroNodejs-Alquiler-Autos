import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const appAutos = Router();

let con = undefined;
appAutos.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to the database")
   } 
});

appAutos.get("/",(req,res)=>{
    con.query(
        `SELECT a.ID_Automovil, a.Marca, a.Modelo, a.Anio, a.Tipo, a.Capacidad, a.Precio_Diario, q.Costo_Total, q.Estado
        FROM Automovil a
        INNER JOIN Alquiler q ON a.ID_Automovil = q.ID_Automovil
        WHERE q.Estado = "Disponible";
        `, (error,results)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            }
        }
    )
});







export default appAutos;