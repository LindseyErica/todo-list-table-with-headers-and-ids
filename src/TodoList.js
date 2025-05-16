import React, { useState, useEffect } from "react";
import "./TodoList.css"; // Import styles

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("important");
  const [section, setSection] = useState("housekeeping");
  const [filter, setFilter] = useState("all");


  //Run everythime page loads to get tasks from local storage
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      setTasks([]); // Reset if there's an issue
    }
  }, []);
  //runs when the task list changes
  useEffect(() => {
    if (tasks.length > 0) { // Only save if tasks exist
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]); // Runs every time tasks change
  

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      category,
      section,
      started: false,
      inProgress: false,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  //takes id and status of task
  //maps through tasks to find updates tasks
  //for every task that matches the, use spread operator to update the status parameter
  //by inverting the value with the ! not operator
//[status] uses a computed property name, where the value of the variable 
// status becomes the actual key name in the object
  const toggleTaskStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, [status]: !task[status] } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const crossOutCompleted = (task) => {
    return task.completed ? "crossed-out" : "";
  };
  
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>🌸 Organized To-Do List 🌸</h1>

      {/* Task Input */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        aria-label="Enter a new task"
      />
      <select aria-label="Select Category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="important">Important</option>
        <option value="urgent">Urgent</option>
        <option value="not_urgent">Not Urgent</option>
      </select>
      <select aria-label = "Select task list section"value={section} onChange={(e) => setSection(e.target.value)}>
        <option value="housekeeping">Housekeeping</option>
        <option value="research">Research</option>
        <option value="projects">Projects</option>
      </select>
      <button onClick={addTask}>Add Task</button>

      {/* Filter Tasks */}
      <select aria-label ="Filter tasks by status"value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      {/* Task Table with Sections */}
      <table>
        <caption>Task List</caption>
        <thead>
          <tr>
            <th id="section" scope="col">Section</th>
            <th id="category" scope="col">Category</th>
            <th id="task" scope="col">Task</th>
            <th id="started" scope="col">Started</th>
            <th id="inProgress" scope="col">In Progress</th>
            <th id="completed" scope="col">Completed</th>
            <th id="actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Housekeeping Section */}
          <tr>
            <th id="housekeeping" colSpan="7" scope="colgroup">Housekeeping</th>
          </tr>
          {filteredTasks.filter(task => task.section === "housekeeping").map(task => (
            <tr key={task.id} className={crossOutCompleted(task)}>
              <td headers="section">Housekeeping</td>
              <td headers="category">{task.category.replace("_", " ")}</td>
              <td headers="task">{task.text}</td>
              <td headers="started">
                <input
                  type="checkbox"
                  checked={task.started}
                  onChange={() => toggleTaskStatus(task.id, "started")}
                    aria-label="Started"
                />
              </td>
              <td headers="inProgress">
                <input
                  type="checkbox"
                  checked={task.inProgress}
                  onChange={() => toggleTaskStatus(task.id, "inProgress")}
                  aria-label="In Progress"
                />
              </td>
              <td headers="completed">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskStatus(task.id, "completed")}
                  aria-label="Completed"
                />
              </td>
              <td headers="actions">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {/* Research Section */}
          <tr>
            <th id="research" colSpan="7" scope="colgroup">Research</th>
          </tr>
          {filteredTasks.filter(task => task.section === "research").map(task => (
            <tr key={task.id} className={crossOutCompleted(task)}>
              <td headers="section">Research</td>
              <td headers="category">{task.category.replace("_", " ")}</td>
              <td headers="task">{task.text}</td>
              <td headers="started">
                <input
                  type="checkbox"
                  checked={task.started}
                  onChange={() => toggleTaskStatus(task.id, "started")}
                    aria-label="Started"
                />
              </td>
              <td headers="inProgress">
                <input
                  type="checkbox"
                  checked={task.inProgress}
                  onChange={() => toggleTaskStatus(task.id, "inProgress")}
                  aria-label="In Progress"
                />
              </td>
              <td headers="completed">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskStatus(task.id, "completed")}
                  aria-label="Completed"
                />
              </td>
              <td headers="actions">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {/* Projects Section */}
          <tr>
            <th id="projects" colSpan="7" scope="colgroup">Projects</th>
          </tr>
          {filteredTasks.filter(task => task.section === "projects").map(task => (
            <tr key={task.id} className={crossOutCompleted(task)}>
              <td headers="section">Projects</td>
              <td headers="category">{task.category.replace("_", " ")}</td>
              <td headers="task">{task.text}</td>
              <td headers="started">
                <input
                  type="checkbox"
                  checked={task.started}
                  onChange={() => toggleTaskStatus(task.id, "started")}
                  aria-label="Started"
                />
              </td>
              <td headers="inProgress">
                <input
                  type="checkbox"
                  checked={task.inProgress}
                  onChange={() => toggleTaskStatus(task.id, "inProgress")}
                    aria-label="In Progress"
                />
              </td>
              <td headers="completed">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskStatus(task.id, "completed")}
                    aria-label="Completed"
                />
              </td>
              <td headers="actions">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
