import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
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

appClientes.get("/",(req,res)=>{
    con.query(
        `SELECT * FROM Cliente`,
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