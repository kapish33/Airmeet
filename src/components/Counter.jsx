import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/actions";

export const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button
        onClick={() => {
          dispatch(addTodo(1));
        }}
      >
        Add 1
      </button>
    </div>
  );
};
