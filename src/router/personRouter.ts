import { Router, Request, Response, NextFunction } from "express";
import Person from "../models/person";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const persons = await Person.find({});
    res.send(persons);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const deletedPerson = await Person.findByIdAndDelete(id);
      if (!deletedPerson) {
        res.status(404).send("<h2>Person not found</h2>");
        return;
      }
      res.status(204).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, number } = req.body;
    if (!name || !number) {
      throw new Error("Name or number is missing");
    }
    const person = await Person.create({ name, number });
    res.send(person);
  } catch (error: unknown) {
    console.log(error);
    res.status(400).send("Name or number is missing");
  }
});

router.put("/:name", async (req: Request, res: Response) => {
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
