import mongoose, {Document, Schema} from "mongoose";

export interface IBlog extends Document {
    title: string,
    description:string,
    author:string,
}

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Blog = mongoose.model<IBlog>("blogs", blogSchema);
export default Blog;