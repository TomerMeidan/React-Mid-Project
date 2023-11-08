import axios from "axios";

// Get all objects
const getObjects = (url) => axios.get(url);

// Get an object by the id nad url api call
const getObjectByID = (url, id, limit = -1) =>
  limit === -1
    ? axios.get(`${url}?userId=${id}`)
    : axios.get(`${url}?userId=${id}&_limit=${limit}`);
    
// Delete an object by the id nad url api call
const deleteObjectByID = (url, id) => axios.delete(`${url}/${id}`);

// Update an object by the id nad url api call
const updateObjectByID = (url, id, data) => axios.put(`${url}/${id}`, data);

export { getObjects, getObjectByID, deleteObjectByID, updateObjectByID };
