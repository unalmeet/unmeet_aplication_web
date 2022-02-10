import "./Chat.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function MainChat(props) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem('user_meet'))
    console.log(userinfo)
    const newSocket = io(process.env.REACT_APP_CHATSOCKET_URL, {
      auth: { id: userinfo.user, token: userinfo.token },
    });
    newSocket.io.engine.id = "1";
    newSocket.emit("joinRoom", props.url);

    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <div>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} url={props.url} />
          <MessageInput socket={socket} url={props.url}/>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default MainChat;
