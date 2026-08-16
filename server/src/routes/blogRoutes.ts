import { Router } from "express";
import { creatBlog, getAllBlogs, getOneBlog, deleteBlog, updateBlog } from "../controllers/blogController.js";

const router = Router();

router.post("/", creatBlog);
router.get("/", getAllBlogs);
router.get("/:id", getOneBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

export default router;