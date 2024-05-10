import express, { Request, Response, Application } from "express";
import { Server } from "http";
import data from "./data";

const app: Application = express();

app.get("/api/persons", (req: Request, res: Response) => {
  console.log("GET /");
  res.send(data);
});

const startServer = (port: number, app: Application): Server => {
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

const port = 3001;
startServer(port, app);
