import { useState, useEffect } from "react";
import { getObjectByID } from "./utils";
import UserOtherData from "./UserOtherData";
import Posts from "./Posts";
import Todos from "./Todos";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const User = ({ userData, onDeleteClick, onUpdateClick }) => {
  const [user, setUser] = useState(JSON.parse(userData));
  const [border, setBorder] = useState("white"); // white - has no tasks, red - tasks not completed, otherwise its green
  const [todos, userTodoList] = useState([]);
  const [mousedOverOtherData, setMousedOverOtherData] = useState(false);
  const [clickID, setClickID] = useState(false);

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
    const { data: userTodos } = await getObjectByID(TODOS_URL, user.id, 2);
    userTodoList(userTodos);
  };

  const checkUserTodos = async () => {
    const isCompleted = todos.some((todo) => todo.completed === false);
    return !isCompleted;
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "inline" }}>
        <div
          style={{
            border: 1,
            borderStyle: "solid",
            borderColor: border,
            padding: "15px",
            backgroundColor: clickID ? "darkgoldenrod" : "#242424",
          }}
        >
          <div
            onClick={() => setClickID(!clickID)}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            ID:{" " + user.id}
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Name:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, name: e.target.value }))
              }
              type="text"
              defaultValue={user.name}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Email:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, name: e.target.value }))
              }
              type="text"
              defaultValue={user.email}
            />
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
              onUserUpdate={handleUserUpdate}
              userData={JSON.stringify(user)}
            />
          ) : null}
          <button onClick={() => onUpdateClick(user.id, user)}>Update</button>
          <button onClick={() => onDeleteClick(user.id)}>Delete</button>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        {clickID ? (
          <div style={{ paddingLeft: "10px" }}>
            <p style={{ textAlign: "center" }}>
              Todo List of user id {user.id}
            </p>
            <Todos userTodoList={todos} /> <Posts />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default User;
