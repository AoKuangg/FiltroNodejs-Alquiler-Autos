import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import { generateToken, validateToken } from "../JWT/tokenJWT.js";
dotenv.config();
const appClientes = Router();

let con = undefined;
appClientes.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to the database")
   } 
});

appClientes.get("/",generateToken,(req,res)=>{
    con.query(
        `SELECT * FROM Cliente`,
        (error,results)=>{
            if (error) {
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send({results,token: req.auth});
            }
        }
    )
});

appClientes.get("/alquiler",validateToken,(req,res)=>{
    con.query(
        `SELECT c.* FROM Cliente c INNER JOIN Alquiler a ON c.ID_Cliente = a.ID_Cliente
        WHERE a.Estado = "activo"`,
        (error,results)=>{
            if (error) {
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            }
        }
    )
});
appClientes.get("/reserva/:idReserva",validateToken,(req,res)=>{
    const idReserva = req.params.idReserva;
    con.query(
        `SELECT c.* FROM Cliente c INNER JOIN Reserva r ON c.ID_Cliente = r.ID_Cliente
        WHERE r.ID_Reserva = ?`,[idReserva],
        (error,results)=>{
            if (error) {
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            } 
        }
    )
});

appClientes.get("/:DNI",validateToken,(req,res)=>{
    const dni = req.params.DNI
    con.query(
        `SELECT * FROM Cliente WHERE DNI = ?`,[dni],
        (error,results)=>{
            if (error) {
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send(results);
            }
        }
    )
});




export default appClientes;