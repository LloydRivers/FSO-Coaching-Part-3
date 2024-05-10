import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import { IncomingMessage, Server } from "http";
import data from "./data";
import formatDateOptions from "./formatDate";

interface MorganRequest extends IncomingMessage {
  body: {
    query: String;
  };
}

const app: Application = express();
app.use(express.json());
const logger = morgan("tiny");
app.use(logger);
morgan.token("body", (req: MorganRequest, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length]  :response-time ms - :body")
);

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

app.delete("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    data.splice(data.indexOf(person), 1);
    /*
    From Google: A 200 OK status code indicates that the resource has been removed and it will include a message for the client that describes the status. A 204 No Content status code indicates that the resource has been removed but there is no message body to further describe the action or the status.
    */

    // This will send back a message to the client
    res.status(200).send(`Person with id ${id} deleted`);
    // res.status(204).send(`Person with id ${id} deleted`);  This will send back an empty response
    // res.status(204).end();  This will send back an empty response
  } else {
    res.status(404).send("Not found");
  }
});
app.post("/api/persons", (req: Request, res: Response) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send("Name or number is missing");
  }

  const alreadyExists = data.some((person) => person.name === name);

  if (alreadyExists) {
    return res.status(400).send("Name must be unique");
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000),
    name,
    number,
  };

  data.push(newPerson);
  res.status(201).send(newPerson);
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
