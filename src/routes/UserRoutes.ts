import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser
} from '../controllers/UserController';
import { validateCreateUser } from "../middleware/validateCreateUser";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validateCreateUser, createUser);
router.put("/:id", validateCreateUser, updateUser);
router.delete("/:id", deleteUser);


export default router;