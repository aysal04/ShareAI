import axios from "axios";
const API = axios.create({
  baseURL: `${import.meta.env.CLIENT_API_URL}/api/`,
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateImage/", data);
