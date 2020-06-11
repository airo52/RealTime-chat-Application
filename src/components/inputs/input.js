import React from 'react';
 import './input.css';
const Input = ({message,setMessage,sendMessage}) =>(
    <form >
          <input value={message} onChange={(event)=>setMessage(event.target.value)}
          placeholder="type message.."
                     onKeyPress = {event => event.key === 'Enter' ? sendMessage() : null}
                  />
         <button type="button" onClick={(event)=>sendMessage(event)}>Send</button>         
    </form>
)

export default Input;