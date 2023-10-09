import { Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";
import { MoviesResult } from "./interfaces";

export const createMovie = async (req: Request, res:Response): Promise<Response> => {
   let query: string = format(`INSERT INTO movies (%I) VALUES (%L) RETURNING *;`, Object.keys(req.body), Object.values(req.body));

   const data: MoviesResult = await client.query(query);
   
   return res.status(201).json(data.rows[0]);
}

export const readAll = async (req: Request, res:Response): Promise<Response> => {
    let queryConfig: string;
    let data: MoviesResult;

    if(req.query.category){
        queryConfig = `SELECT * FROM movies WHERE category = $1;`;      

        data = await client.query(queryConfig, [req.query.category]); 

        if(data.rows.length > 0){
            return res.status(200).json(data.rows);  
        }
    }

    queryConfig = `SELECT * FROM movies;`;
    
    data = await client.query(queryConfig);
    
    return res.status(200).json(data.rows); 
}

export const readById = async (req: Request, res:Response): Promise<Response> => {
    const id: number = +req.params.id
    
    const query: string = `SELECT * FROM movies WHERE id = $1;`;
    
    const data: MoviesResult = await client.query(query, [id]);
    
    return res.status(200).json(data.rows[0]); 
}

export const updateMovie = async (req: Request, res:Response) => {
    const id : number = +req.params.id;

    const query: string = format(`UPDATE movies SET (%I) = ROW(%L) WHERE id = (%L) RETURNING *;`, Object.keys(req.body), Object.values(req.body), id);

    const data: MoviesResult = await client.query(query);

    return res.status(200).json(data.rows[0]);
}



export const deleteMovie = async (req: Request, res:Response) => {
    const id: number = +req.params.id

    const query: string = `DELETE FROM movies WHERE id = $1;`;
     
    await client.query(query, [id]);
    
    return res.status(204).json();  
}