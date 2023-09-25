import { Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";

export const createMovie = async (req: Request, res:Response) => {

   const query = format(`INSERT INTO movies (%I) VALUES (%L) RETURNING *;`, Object.keys(req.body), Object.values(req.body));

   const data = await client.query(query);

   return res.status(201).json(data.rows[0]);
}

export const readAll = async (req: Request, res:Response) => {
    if(req.query.category){
        const query = `SELECT * FROM movies WHERE category = '${req.query.category}';`;

        const data = await client.query(query);

        if(data.rows.length > 0){
            return res.status(200).json(data.rows); 
        }
    }

    const query = `SELECT * FROM movies;`;
    
    const data = await client.query(query);
    
    return res.status(200).json(data.rows); 
}

export const readById = async (req: Request, res:Response) => {
    const id = req.params.id
    
    const query = `SELECT * FROM movies WHERE id = ${id};`;
    
    const data = await client.query(query);
    
    return res.status(200).json(data.rows[0]); 
}

export const updateMovie = async (req: Request, res:Response) => {
    const { id } = req.params;

    const query = format(`UPDATE movies SET (%I) = ROW(%L) WHERE id = (%L) RETURNING *;`, Object.keys(req.body), Object.values(req.body), id);

    const data = await client.query(query);

    return res.status(200).json(data.rows[0]);
}


export const deleteMovie = async (req: Request, res:Response) => {
    const id = req.params.id

    const query = `DELETE FROM movies WHERE id = ${id};`;
     
    await client.query(query);
    
    return res.status(204).json(); 
}