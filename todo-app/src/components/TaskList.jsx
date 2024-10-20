import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setTaskToEdit(task);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const priorities = { haute: 3, moyenne: 2, basse: 1 };
    return priorities[b.priority] - priorities[a.priority];
  });

  return (
    <div>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
      <div className="task-list">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditing={startEditing}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
