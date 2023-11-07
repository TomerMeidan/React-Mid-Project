import axios from "axios";

// -- URL API links
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const getAllUsers = () => axios.get(USERS_URL);
const getTodosByID = (id) => axios.get(`${TODOS_URL}?userId=${id}&_limit=2`);
const deleteUserByID = (id) => axios.delete(`${USERS_URL}/${id}`);

export { getAllUsers, getTodosByID, deleteUserByID };
