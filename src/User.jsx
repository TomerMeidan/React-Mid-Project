import { useState, useEffect } from "react";
import { getObjectByID } from "./utils";
import UserOtherData from "./UserOtherData";
import Posts from "./Posts";
import Todos from "./Todos";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const User = ({ userData, onDeleteClick, onUpdateClick }) => {
  const [user, setUser] = useState(JSON.parse(userData));
  const [border, setBorder] = useState("white"); // white - has no tasks, red - tasks not completed, otherwise its green
  const [todos, setUserTodoList] = useState([]);
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
    const { data: userTodos } = await getObjectByID(TODOS_URL, user.id, 5);
    setUserTodoList(userTodos);
  };

  const checkUserTodos = async () => {
    const isCompleted = todos.some((todo) => todo.completed === false);
    return !isCompleted;
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleUserTodosUpdate = (todosUpdate) => {
    setUserTodoList(todosUpdate);
  };

  return (
    <div className="parentBox">
      <div style={{ display: "inline" }}>
        <div
          className="user-box"
          style={{
            backgroundColor: clickID ? "darkgoldenrod" : "#242424",
            borderColor: border,
          }}
        >
          <div
            onClick={() => setClickID(!clickID)}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            ID:{" " + user.id}
          </div>
          <div className="input-bar">
            Name:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, name: e.target.value }))
              }
              type="text"
              defaultValue={user.name}
            />
          </div>
          <div className="input-bar">
            Email:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, name: e.target.value }))
              }
              type="text"
              defaultValue={user.email}
            />
          </div>
          <div className="buttons-group">
            <button
              onMouseEnter={() => setMousedOverOtherData(true)}
              onClick={() => setMousedOverOtherData(false)}
            >
              Other Data
            </button>
            <button onClick={() => onUpdateClick(user.id, user)}>Update</button>
            <button onClick={() => onDeleteClick(user.id)}>Delete</button>
          </div>
          {mousedOverOtherData ? (
            <UserOtherData
              onUserUpdate={handleUserUpdate}
              userData={JSON.stringify(user)}
            />
          ) : null}
        </div>
      </div>
      <div className="todos-posts-box">
        {clickID ? (
          <>
            <Todos
              userID={user.id}
              userTodoList={todos}
              onCompleteClick={handleUserTodosUpdate}
            />
            <Posts userID={user.id} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default User;
