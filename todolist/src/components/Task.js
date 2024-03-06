import React from "react";
import styles from "../app.module.css";

export const Task = ({ id, task, requestDeleteTask, requestUpdateTask }) => {
  return (
    <div key={id} className={styles.tasks}>
      <div className={styles.tasksText}>{task}</div>
      <button
        onClick={() => requestDeleteTask(id)}
        className={styles.deleteTaskButton}
      >
        Удалить задачу
      </button>
      <button
        onClick={() => requestUpdateTask(id, task)}
        className={styles.updateTaskButton}
      >
        Обновить задачу
      </button>
    </div>
  );
};
