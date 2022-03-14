import { useState, useEffect } from "react";
import Formulario from "./Formulario";
import Todo from "./Todo";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos((old) => [...old, todo]);
    };
    
    const deleteTodo = (id) => {
        setTodos((old) => old.filter((item) => item.id !== id));
    };

    const editarTodo = (id) => {
        const editTodo = todos.map((item) =>
            item.id === id ? { ...item, estado: !item.estado } : item
        );
        setTodos(editTodo);
    };

    useEffect(() => {
        // console.log("Leer todos local");
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
    }, []);
    
    useEffect(() => {
        // console.log("Guardar todo local");
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <>
            <Formulario addTodo={addTodo} />
            <h2 className="text-decoration-underline d-flex justify-content-center">TodoList</h2>
            <ul className="list-group list-group-numbered">
                {todos.map((item) => (
                    <Todo key={item.id} todo={item} deleteTodo={deleteTodo} editarTodo={editarTodo}/>
                ))}
            </ul>
        </>
    );
};

export default TodoList;