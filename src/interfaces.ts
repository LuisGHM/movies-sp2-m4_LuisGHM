import { QueryResult } from "pg";

export type Movies = {
    id: number,
    name: string,
    category: string,
    duration: number,
    price: number
}

export type MoviesCreate = Omit<Movies, "id">

export type MovieReadAll = Movies[]

export type MoviesResult = QueryResult<Movies>