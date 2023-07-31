import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const appAlquiler = Router();
let con = undefined;
appAlquiler.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to the database")
   } 
});

appAlquiler.get("/",(req,res)=>{
    con.query(
        `SELECT q.ID_Alquiler, q.ID_Cliente, q.ID_Automovil, q.Fecha_Inicio, q.Fecha_Fin, q.Costo_Total, q.Estado, c.Nombre, c.Apellido, c.DNI, c.Direccion,
        c.Telefono, c.Email
        FROM Alquiler q
        INNER JOIN Cliente c ON q.ID_Cliente = c.ID_Cliente
        WHERE q.Estado = "Activo";
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
appAlquiler.get("/fecha",(req,res)=>{
    con.query(
        `SELECT * FROM Alquiler WHERE Fecha_Inicio = "2023-07-05"
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

appAlquiler.get("/total",(req,res)=>{
    con.query(
        `SELECT COUNT(*) as Cantidad_de_alquileres FROM Alquiler`, 
        (error,results)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            }
        }
    )
});



appAlquiler.get("/costo/:IdAlquiler",(req,res)=>{
    const IdAlquiler = req.params.IdAlquiler
    con.query(
        `SELECT a.ID_ALquiler, a.Costo_Total FROM Alquiler a WHERE a.ID_ALquiler = ?
        `, [IdAlquiler], (error,results)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            }
        }
    )
});
appAlquiler.get("/:IdAlquiler",(req,res)=>{
    const IdAlquiler = req.params.IdAlquiler
    con.query(
        `SELECT * FROM Alquiler WHERE ID_Alquiler = ?
        `, [IdAlquiler], (error,results)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            }
        }
    )
});







export default appAlquiler;