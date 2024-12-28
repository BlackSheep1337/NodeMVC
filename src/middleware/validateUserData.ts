import { body } from "express-validator";

export const validateCreateUser = [
  body("name").notEmpty().withMessage("Name is required").trim().escape(),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("message").optional().trim().escape(),
];