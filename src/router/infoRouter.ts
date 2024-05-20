import { Router, Request, Response } from "express";
import Person from "../models/person";
import formatDateOptions from "../formatDate"; // Adjust the path as necessary

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const count = await Person.countDocuments({});
    const formattedDate = formatDateOptions();

    const template = `
      <p>Phonebook has info for ${count} people</p>
      <p>${formattedDate}</p>
    `;

    res.send(template);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
