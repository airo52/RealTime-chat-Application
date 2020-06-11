import React from 'react';
import reactEmoji from 'react-emoji';
import './Message.css';
const MeSsage = ({message:{receiver,sender,text},friend,name}) =>{
  //const MeSsage = ({message:{sender,message,receiver},friend,name}) =>{
  //console.log(message)
let isSentByCurrentUser = false;
let isentByfriend = false;

//const trimmedName = name.trim().toLowerCase();
//const trimedFriend = friend.trim().toLowerCase();
  if(sender === name && receiver === friend){
    isSentByCurrentUser = true;
  }
  if(sender === friend && receiver === name){
    isentByfriend = true;
  }
  
  return (
    isSentByCurrentUser?(
      <div className="sender">
      
       <div className="senderMessage">
      {reactEmoji.emojify(text)}
      </div>
      </div>
  ) :isentByfriend?(
    <div className="receiver">
    
     <div className="receiverMessage">
    {reactEmoji.emojify(text)}
    </div>
    
    </div>
  ):null
  )
}

export default MeSsage;