import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateEvent } from "../middlewares/validation.middleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

router.post("/", validateEvent, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", validateEvent, updateEvent);
router.delete("/:id", deleteEvent);

export default router;
