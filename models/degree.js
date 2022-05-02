const mongoose = require("mongoose");
const { Schema } = mongoose;

const degreeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Degree should have a title"],
  },
  totalCredits: Number,
  department: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Degree = mongoose.model("Degree", degreeSchema);

module.exports = Degree;
