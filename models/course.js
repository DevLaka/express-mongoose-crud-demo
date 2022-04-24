const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["cs", "bs", "eng"],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
