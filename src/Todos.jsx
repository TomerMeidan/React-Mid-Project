import { useEffect, useState } from "react";
import { updateObjectByID, getObjectByID } from "./utils";

const Todos = ({ userTodoList, onCompleteClick, userID }) => {
  const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

  const [userTodos, setUserTodos] = useState([]);
  const [updatedTodo, setUpdatedTodo] = useState("");

  useEffect(() => {
    buildUserTodos();
  }, []);

  const buildUserTodos = async () => {
    const { data: todos } = await getObjectByID(TODOS_URL, user.id, 5);
    setUserTodos(todos);
  };

  useEffect(() => {
    updatedTodo != ""
      ? sendToUpdate(TODOS_URL, updatedTodo.id, updatedTodo)
      : null;
  }, [updatedTodo]);

  const toggleComplete = (todo) => {
    return {
      ...todo,
      completed: !todo.completed,
    };
  };
  async function sendToUpdate(TODOS_URL, id, updatedTodo) {
    await updateObjectByID(TODOS_URL, id, updatedTodo)
      .then(() => console.log(`Updated TODO id ${id}`))
      .catch((err) => {
        console.log(err);
      });
  }
  const handleCompleteClick = (id) => {
    let updatedTodo = null;

    const updatedUserTodos = userTodos.map((todo) => {
      if (todo.id === id) {
        updatedTodo = toggleComplete(todo);
        setUpdatedTodo(updatedTodo);
        return updatedTodo;
      }
      return todo;
    });

    setUserTodos(updatedUserTodos);
  };

  useEffect(() => {
    setUserTodos(userTodoList);
  }, []);

  useEffect(() => {
    userTodos.length > 1 ? onCompleteClick(userTodos) : null;
  }, [userTodos]);

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <b>User id {userID} TodoList</b>
      <button>Add</button>
      </div>
      {userTodos.length > 0
        ? userTodos.map((todo) => {
            return (
              <div className="todos-box" key={todo.id}>
                <p>
                  <b>Title:</b> {todo.title}
                </p>

                <div className="completed-box">
                  <p>
                    <b>Completed:</b> {todo.completed ? "true" : "false"}
                  </p>
                  <button
                    onClick={() => handleCompleteClick(todo.id)}
                    style={{ marginLeft: "auto" }}
                  >
                    Complete Task
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Todos;
