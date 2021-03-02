import React from "react";
import "./Input.css";

const Input = ({
  message,
  setMessage,
  sendMessage,
  emojiPickerDisplayToggle,
  startedTyping,
  stopedTyping,
}) => {
  return (
    <form className="form" autoComplete="off">
      <p className="emoji" onClick={emojiPickerDisplayToggle}>
        🙂
      </p>
      <input
        id="input"
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => {
          startedTyping();
          return setMessage(value);
        }}
        onKeyPress={(event) => {
          return event.key === "Enter" ? sendMessage(event) : null;
        }}
        // onKeyDown={startedTyping}
        onKeyUp={stopedTyping}
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        Send
      </button>
    </form>
  );
};

export default Input;
