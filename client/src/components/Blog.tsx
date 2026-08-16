import { useEffect, useState } from "react";
import axios from "axios";

interface BlogItem {
    _id?: string;
    title: string;
    description: string;
    author: string;
}

function Blog() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");

    const [allBlogs, setAllBlogs] = useState<BlogItem[]>([]);
    const [editId, setEditId] = useState<string | null>(null);

// Purana code:
// const API_URI = "http://localhost:9000/api";

// Naya code:
const API_URI = import.meta.env.VITE_API_URI || "/api";


    //Update & Create
    async function handleSubmit() {
        if(editId) {
            await axios.put(`${API_URI}/${editId}`, {title, description, author});
            setEditId(null);
        } else {
            await axios.post(API_URI, {
            title,
            description,
            author,
        });
        }
        setTitle("");
        setDescription("");
        setAuthor("");
        getAllBlogs(); 
    }

    // Get All Blogs
    async function getAllBlogs() {
        try {
            const response = await axios.get(API_URI);
        const allBlogs = response.data.allBlogs; 
        setAllBlogs(allBlogs);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    //Delete Blog
    async function deleteBlog(id: string) {
        try {
            await axios.delete(`${API_URI}/${id}`);
            getAllBlogs();
        } catch (error) {
            console.log("Error: ", error)
        }
    }

     function startEditingBlog(blog:BlogItem) {
        setTitle(blog.title);
        setDescription(blog.description);
        setAuthor(blog.author);
        if (blog._id) {
            setEditId(blog._id);
        }
    }


    useEffect(() => {
        getAllBlogs();
    }, []);

   return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {editId ? "Update Blog" : "Create Blog"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Title"
                            required
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>

                        <input
                            type="text"
                            placeholder="Enter description"
                            required
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Author
                        </label>

                        <input
                            type="text"
                            placeholder="Enter author"
                            required
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700
                        text-white font-semibold py-3 rounded-lg
                        transition duration-200 shadow-md hover:shadow-lg"
                    >
                        {editId ? "Update Blog" : "Create Blog"}
                    </button>
                </form>
            </div>

            <div className="space-y-5">
                {allBlogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-2xl shadow-md
                        p-6 hover:shadow-lg transition duration-200"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {blog.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed mb-4">
                            {blog.description}
                        </p>

                        <p className="text-sm text-gray-500 mb-5">
                            By{" "}
                            <strong className="text-gray-800">
                                {blog.author}
                            </strong>
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (blog._id) deleteBlog(blog._id);
                                }}
                                className="bg-red-500 hover:bg-red-600
                                text-white px-5 py-2 rounded-lg
                                font-medium transition duration-200"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => {
                                    startEditingBlog(blog);
                                }}
                                className="bg-yellow-500 hover:bg-yellow-600
                                text-white px-5 py-2 rounded-lg
                                font-medium transition duration-200"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default Blog;