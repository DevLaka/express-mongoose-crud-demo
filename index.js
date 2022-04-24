const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.render("courses/index", { courses });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000.");
});
