import React from "react";

const TaskItem = ({ task, toggleComplete, deleteTask, startEditing }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Priorité : {task.priority}</p>
      <button onClick={() => toggleComplete(task.id)}>
        {task.completed ? "Marquer comme non terminé" : "Marquer comme terminé"}
      </button>
      <button onClick={() => startEditing(task)}>Modifier</button>
      <button onClick={() => deleteTask(task.id)}>Supprimer</button>
    </div>
  );
};

export default TaskItem;
