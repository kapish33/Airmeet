import React, { useEffect } from "react";

const Highlighted = () => {
  const [array, setArray] = React.useState([]);
  const [mid, setMid] = React.useState(0);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://bikeapis.herokuapp.com/airmeets/highlight", requestOptions)
      .then((response) => response.json())
      .then((result) => setArray(result.airmeets))
      .catch((error) => console.log("error", error));
  }, [mid]);
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
  return (
    <div>
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
              Delete
            </button>
            <button
              onClick={() => {
                // set to local storage if its already exist then add behind it as array
                let data = localStorage.getItem("data");
                if (data) {
                  data = JSON.parse(data);
                  data.push(e);
                  localStorage.setItem("data", JSON.stringify(data));
                }
                // if not exist then set it as array
                else {
                  localStorage.setItem("data", JSON.stringify([e]));
                }
              }}
            >
              Set As Favorite
            </button>
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

export default Highlighted;
