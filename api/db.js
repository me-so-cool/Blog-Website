import mysql from "mysql2";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"qwerty#1234",
    database:"blog",
}
)
