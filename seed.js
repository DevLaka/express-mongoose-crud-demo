const mongoose = require("mongoose");
const Course = require("./models/course");

mongoose
  .connect("mongodb://localhost:27017/courseApp")
  .then(() => {
    console.log("Mongo connection established.");
  })
  .catch((e) => {
    console.log("Mongo connection failed");
    console.log(e);
  });

const seedCourses = [
  {
    title: "Introduction to computer science",
    price: 5000,
    category: "cs",
  },
  {
    title: "Introduction to business studies",
    price: 3000,
    category: "bs",
  },
  {
    title: "Introduction to civil engineering",
    price: 6000,
    category: "eng",
  },
  {
    title: "Introduction to Js programming",
    price: 500,
    category: "cs",
  },
  {
    title: "Introduction to Marketing",
    price: 8000,
    category: "bs",
  },
  {
    title: "Introduction to Electrical Engineering",
    price: 7000,
    category: "eng",
  },
  {
    title: "Introduction to AI",
    price: 8000,
    category: "cs",
  },
];

Course.insertMany(seedCourses)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
