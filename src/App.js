import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chats from './Chats.js'


const socket = io.connect("https://chatappserver48.onrender.com/");

function App() {
  const [username , setUsername] = useState("");
  const [room , setRoom] = useState("");
  const [showChat , setShowChat] = useState("");

  function joinRoom(){
    if (username!=="" && room!==""){
      socket.emit("join-room" , room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat? (
      <div className="joinChatContainer">

        <h3>Join A Chat</h3>
        <input type="text" placeholder="Armaan..." onChange={(e)=>{
          setUsername(e.target.value);
        }} />
        <input type="text" placeholder="Room ID..." onChange={(e)=>{
          setRoom(e.target.value);
        }} />
        <button onClick={joinRoom}> Join A Room</button>
      </div>):
      (
      <Chats socket={socket} username={username}  room={room} />
      )}
    </div>
  );
}

export default App;
