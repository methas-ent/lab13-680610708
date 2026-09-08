import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState , useEffect } from "react";
import { FaChartLine, FaListCheck, FaCircleCheck } from "react-icons/fa6";

const STORAGE_KEY = "lecture13.tasks";

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}


function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  // เซฟลง localStorage ทุกครั้งที่ tasks เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);


  const handleAdd = (newTask: TaskCardProps) => {
    // console.log("TODO handleAdd", newTask);
    setTasks([...tasks,newTask]);
  };

  const deleteTask = (taskId: string) => {
    // console.log("TODO deleteTask", taskId);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    // console.log("TODO toggleDoneTask", taskId);
    setTasks(
      tasks.map((t)=> (t.id === taskId ? {...t, isDone: !t.isDone} : t))
    );
  };

  const doneTasks = tasks.filter((task) => task.isDone).length;
  const completionRate = tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        {/* <span className="m-2">All : ({tasks.length}) Done : ({tasks.filter((t) => t.isDone === true).length})</span> */}
        <div className="row g-3 my-4 text-start">
          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 text-bg-primary">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">ALL TASKS</p>
                  <h3 className="mb-0 fw-bold">{tasks.length}</h3>
                </div>
                <FaListCheck size={38} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 text-bg-success">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">COMPLETED</p>
                  <h3 className="mb-0 fw-bold">{doneTasks}</h3>
                </div>
                <FaCircleCheck size={38} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-lg rounded-4">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-1 text-secondary">PROGRESS</p>
                  <FaChartLine className="text-warning" size={28} />
                </div>
                <h3 className="fw-bold mb-2">{completionRate}%</h3>
                <div className="progress" role="progressbar" aria-valuenow={completionRate} aria-valuemin={0} aria-valuemax={100}>
                  <div className="progress-bar bg-warning" style={{ width: `${completionRate}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
