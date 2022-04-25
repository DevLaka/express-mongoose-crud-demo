const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const Course = require("./models/course");

const categories = [
  {
    code: "cs",
    displayName: "Computer Science",
  },
  {
    code: "bs",
    displayName: "Business Studies",
  },
  {
    code: "eng",
    displayName: "Engineering",
  },
];

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/courses", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const courses = await Course.find({ category });
    res.render("courses/index", { courses, category });
  } else {
    const courses = await Course.find({});
    res.render("courses/index", { courses, category: "All" });
  }
});

app.get("/courses/new", (req, res) => {
  res.render("courses/new", { categories });
});

app.post("/courses", async (req, res) => {
  const { title, price, category } = req.body;
  const course = new Course({ title, price, category });
  await course.save();
  res.redirect(`/courses/${course._id}`);
});

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.render("courses/show", { course });
});

app.get("/courses/:id/edit", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.render("courses/edit", { course, categories });
});

app.put("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, category } = req.body;
  const course = { title, price, category };
  const newCourse = await Course.findByIdAndUpdate(id, course, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/courses/${newCourse._id}`);
});

app.delete("/courses/:id", async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.redirect("/courses");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000.");
});
