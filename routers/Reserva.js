import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const appReserva = Router();

let con = undefined;
appReserva.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to the database")
   } 
});

appReserva.get("/",(req,res)=>{
    con.query(
        `SELECT r.ID_Reserva, r.ID_Cliente, r.ID_Automovil, r.Fecha_Reserva, r.Fecha_Inicio, r.Fecha_Fin, r.Estado, c.Nombre, c.Apellido, c.DNI, c.Direccion,
        c.Telefono, c.Email, a.Marca, a.Modelo, a.Anio, a.Tipo, a.Capacidad, a.Precio_Diario
        FROM Reserva r
        INNER JOIN Cliente c ON r.ID_Cliente = c.ID_Cliente
        INNER JOIN Automovil a ON r.ID_Automovil = a.ID_Automovil
        WHERE r.Estado = "Pendiente"
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

appReserva.get("/:idCliente",(req,res)=>{
    const idCliente = req.params.idCliente
    con.query(
        `SELECT * FROM Reserva WHERE ID_Cliente = ? AND Estado = "Pendiente" `,[idCliente],
        (err,results)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error executing query");
            }else{
                res.status(200).send(results);
            }
        }
    )
});





export default appReserva;