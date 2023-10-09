import { Client } from "pg";

export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
});

export const connectDatabase = async () => { 
    try {
        await client.connect();
        console.log("Database sucessfully connected.");
        
    } catch (error) {
        console.log(error);
    }
}

export const createDatabaseTables = async () => {
    try {
        const query = ` 
            CREATE TABLE IF NOT EXISTS movies (
            id SERIAL PRIMARY KEY,
            name varchar(50),
            category varchar(20),
            duration int,
            price int
        );`

        await client.query(query);
        console.log("Table created sucessfully");

    } catch (error) {
        console.log(error);
    }
}