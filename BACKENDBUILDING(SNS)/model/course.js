const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: Number, required: true },
  points: { type: Number, default: 10 },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  questions: [questionSchema],
  passingScore: { type: Number, default: 70 },
  order: { type: Number, default: 1 },
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  content: { type: String, default: "" },
  videoUrl: { type: String },
  documentUrl: { type: String },
  duration: { type: String, default: "" },
  order: { type: Number, default: 1 },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    instructorId: { type: String, required: true },
    instructorName: { type: String, default: "" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: { type: String, default: "" },
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    studentsCount: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    allowGuests: { type: Boolean, default: false },
    lessons: [lessonSchema],
    quizzes: [quizSchema],
  },
  { timestamps: true }
);

// Virtual to expose _id as id in JSON
courseSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    // Also transform lesson & quiz sub-doc _id → id
    if (ret.lessons) {
      ret.lessons = ret.lessons.map((l) => {
        l.id = l._id.toString();
        l.courseId = ret.id;
        delete l._id;
        return l;
      });
    }
    if (ret.quizzes) {
      ret.quizzes = ret.quizzes.map((q) => {
        q.id = q._id.toString();
        q.courseId = ret.id;
        if (q.questions) {
          q.questions = q.questions.map((qn) => {
            qn.id = qn._id.toString();
            qn.quizId = q.id;
            delete qn._id;
            return qn;
          });
        }
        delete q._id;
        return q;
      });
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
