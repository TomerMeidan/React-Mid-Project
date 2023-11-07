import { useState, useEffect } from "react";
import { getTodosByID } from "./utils";
import UserOtherData from "./UserOtherData";

const User = ({ userData, onDeleteClick }) => {
  const [user, setUser] = useState(JSON.parse(userData));
  const [border, setBorder] = useState("white");
  const [todos, setTodos] = useState([]);
  const [mousedOverOtherData, setMousedOverOtherData] = useState(false);

  useEffect(() => {
    buildUserTodos();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (todos.length > 1) {
        const isCompleted = await checkUserTodos();
        isCompleted === false ? setBorder("red") : setBorder("green");
      }
    };
    init();
  }, [todos]);

  const buildUserTodos = async () => {
    const { data: userTodos } = await getTodosByID(user.id);
    setTodos(userTodos);
  };

  const checkUserTodos = async () => {
    const isCompleted = todos.some((todo) => todo.completed === false);
    return !isCompleted;
  };

  return (
    // TODO Change to form object
    <div
      style={{
        border: 1,
        borderStyle: "solid",
        borderColor: border,
        padding: "15px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        ID:{" " + user.id}
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        Name:
        <input defaultValue={user.name} />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        Email:
        <input defaultValue={user.email} />
      </div>
      <br />
      <button
        onMouseEnter={() => setMousedOverOtherData(true)}
        onClick={() => setMousedOverOtherData(false)}
      >
        Other Data
      </button>
      {mousedOverOtherData ? (
        <UserOtherData
          userStreet={user.address.street}
          userCity={user.address.city}
          userZipCode={user.address.zipcode}
        />
      ) : null}
      <button>Update</button>
      <button onClick={() => onDeleteClick(user.id)}>Delete</button>
    </div>
  );
};

export default User;
