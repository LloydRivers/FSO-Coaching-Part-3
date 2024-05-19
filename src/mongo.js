import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const userName = process.env.MONGODB_USERNAME;
const password = process.argv[2];
const uri = `mongodb+srv://lloydrivers:${password}@cluster0.nnoxpyj.mongodb.net/`;

mongoose.set("strictQuery", false);

mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
