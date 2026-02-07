const express=require("express")
const router=express.Router()  
const {login}=require("../components/loginroute") 
const {signup}=require("../components/signuproute") 
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require("../components/courseroute")
const imgmw = require("../middleware/image")
const { uploadImgCtrl } = require("../uplodcntrl/imgcntrl")
const authMiddleware = require("../authentiction/adim")
const multerErrorHandler = require("../middleware/multererror");

// Auth routes (public)
router.post("/api/signup", signup)
router.post("/api/login", login)

// Course routes (public read, protected write)
router.get("/api/courses", getCourses)
router.get("/api/courses/:id", getCourseById)
router.post("/api/courses", authMiddleware, createCourse)
router.put("/api/courses/:id", authMiddleware, updateCourse)
router.delete("/api/courses/:id", authMiddleware, deleteCourse)

// File upload routes (protected)
router.post("/api/uploadimage", authMiddleware, imgmw.single("image"), uploadImgCtrl) 
router.post("/api/uploadvideo", authMiddleware, imgmw.single("video"), uploadImgCtrl) 
router.post("/api/uploadpdf", authMiddleware, imgmw.single("pdf"), uploadImgCtrl) 

module.exports=router