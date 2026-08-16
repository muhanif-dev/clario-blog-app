import { Request, Response } from "express";
import Blog from "../models/Blog.modal.js";

//Create
export const creatBlog = async (req:Request, res:Response) => {
    const { title, description, author } = req.body;
   try {
     const blog = await Blog.create({
        title,
        description,
        author,
    });

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog,
    })
   } catch (error) {
    res.status(500).json({
        success: false,
        message:`Internal Server Error ${error}`,
    });
   }
}

//Read All
export const getAllBlogs = async (req:Request, res: Response) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).json({
            success: true,
            allBlogs,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Internal Server Error ${error}`,
        })
    }
}

//Read Specific
export const getOneBlog = async (req: Request, res: Response) => {
try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(!blog) {
        res.status(404).json({
            success:false,
            message:"Invalid ID",
        });
    }

    res.status(200).json({
        success:true,
        blog,
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message: `Internal Server Error: ${error}`,
    });
}
}

//Delete
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if(!deletedBlog) {
            res.status(404).json({
                success: false,
                message:"Invalid ID",                
            });
        }

        res.status(201).json({
            success:true,
            message:"Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:`Internal Server Error: ${error}`,
        });
    }
}

//Update
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {title, description, author} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,
            description,
            author,
        }, {
            new: true,
            runValidators: true,
        });

        if(!updatedBlog) {
            res.status(404).json({
                success: false,
                message:"Invalid ID",
            });
        }
        
        res.status(201).json({
            success: true,
            message:`Blog Under The ID ${id} Updated Successfully`,
            updatedBlog,
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message:`Internal Server Error: ${error}`,
        });
    }
}
