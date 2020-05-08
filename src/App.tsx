import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTodos } from "./redux/actions";

import TodoFilter from "./components/TodoFilter";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Grid } from "@material-ui/core";

import "./styles.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TodoFilter />
        </Grid>
        <Grid item xs={12}>
          <AddTodo />
        </Grid>
        <Grid item xs={12}>
          <TodoList />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
