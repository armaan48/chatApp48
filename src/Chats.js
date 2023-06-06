import React , {useState , useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom"

function Chats({socket , username, room}) {
    const [currentMessage , setCurrentMessage] = useState('');
    const [ chatHistory, setchatHistory] = useState([]);

    const sendMessage  = async  () => {
        if (currentMessage!==""){
            const messageD = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send-message" , messageD);
            setchatHistory((list)=>[...list , messageD]);
            
            setCurrentMessage("");
        }
    
    }
    useEffect(()=>{
        socket.on("recieve-message" , (data)=>{
            setchatHistory((list)=>[...list , data]);
        });
    },[socket])
  return (
    <div className='chat-window'>
        <div className="chat-header"> 
            <p>Room {room}</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>

            {chatHistory.map((msg)=>{
                return (
                    <div className='message' id={username===msg.author ? "other":"you"}>
                        <div>
                        <div className='message-content'>  
                            {msg.message}
                        </div>

                        <div className='message-meta'> 

                            <p id="time"> {msg.time}</p>
                            <p id="author"> {msg.author}</p>
                        </div>
                        </div>
                    </div>

                )
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer"> 
            <input type="text" placeholder="hey.."  onChange={(e)=>{
                setCurrentMessage(e.target.value);
            }} onKeyDown={(e)=>{
                if (e.key==="Enter"){
                    sendMessage() ;
                }
            }}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>

    </div>
  )
}

export default Chats