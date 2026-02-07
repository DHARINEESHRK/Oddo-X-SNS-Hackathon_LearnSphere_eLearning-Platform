const Course = require("../model/course");

// GET /api/courses — list all courses (optionally filter by published, instructorId)
const getCourses = async (req, res) => {
  try {
    const filter = {};
    if (req.query.published === "true") filter.published = true;
    if (req.query.instructorId) filter.instructorId = req.query.instructorId;

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("getCourses error:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// GET /api/courses/:id — single course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("getCourseById error:", err);
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

// POST /api/courses — create a new course (protected)
const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructorId: req.body.instructorId || req.userinfo?.id,
    };
    const course = await Course.create(courseData);
    res.status(201).json(course);
  } catch (err) {
    console.error("createCourse error:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
};

// PUT /api/courses/:id — update a course (protected)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("updateCourse error:", err);
    res.status(500).json({ message: "Failed to update course" });
  }
};

// DELETE /api/courses/:id — delete a course (protected)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error("deleteCourse error:", err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
