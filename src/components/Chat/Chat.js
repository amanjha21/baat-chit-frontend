import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Picker from "emoji-picker-react";
import TextContainer from "../TextContainer/TextContainer";

const ENDPOINT = "http://localhost:5000";
// const ENDPOINT = "https://baat-chit.herokuapp.com/";
let socket;
let typingTimer;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    const inputTextArea = document.getElementById("input");
    inputTextArea.value += emojiObject.emoji;
    setMessage(inputTextArea.value);
  };

  const emojiPickerDisplayToggle = () => {
    document.getElementById("emojiPicker").classList.toggle("emojiPicker");
  };

  //for handelling join and disconnect event
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io.connect(ENDPOINT);
    setName(name);
    setRoom(room);
    // console.log("raan", socket);

    //emitting events for join
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        // document.getElementById("outerContaner").classList.add("emojiPicker");
        alert(error);
        // console.log(error);
        window.location.href = "/";
      }
      // console.log("joined");
    });

    // // for unmounting
    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  //for handelling message event
  useEffect(() => {
    socket.on("message", (message) => {
      //push message to messages array
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    //if some one is typing on the server
    socket.on("isTyping", ({ user }) => {
      setTyping((typing) => {
        if (typing.indexOf(user) === -1) {
          // console.log(`${user} is typing`);

          return [...typing, user];
        } else {
          return typing;
        }
      });
    });
    //if some one stopped typing on the server
    socket.on("stoppedTyping", ({ user }) => {
      // console.log(`${user} stopped typing`);
      setTyping((typing) => typing.filter((eachuser) => eachuser !== user));
    });
  }, []);

  //function for sending message
  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("isNotTyping");
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  // function for typing
  const startedTyping = () => {
    clearTimeout(typingTimer);
    socket.emit("typing");
  };
  const stopedTyping = () => {
    const stopTypingEvent = () => socket.emit("isNotTyping");
    typingTimer = setTimeout(stopTypingEvent, 1000);
  };

  // console.log(message, messages);
  return (
    <>
      <div id="outerContaner" className="outerContainer">
        <div className="backgroundPattern circle"></div>
        <div className="backgroundPattern circle2"></div>
        <div className="backgroundPattern heptagon"></div>
        <TextContainer users={users} />

        <div className="container">
          <InfoBar room={room} />
          <Messages typingMessage={typing} messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            emojiPickerDisplayToggle={emojiPickerDisplayToggle}
            startedTyping={startedTyping}
            stopedTyping={stopedTyping}
          />

          {/* emoji piker */}
          <div id="emojiPicker" className="emojiPicker">
            <Picker
              className="colorPikerContainer"
              onEmojiClick={onEmojiClick}
              pickerStyle={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <h2 className="creatorName">
        Project By Aman Jha{" "}
        <span role="img" aria-label="emoji">
          💻
        </span>
      </h2>
    </>
  );
};

export default Chat;
