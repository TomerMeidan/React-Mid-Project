import { useEffect, useState } from "react";

const Todos = ({ userTodoList }) => {
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    setUserTodos(userTodoList), [userTodoList];
  });
  return (
    <div style={{padding:"5px" ,border: 1, borderStyle: "solid" }}>
      {userTodos.length > 0
        ? userTodos.map((todo) => {
            return <div key={todo.id} >
                Title: {todo.title}<br/>
                Completed: {todo.completed? "true" : "false"}
                </div>;
          })
        : null}
    </div>
  );
};

export default Todos;
