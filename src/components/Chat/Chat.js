import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';
import { Picker } from 'emoji-mart';
import axios from 'axios';
import USERS from '../Users/users.jsx';
import Mess from '../server_mess/message.js';
import Head from '../head/head';
import './chat.css';
import './emoji-mart.css';
import Messages from '../messages/messages.js';

let socket = io('http://localhost:4000', {transports: ['websocket']});
const Chat = ({Name,rroom}) =>{
    const {typing,setTyping} = useState('');
    const {userTyping,setTy} = useState('');
    const [Box,setBox] = useState(false);
    const [MesageBox,setMesssageBox] = useState(false);
    const [server,setServer] = useState(false);
    const [selectedUser,setSelected]=useState('');
    const [name,setName] = useState('');
    const [friendName,setFName] = useState('');
    const [FriendImage,setImage] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [Messs,setMesss] = useState([]);
    const {feed,setLive} = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:4000';

   
useEffect(() => {
 const name = Name;
 const room = rroom;
        
 socket = io.connect(ENDPOINT);
 setRoom(room);
 setName(name);
 socket.emit('joins',{name,room}, () =>{
 });
 return () =>{
 socket.emit('disconnect');
 socket.off();
 }
    }, [ENDPOINT]);

useEffect(()=>{
 if(message !==''){
 socket.emit('typing',selectedUser,rroom);
 }else{
 socket.emit('typingStop',selectedUser,rroom);
 console.log('off');
}  },[message]);

useEffect(()=>{
   

    
 socket.on('typing',(USER)=>{
 setBox(true);
 setTyping(USER);
 setTy('ok');        
 });
socket.on('stoped',(USER)=>{
 setBox(false);
});

socket.on('mes',(feed)=>{
    //alert(feed.feed);
    //console.log(feed.feed);
    setLive(feed);
    });
  console.log(feed)  

socket.on('message',(message)=>{
setMessages([...messages,message]);
})
},[messages]);

const Typing = (e)=>{
setMessage(e.target.value);
}

const sendMessage = (event) =>{
 //event.preventDefault();
 const to = selectedUser;
 const from = room;
 if(message){
 socket.emit('sendMessage',message,to,from,()=>setMessage(''));         
 }
}

const  openEmoji=e=>{
 document.getElementById('rightNav').style.width="350px";  
}

const Close =e=>{
 document.getElementById('rightNav').style.width="0px"; 
}
const addEmoji = e => {
 let emoji = e.native;
  setMessage(message + emoji);
};

const statChat=(username,phone,avatar)=>{
  
   
 setMessages([]);
 setSelected(phone);
 setImage(avatar);
 setFName(username);
 const user = phone;
 const loged = rroom;

    axios({
    method:'GET',
    url:'http://localhost:4000/message',
    })
    .then((response)=>{
    setMesss(response.data);
    })
      
    if(messages){
    socket.emit('live',user,loged,()=>setLive(''));  

 setMesssageBox(true);
 setServer(true);
 }
 } 
 const User = room;
 return(
  <div className="">
  <div id="Profiles" className="Profiles">
  {User !='' ?<USERS  Nami={User} stat={statChat}/>:''}
  </div>
  {MesageBox && <div  id="section" className="section">
  {Box?(<div>typing</div>):null}
  <Head imageProfile={FriendImage} typed={userTyping} status={feed} friendPhone={selectedUser} friendsName={friendName}/>
  <div id="body" className="body">
   {server && <span><Mess room={room} Messs={Messs} friend={selectedUser}/></span>}
  {/*<Input message={message} setMessage={setMessage} sendMessage={setMessage}/>*/}
  <Messages  messages={messages} friend={selectedUser} name={room}/>
  </div>

    <form >
    <div className="foot">
    <div className="form-group">
    <span className="emojis">
    <i class="fa fa-smile-o" onClick={openEmoji} aria-hidden="true"></i>
    </span>
    <div id="rightNav" className="rightNav">
    <span onClick={Close} className="close">&times;</span>
    <Picker onSelect={addEmoji}/>
    </div> 
    <textarea value={message} onChange={Typing}
    placeholder="type message.."
    onKeyPress = {event => event.key === 'Enter' ? sendMessage() : null}
    />
    <button className="btnSend" type="button" onClick={(event)=>sendMessage(event)}>Send</button>
    </div>
          
    </div>     
    </form>
    </div>
}
    </div>
        
    )
}
export default Chat;