import express from "express";
import { getHomePage, addTestimonial, deleteTestimonial, createOrUpdateHomePage } from "../controller/HomePageController.js";


const router = express.Router();

router.get("/homepage", getHomePage);
router.post("/homepage", createOrUpdateHomePage);


router.post("/homepage/testimonial", addTestimonial);
router.delete("/homepage/testimonial/:id", deleteTestimonial);

export default router;
