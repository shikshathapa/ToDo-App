import  { useState, useEffect } from "react";
import "./Home.css";
import Task from "./Task";

const Home = () => {
  const initialArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(initialArray);
  const [dragging, setDragging] = useState(null);

  const handler = (e) => {
    e.preventDefault();
    const newTask = { title, description };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const onDragStart = (e, index) => {
    setDragging(index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    const draggedTask = tasks[dragging];
    const remainingTasks = tasks.filter((_, i) => i !== dragging);

    const reorderedTasks = [
      ...remainingTasks.slice(0, index),
      draggedTask,
      ...remainingTasks.slice(index),
    ];

    setTasks(reorderedTasks);
    setDragging(null);
    localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="home">
      <h1>TO DO LIST</h1>
      <form onSubmit={handler}>
        <input
          value={title}
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={description}
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button>ADD TASK</button>
      </form>

      <div className="tasks-container">
        {tasks.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, index)}
            className="draggable-task"
          >
            <Task
              title={item.title}
              description={item.description}
              deleteTask={() => deleteTask(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
