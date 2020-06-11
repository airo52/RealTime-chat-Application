import React,{ Component } from "react";
class Register extends Component{
render(){
    return(
         <div>
                 <center><h2>Register</h2></center>
                 <br/>
             <div><input type="text" placeholder="username" className="joinInput" ></input></div>
             <br/>
             <div><input type="text" placeholder="phone" className="joinInput" ></input></div>
         <div><input type="text" placeholder="password" className="joinInput mt-20" ></input></div>
         
        
         <button  className="button mt-20">Register</button>
         </div>  
    )
}
}
export default Register;