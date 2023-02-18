import express, {Express, Request, Response } from 'express';
const app: Express = express();
const port: number = 5000;

app.get('/', (req: Request, res: Response): void => {
    res.send("Folder Structure Viewer server is running");
})

app.listen(port, (): void => {
    console.log(`Folder Structure Viewer server is running on prot ${port}`);
});