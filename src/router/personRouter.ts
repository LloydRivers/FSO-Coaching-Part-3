import { Router, Request, Response } from "express";
import Person from "../models/person";

const router = Router();

router.get("/persons", async (req: Request, res: Response) => {
  try {
    const persons = await Person.find({});
    res.send(persons);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/persons/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (person) {
      res.send(person);
    } else {
      res.status(404).send("<h2>Person not found</h2>");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("<h2>Internal server error</h2>");
  }
});

router.delete("/persons/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("<h2>Internal server error</h2>");
  }
});

router.post("/persons", async (req: Request, res: Response) => {
  try {
    const { name, number } = req.body;
    if (!name || !number) {
      res.status(400).send("Name or number is missing");
      return;
    }
    const person = await Person.create({ name, number });
    res.send(person);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/persons/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const { number } = req.body;
    const updatedPerson = await Person.findOneAndUpdate(
      { name },
      { number },
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

export default router;
