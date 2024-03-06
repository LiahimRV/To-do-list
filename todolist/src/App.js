import React, { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TaskList } from "./components/TaskList";
import styles from "./app.module.css";
import { TaskDetails } from "./components/TaskDetails";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

export const App = () => {
  const [todolistData, setTodolistData] = useState([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [refreshListFlag, setRefreshListFlag] = useState(false);
  const refreshList = () => setRefreshListFlag(!refreshListFlag);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleToggleSortAlphabetically = () => {
    setSortAlphabetically(!sortAlphabetically);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isInputFilled) {
      addNewTasks();
    }
    setValue("");
  };

  useEffect(() => {
    fetch("http://localhost:3004/todos-list")
      .then((loadedData) => loadedData.json())
      .then((loadedInform) => {
        setTodolistData(loadedInform);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [refreshListFlag]);

  const addNewTasks = () => {
    fetch("http://localhost:3004/todos-list", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ task: value }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((responce) => {
        console.log(responce);
        refreshList();
      });
  };

  const requestUpdateTask = (id, currentTask) => {
    const newTaskText = prompt("Введите новую задачу!", currentTask);
    if (newTaskText !== null) {
      fetch(`http://localhost:3004/todos-list/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ task: newTaskText }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((responce) => {
          console.log(responce);
          refreshList();
        });
    }
  };

  const requestDeleteTask = (id) => {
    fetch(`http://localhost:3004/todos-list/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((rawResponse) => rawResponse.json())
      .then((responce) => {
        console.log(responce);
        refreshList();
        returnToMainPage();
      });
  };
  const returnToMainPage = () => {
    navigate("/");
  };

  const isInputFilled = value.trim() !== "";
  const filteredTasks = todolistData.filter(({ task }) =>
    task.includes(search)
  );
  let tasksToRender = filteredTasks;
  if (sortAlphabetically) {
    tasksToRender = tasksToRender.sort((a, b) => a.task.localeCompare(b.task));
  }

  const NotFoundPage = () => {
    return (
      <div>
        <button
          className={styles.backButton}
          onClick={() => returnToMainPage()}
        >
          Назад
        </button>
        <h1 className={styles.pageNotFoundErrorMessage}>
          Error 404: Страница не найдена
        </h1>
      </div>
    );
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/task/:id"
          element={
            <TaskDetails
              tasksToRender={tasksToRender}
              requestDeleteTask={requestDeleteTask}
              requestUpdateTask={requestUpdateTask}
              returnToMainPage={returnToMainPage}
            />
          }
        />
        <Route
          path="/"
          element={
            <>
              <TodoForm
                handleSubmit={handleSubmit}
                handleSearchChange={handleSearchChange}
                handleChange={handleChange}
                value={value}
                search={search}
                isInputFilled={isInputFilled}
                handleToggleSortAlphabetically={handleToggleSortAlphabetically}
                sortAlphabetically={sortAlphabetically}
              />
              <TaskList
                tasksToRender={tasksToRender}
                requestDeleteTask={requestDeleteTask}
                requestUpdateTask={requestUpdateTask}
              />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
