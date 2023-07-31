import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const appSucursal = Router();

let con = undefined;
appSucursal.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to the database")
   } 
});

appSucursal.get("/",(req,res)=>{
    con.query(
        `SELECT s.Nombre, s.Direccion, sc.Cantidad_Disponible as Cantidad_de_autos_disponibles
         FROM Sucursal s
         INNER JOIN Sucursal_Automovil sc ON  s.ID_Sucursal = sc.ID_Sucursal
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







export default appSucursal;