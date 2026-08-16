import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success:true,
        message: "Server is running",
    });
});

app.use("/api", blogRoutes);

export default app;