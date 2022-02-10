import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { faLaugh, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewMessage = ({ socket, url }) => {
  const [text, setText] = useState("");
  const userinfo = JSON.parse(localStorage.getItem("user_meet"));
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("msgToServer", { name: userinfo.user, room: url, text: text });
    setText("");
  };

  return (
    <div className="chat-input">
      <form onSubmit={submitForm} className="chat-form">
        <Input
          autoFocus
          value={text}
          className="chat-input-text"
          placeholder="Escribe tu mensaje"
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <Button type="submit" >
          <FontAwesomeIcon
            icon={faPaperPlane}
          />
        </Button>
      </form>
    </div>
  );
};

export default NewMessage;
