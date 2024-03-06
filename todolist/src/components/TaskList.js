import React from "react";
import styles from "../app.module.css";
import { Link } from "react-router-dom";

export const TaskList = ({ tasksToRender }) => {
  return (
    <div className={styles.tasksListStyle}>
      {tasksToRender.map(({ id, task }) => (
        <div key={id} className={styles.tasks}>
          <Link to={`/task/${id}`} className={styles.tasksTextFormPage}>
            {task}
          </Link>{" "}
        </div>
      ))}
    </div>
  );
};
