import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CircularProgress } from "@mui/material";

const Highlighted = () => {
  const [array, setArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [mid, setMid] = React.useState(0);
  const navigate = useNavigate();
  const [favCount, setFavCount] = React.useState(0);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://bikeapis.herokuapp.com/airmeets/highlight", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setArray(result.airmeets);
        setIsLoading(false);
      })

      .catch((error) => console.log("error", error));
  }, [mid, isLoading, mid]);
  const handelDelete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`https://bikeapis.herokuapp.com/airmeets/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMid(mid + 1);
      })
      .catch((error) => console.log("error", error));
  };
  const handelHighLight = (id) => {
    var requestOptions = {
      method: "PATCH",
      redirect: "follow",
    };

    fetch(`https://bikeapis.herokuapp.com/airmeets/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMid(mid + 1);
      })
      .catch((error) => console.log("error", error));
  };
  return isLoading ? (
    <div className="centerFresh">
      <CircularProgress />
    </div>
  ) : (
    <>
      <div>
        <button
          className="myclass"
          onClick={() => {
            navigate("/favourite");
          }}
        >
          ❤️ Favourite
        </button>
        <button
          className="myclass"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <span>{favCount}</span>
        <div className="display">
          {array.map((e) => (
            <div
              key={e._id}
              className={
                e.Highlight ? "makeHighlight common" : "makeNonHighlight common"
              }
            >
              <button
                onClick={() => {
                  handelDelete(e._id);
                }}
              >
                <DeleteIcon /> Delete
              </button>
              <button
                onClick={() => {
                  handelHighLight(e._id);
                }}
              >
                Remove Highlight
              </button>
              <button
                style={{
                  borderRadius: "50px",
                }}
                onClick={() => {
                  // set to local storage if its already exist then add behind it as array
                  let data = localStorage.getItem("data");
                  if (data) {
                    data = JSON.parse(data);

                    data.push(e);
                    localStorage.setItem("data", JSON.stringify(data));

                    setFavCount(favCount + 1);
                  }
                  // if not exist then set it as array
                  else {
                    localStorage.setItem("data", JSON.stringify([e]));
                  }
                }}
              >
                <FavoriteIcon style={{ color: "red" }} /> Set As Favorite
              </button>
              <img
                style={{
                  boxShadow: "0px 0px 10px #FFFFFF",
                }}
                src={e.Image}
                alt=""
              />
              <br />
              <br />
              <div
                style={{
                  border: "1px solid white",
                  padding: "10px",
                }}
              >
                {e.Description}{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Highlighted;
