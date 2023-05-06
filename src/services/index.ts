import { emailSignup, confirmUser, login} from "./authServices.js";
import { getAllPosts, getPostById, deletePostById, updatePostById, createPost } from "./postsServices.js";
import { updateUser, getUser } from "./userServices.js";

export {emailSignup, confirmUser, login, getAllPosts, getPostById, deletePostById, updatePostById, createPost, updateUser, getUser}