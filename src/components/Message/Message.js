import React from "react";
import "./Message.css";
import * as moment from "moment";

const Message = ({ message: { user, text, date }, name }) => {
  let isSentByCurrentUser = false;
  if (user === name) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <>
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{name}</p>
        <div className="messageBox backgroundColored">
          <p className="messageText colorWhite">{text}</p>
        </div>
      </div>
      <p className="colorDark dateSend">
        {moment(date).local().format("h:mm A")}
      </p>
    </>
  ) : (
    <>
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10">{user}</p>
      </div>
      <p className="colorDark dateReceive">
        {moment(date).local().format("h:mm A")}
      </p>
    </>
  );
};

export default Message;
