import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTodoError, getTodoLoading, getTodoSuccess } from "../store/actions";
import "./Todos.css";

export const Todos = () => {
  const navigate = useNavigate();
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
    <div className="upperClass">
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
      <span
        className="highlightedNav"
        onClick={() => {
          navigate("/highlighted");
        }}
      >
        Highlighted Items
      </span>
      <div className="display">
        {todos.map((e) => (
          <div
            key={e._id}
            onClick={() => {
              handelHighLight(e._id);
            }}
            className={
              e.Highlight ? "makeHighlight common" : "makeNonHighlight common"
            }
          >
            <img src={e.Image} alt="" />
            ClickMe To Chekcked
            <input
              style={{
                backgroundColor: e.Highlight ? "red" : "green",
              }}
              type="checkbox"
              checked={e.Highlight}
              name="checkME"
              id="checkME"
            />
            <br />
            <br />
            {e.Description}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};
