import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Favoutite = () => {
  // get data from local storage
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const navigate = useNavigate();

  return (
    <>
      <button
        className="myclass"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/highlighted");
        }}
      >
        Back
      </button>
      <div className="display">
        {data.map((e) => (
          <div
            onClick={() => {
              // remove this item form local storage
              let data = localStorage.getItem("data");
              data = JSON.parse(data);
              data = data.filter((item) => item._id !== e._id);
              localStorage.setItem("data", JSON.stringify(data));
              setData(data);
            }}
            key={e._id}
            className={
              e.Highlight ? "makeHighlight common" : "makeNonHighlight common"
            }
          >
            <img src={e.Image} alt="" />
            ❤️
            <br />
            <br />
            {e.Description} <button>Remove Element</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favoutite;
