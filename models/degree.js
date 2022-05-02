const mongoose = require("mongoose");
const Course = require("./course");
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

degreeSchema.post("findOneAndDelete", async (degree) => {
  if (degree.courses.length) {
    await Course.deleteMany({ _id: { $in: degree.courses } });
  }
});

const Degree = mongoose.model("Degree", degreeSchema);

module.exports = Degree;
