import { NextFunction, Request, Response } from "express";
import { client } from "../database";

export const existId = async (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM movies;`;
    
    const data = await client.query(query);

    const foundMovie = data.rows.find(movie => movie.id === +req.params.id);

    foundMovie ? next() : res.status(404).json({message: "Movie not found!"});
}