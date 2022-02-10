import React, { useEffect, useState } from "react";
import './Chat.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Messages({ socket, url }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({ status: false, user: "" });
  const link = url;
  useEffect(() => {
    const messageListener = (message) => {
      console.log(message);
      if (message.room == link) {
        messages.push(message);
        setMessages([...messages]);
      }
    };
    const joinListener = (user) => {
      setNotification({
        status: true,
        message: "Se conectó el usuario",
        user: user,
      });
    };

    const leftListener = (user) => {
      setNotification({
        status: true,
        message: "Se desconectó el usuario",
        user: user,
      });
    };
    const usersListener = (response) => {
      setUsers(JSON.parse(response));
    };
    socket.on("joinedRoom", joinListener);
    socket.on("leftRoom", leftListener);
    socket.on("msgToClient", messageListener);
    socket.on("usersInRoom", usersListener);
    return () => {
      socket.off("joinedRoom", joinListener);
      socket.off("leftRoom", leftListener);
      socket.off("msgToClient", messageListener);
      socket.off("usersInRoom", usersListener);
    };
  }, [socket, messages, users, notification]);

  return (
    <div className="chat-messages-container">
      {[...Object.values(messages)].map((message) => (
        <div className="chat-message-box">
          <span className="user">{message.name} :&nbsp;</span>
          <span className="message">{message.text}</span>
        </div>
      ))}
      <div>
        Usuarios conectados
        {users.map((user) => (
          <div className="user-container">
            <span className="user"><FontAwesomeIcon icon={faUser} color="#61B329" /> {user.handshake.auth.id}</span>
          </div>
        ))}
      </div>
      {notification.status ? (
        <div>
          {notification.message}: {notification.user}
          <button onClick={() => setNotification({ status: false, user: "" })}>
            {" "}
            cerrar{" "}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Messages;
