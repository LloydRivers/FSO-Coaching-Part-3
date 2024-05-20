import express, { Request, Response, Application } from "express";
import Person from "./3.9-3.10/models/person";
import mongoose from "mongoose";
import cors from "cors";
import data from "./data";
import formatDateOptions from "./formatDate";
import setupMorgan from "./morgan";
import startServer from "./startServer";
import dotenv from "dotenv";

dotenv.config();
const userName = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://${userName}:${password}@cluster0.nnoxpyj.mongodb.net/`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const app: Application = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
setupMorgan(app);

app.get("/api/persons", async (req: Request, res: Response) => {
  try {
    const persons = await Person.find({});
    res.send(persons);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/persons/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (person) {
      res.send(person);
    } else {
      res.status(404).send("<h2>person not found</h2>");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("<h2>Internal server error</h2>");
  }
});

app.delete("/api/persons/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("<h2>Internal server error</h2>");
  }
});
app.post("/api/persons", async (req: Request, res: Response) => {
  try {
    const { name, number } = req.body;
    if (!name || !number) {
      res.status(400).send("name or number is missing");
      return;
    } else {
      const person = await Person.create({ name, number });
      res.send(person);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
app.put("/api/persons/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const { number } = req.body;

    const updatedPerson = await Person.findOneAndUpdate(
      { name },
      {
        number,
      },
      { new: true }
    );

    if (updatedPerson) {
      res.send(updatedPerson);
    } else {
      res.status(404).send("Person not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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

const port = parseInt(process.env.PORT || "3001", 10);

startServer(port, app);
