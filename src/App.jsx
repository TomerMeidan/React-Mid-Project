import "./App.css";
import { useEffect, useState } from "react";
import { getObjects, deleteObjectByID, updateObjectByID } from "./utils";
import User from "./User";
import Todos from "./Todos";
import Posts from "./Posts";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [displayUsersBySearch, setDisplayUsersBySearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [response, setResponse] = useState("");

  // Initialize the users list once page is rendered
  useEffect(() => {
    handleUsers();
  }, []);

  // Update the users view once search field is being changed
  useEffect(() => {
    if (searchInput != "") {
      const updatedUsers = users.filter(
        (user) =>
          user.name.includes(searchInput) || user.email.includes(searchInput)
      );
      setDisplayUsersBySearch(updatedUsers);
    } else setDisplayUsersBySearch(users);
  }, [searchInput, users]);

  // Name - Handle Users
  // Input - String URL
  // Info - Getting all the users from the database
  const handleUsers = async () => {
    const { data: users } = await getObjects(USERS_URL).catch((err) =>
      setResponse(`Failed to pull users from database - ${err.name}`)
    );
    setUsers(users);
  };

  // Name - Handle User Delete
  // Input - ObjectID id, String URL
  // Info - Deleting a user by the id field from the database
  const handleUserDelete = async (id) => {
    await deleteObjectByID(USERS_URL, id)
      .then(() => setResponse(`User id ${id} was deleted from the database!`))
      .catch((err) =>
        setResponse(`Failed to delete user id ${id} - ${err.name}`)
      );
    setUsers(users.filter((user) => user.id != id)); // Simulating the user deletion from database
  };

  // Name - Handle User Update
  // Input - ObjectID id, String URL, Object Data
  // Info - Updating a user by the id field
  const handleUserUpdate = async (id, updatedUser) => {
    // Simulating updating the user in the database
    await updateObjectByID(USERS_URL, id, updatedUser)
      .then(() => setResponse(`Updated User id ${id} in the database!`))
      .catch((err) =>
        setResponse(`Failed to update user id ${id} - ${err.name}`)
      );
  };

  return (
    <div className="overall-box">
      <div className="main-box">
        <p style={{ color: "red" }}>{response}</p>
        Search: <input onChange={(e) => setSearchInput(e.target.value)} />
        <button style={{ marginLeft: "30px" }}>Add</button>
        {displayUsersBySearch.length < 1
          ? null
          : displayUsersBySearch.map((user) => {
              return (
                <div key={user.id}>
                  <User
                    onUpdateClick={handleUserUpdate}
                    onDeleteClick={handleUserDelete}
                    userData={JSON.stringify(user)}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
