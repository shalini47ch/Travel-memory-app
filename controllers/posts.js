//write all the logic for the routes so that the code is more clean and readable M
import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();


export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: message.error });
  }
};
export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostMessage.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: message.error });
  }

  //   res.send("Post created successfully");
};

//now here create a method called as Update Post
export const updatePost=async(req,res)=>{
  const{id}=req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  //this is the case when the id was not found in mongodb
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
  //the case when we get the data
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id,updatedPost,{new:true});
  res.json(updatedPost);

}
//here create a method called as Delete Post 
export const deletePost=async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);
  res.json({message:"Post deleted successfully"});

}
//create a method for likePost using the id as used in case of update
export const likePost=async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
  const post = await PostMessage.findById(id);
  const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
  res.json(updatedPost);

}
export default router;
