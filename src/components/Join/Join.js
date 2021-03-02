import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">
          <span className="coloured">Baat-Chit</span> Realtime Group Chat
          Application{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <h2 className="subHeading">Join an existing room</h2>
          <select
            name="rooms"
            className="joinInput "
            onChange={(event) => setRoom(event.target.value)}
          >
            <option value="">--Select--</option>
            <option value="Room 1">Room 1</option>
            <option value="Room 2">Room 2</option>
            <option value="Room 3">Room 3</option>
            <option value="Pact">Pact</option>
          </select>
        </div>
        <div>
          <h2 className="subHeading">or create a new room</h2>
          <input
            placeholder="Room"
            className="joinInput"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Join Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
