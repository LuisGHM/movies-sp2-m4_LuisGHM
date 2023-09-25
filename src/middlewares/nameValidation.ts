import { NextFunction, Request, Response } from "express";
import { client } from "../database";

export const nameValidation = async (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM movies;`;
    
    const data = await client.query(query);

    const movieName = data.rows.find(movie => movie.name === req.body.name);

    movieName ? res.status(409).json({message: "Movie name already exists!"}) : next() ;
}