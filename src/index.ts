import express, { Request, Response, Application } from "express";
import { Server } from "http";
import data from "./data";
import formatDateOptions from "./formatDate";

const app: Application = express();

app.get("/api/persons", (req: Request, res: Response) => {
  console.log("GET /");
  res.send(data);
});

app.get("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).send("Not found");
  }
});

app.get("/info", (req: Request, res: Response) => {
  const formattedDate = formatDateOptions();

  const template = `
      <p>Phonebook has info for ${data.length} people</p>
      <p>${formattedDate}</p>
    `;

  res.send(template);
});

const startServer = (port: number, app: Application): Server => {
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

const port = 3001;
startServer(port, app);
