import React from "react";
import { useParams, Navigate } from "react-router-dom";
import styles from "../app.module.css";

export const TaskDetails = ({
  tasksToRender,
  requestUpdateTask,
  requestDeleteTask,
  returnToMainPage,
  PageNotFound,
}) => {
  const { id } = useParams();
  const task = tasksToRender.find((task) => task.id === parseInt(id));

  if (!task) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <button className={styles.backButton} onClick={() => returnToMainPage()}>
        Назад
      </button>
      <h1 className={styles.taskDetailsTitle}>Детали задачи</h1>
      <div className={styles.taskDetailsTextLine}>
        <div className={styles.taskDetailsText}>{task.task}</div>
      </div>
      <button
        className={styles.deleteTaskButton}
        onClick={() => requestDeleteTask(task.id)}
      >
        Удалить
      </button>
      <button
        className={styles.updateTaskButton}
        onClick={() => requestUpdateTask(task.id, task.task)}
      >
        Обновить
      </button>
    </div>
  );
};
