import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();
const app: Express = express();
const port: number = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0nieed1.mongodb.net/?retryWrites=true&w=majority`;
const client: MongoClient = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    finally {

    }
}

run().catch(error => console.log(error));



app.get('/', (req: Request, res: Response): void => {
    res.send("Folder Structure Viewer server is running");
});

app.listen(port, (): void => {
    console.log(`Folder Structure Viewer server is running on prot ${port}`);
});