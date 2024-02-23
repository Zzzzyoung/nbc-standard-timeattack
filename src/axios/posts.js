import axios from "axios";

const postsAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/posts`,
  timeout: 1500,
});

export default postsAxios;
