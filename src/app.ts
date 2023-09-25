import "dotenv/config";
import express from "express";
import { connectDatabase, createDatabaseTables } from "./database";
import { createMovie, readAll } from "./logic";

const app = express();

app.use(express.json());

app.post("/movies", createMovie);

app.get("/movies", readAll);

app.get("/movies/:id");

app.patch("/movies/:id");

app.delete("/movies/:id");

const PORT = 3000;

app.listen(PORT, async () => {
    await connectDatabase();
    await createDatabaseTables();
    console.log(`Server started on port ${PORT}`);
})