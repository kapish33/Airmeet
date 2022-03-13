import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTodoError, getTodoLoading, getTodoSuccess } from "../store/actions";
import "./Todos.css";

export const Todos = () => {
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [mid, setid] = useState(0);

  const { loading, todos, error } = useSelector(
    (state) => ({
      loading: state.loading,
      todos: state.todos,
      error: state.error,
    }),
    function (prev, curr) {
      if (prev.loading === curr.loading && prev.error === curr.error) {
        return true;
      }
      return false;
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos();
  }, [page, mid]);

  async function getTodos() {
    try {
      dispatch(getTodoLoading());
      const data = await fetch(
        `https://bikeapis.herokuapp.com/airmeets?page=${page}&limit=10`
      ).then((d) => d.json());
      dispatch(getTodoSuccess(data.airmeets));
      setLastPage(data.size);
    } catch (err) {
      dispatch(getTodoError());
    }
  }
  const handelHighLight = (id) => {
    var requestOptions = {
      method: "PATCH",
      redirect: "follow",
    };

    fetch(`https://bikeapis.herokuapp.com/airmeets/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setid(mid + 1);
      })
      .catch((error) => console.log("error", error));
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div>
      <button
        disabled={page < 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Previos Page
      </button>
      <button
        disabled={lastPage / 10 <= page}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next Page
      </button>
      {todos.map((e) => (
        <div
          onClick={() => {
            handelHighLight(e._id);
          }}
          className={e.Highlight ? "makeHighlight" : "makeNonHighlight"}
        >
          {e.Description}
        </div>
      ))}
    </div>
  );
};
