import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const show = slug => axios.get(`/posts/${slug}`);
const destroy = slug => axios.delete(`/posts/${slug}`);
const update = (slug, payload) =>
  axios.put(`/posts/${slug}`, {
    post: payload,
  });
const myPosts = () => axios.get("/posts/my_posts");

const postsApi = { fetch, create, show, destroy, update, myPosts };

export default postsApi;
