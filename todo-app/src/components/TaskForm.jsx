import React, { useState } from "react";

const TaskForm = ({ addTask, editTask, taskToEdit }) => {
  const [name, setName] = useState(taskToEdit ? taskToEdit.name : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [priority, setPriority] = useState(
    taskToEdit ? taskToEdit.priority : "moyenne"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      const task = {
        id: taskToEdit ? taskToEdit.id : Date.now(),
        name,
        description,
        priority,
        completed: false,
      };
      taskToEdit ? editTask(task) : addTask(task);
      setName("");
      setDescription("");
      setPriority("moyenne");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de la tâche"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description de la tâche"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="haute">Haute</option>
        <option value="moyenne">Moyenne</option>
        <option value="basse">Basse</option>
      </select>
      <button type="submit">{taskToEdit ? "Modifier" : "Ajouter"} Tâche</button>
    </form>
  );
};

export default TaskForm;
