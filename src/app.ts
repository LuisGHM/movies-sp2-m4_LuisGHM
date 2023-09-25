import "dotenv/config";
import express from "express";
import { connectDatabase, createDatabaseTables } from "./database";
import { createMovie, deleteMovie, readAll, readById, updateMovie } from "./logic";
import { existId } from "./middlewares/existId";
import { nameValidation } from "./middlewares/nameValidation";

const app = express();

app.use(express.json());

app.post("/movies", nameValidation, createMovie);

app.get("/movies", readAll);

app.get("/movies/:id",existId, readById);

app.patch("/movies/:id",existId, nameValidation, updateMovie);

app.delete("/movies/:id", existId, deleteMovie);

const PORT = 3000;

app.listen(PORT, async () => {
    await connectDatabase();
    await createDatabaseTables();
    console.log(`Server started on port ${PORT}`);
})