import React from 'react';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
const ROOT_CSS=({
    height: 525,
    
  });
   
const Messages = ({messages,friend,name}) =>(
<ScrollToBottom className={ROOT_CSS}>
    {messages.map((message,i)=><div key={i}>
         <Message message={message} friend={friend} name={name}/> 
    </div>)}
</ScrollToBottom>
);
export default Messages;