import React from "react";
import styles from "../app.module.css";

export const TodoForm = ({
  handleSubmit,
  handleSearchChange,
  handleChange,
  value,
  search,
  isInputFilled,
  handleToggleSortAlphabetically,
  sortAlphabetically,
}) => {
  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Ищите задания здесь!"
          onChange={handleSearchChange}
          value={search}
        />
      </div>
      <div>
        <input
          type="text"
          className={styles.todoInput}
          placeholder="Напишите задание здесь!"
          onChange={handleChange}
          value={value}
        />
        <button
          type="submit"
          className={styles.addTaskButton}
          disabled={!isInputFilled}
        >
          Добавить задачу
        </button>
        <button
          type="button"
          onClick={handleToggleSortAlphabetically}
          className={styles.sortAlphabeticallyButton}
        >
          {sortAlphabetically ? "Выключить" : "Включить"} сортировку по алфавиту
        </button>
      </div>
    </form>
  );
};
