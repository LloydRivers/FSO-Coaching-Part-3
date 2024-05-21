import mongoose from "mongoose";

const validateNumber = [
  {
    validator: (number: string): boolean => {
      if (number.length < 8) {
        return false;
      }
      const parts = number.split("-");
      return (
        parts.length === 2 &&
        (parts[0].length === 2 || parts[0].length === 3) &&
        /^\d+$/.test(parts[0]) &&
        /^\d+$/.test(parts[1])
      );
    },
    message: (props: { value: string }) =>
      `${props.value} is not a valid phone number!`,
  },
  {
    validator: (value: string): boolean => {
      return /^\d{2,3}-\d+$/.test(value);
    },
    message: (props: { value: string }) =>
      `${props.value} is not a valid phone number!`,
  },
];

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    validate: validateNumber,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
