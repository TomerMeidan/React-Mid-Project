import { useEffect, useState } from "react";

const Todos = ({ userTodoList }) => {
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    setUserTodos(userTodoList), [userTodoList];
  });
  return (
    <div>
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
                  <button style={{marginLeft: 40}}>Complete Task</button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Todos;
