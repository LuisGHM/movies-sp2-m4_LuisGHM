import { Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";

export const createMovie = async (req: Request, res:Response) => {

   const query = format(`INSERT INTO movies (%I) VALUES (%L) RETURNING *;`, Object.keys(req.body), Object.values(req.body));

   const data = await client.query(query);

   return res.status(201).json(data.rows[0]);
}

export const readAll = async (req: Request, res:Response) => {
    const query = `SELECT * FROM movies;`;
    
    const data = await client.query(query);
    
    return res.status(200).json(data.rows); 
}

