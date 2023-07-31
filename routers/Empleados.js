import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import { generateToken, validateToken } from "../JWT/tokenJWT.js";
dotenv.config();
const appEmpleados = Router();

let con = undefined;
appEmpleados.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to the database")
   } 
});


appEmpleados.get("/",generateToken,(req,res)=>{
    con.query(
        `SELECT * FROM Empleado WHERE Cargo = "Vendedor"
        `, (error,results)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error executing query")
            }else{
                res.status(200).send({results,token: req.auth});
            }
        }
    )
});
appEmpleados.get("/altoCargo",validateToken,(req,res)=>{
    con.query(
        `SELECT * FROM Empleado WHERE Cargo = "Gerente" OR Cargo = "Asistente"
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






export default appEmpleados;