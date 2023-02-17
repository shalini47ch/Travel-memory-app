//this will will consists of all the routes needed for post
import express from "express";
import { getPosts, createPost ,updatePost,deletePost,likePost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
//now create another post for createPost
router.post("/", createPost);
//create a route for the updatePost functionality 
router.patch("/:id",updatePost);
//create a route for the deletePost functionality 
router.delete("/:id",deletePost)
//create a route for the likePost functionality 
//we need to use patch as we are updating the no of counts of likes which is similar to update function
router.patch("/:id/likePost",likePost);

export default router;

//importing in parenthesis as we have directly exported and not used default export
