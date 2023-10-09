import { QueryResult } from "pg";

export type Movies = {
    id: number,
    name: string,
    category: string,
    duration: number,
    price: number
}

export type MoviesResult = QueryResult<Movies>