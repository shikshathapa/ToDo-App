import "./Home.css";

const Task = ({ title, description, deleteTask, index }) => {
  return (
    <div className="container">
      <div className="info">
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div>
        <button onClick={() => deleteTask(index)}>
          <i className="fas fa-trash"></i> 
        </button>
      </div>
    </div>
  );
};

export default Task;
