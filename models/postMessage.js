//The models folder will help us to develop the schema for our database
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
//now put this schema in the model
const postMessage = mongoose.model("PostMessage", postSchema);
export default postMessage;
