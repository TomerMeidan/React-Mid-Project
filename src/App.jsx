import "./App.css";
import { useEffect, useState } from "react";
import { getAllUsers ,deleteUserByID} from "./utils";
import User from "./User";

function App() {
  const [users, setUsers] = useState([]);
  const [displayUsersBySearch, setDisplayUsersBySearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
  // Input - None
  // Info - Getting all the users from the database
  const handleUsers = async () => {
    const { data: users } = await getAllUsers();
    setUsers(users);
  };

  // Name - Handle User Delete
  // Input - ObjectID id
  // Info - Deleting a user by his id from the database
  const handleUserDelete = async (id) => {
    await deleteUserByID(id); 
    setUsers(users.filter((user) => user.id != id)); // Simulating the user deletion from database
  };

  const handleUserUpdate = () => {};

  return (
    <div
      style={{
        border: 1,
        borderStyle: "solid",
        borderRadius: "50px",
        padding: "15px",
      }}
    >
      Search: <input type="" onChange={(e) => setSearchInput(e.target.value)} />{" "}
      <button style={{ marginLeft: "30px" }}>Add</button>
      <br />
      <br />
      {displayUsersBySearch.length < 1
        ? null
        : displayUsersBySearch.map((user) => {
            return (
              <div key={user.id} style={{ padding: "5px" }}>
                <User
                  onDeleteClick={handleUserDelete}
                  userData={JSON.stringify(user)}
                />
              </div>
            );
          })}
    </div>
  );
}

export default App;
