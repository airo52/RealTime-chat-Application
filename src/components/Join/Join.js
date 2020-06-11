import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import Register from '../Register/register';
import Chat from '../Chat/Chat';
import axios from 'axios';
import './join.css';

class Join extends Component{
   state={
      loged:false,
      notLoged:true,
      name:'',
      Room:'',
      room:'',
      login:true,
      register:false
     
   }
   handleName=e=>{
     this.setState({name:e.target.value});
   }
   handelRoom=e=>{
      this.setState({room:e.target.value});
   }
   handleLog=e=>{
    this.setState({login:true,register:false});
   }
   handleReg=e=>{
      this.setState({login:false,register:true});
   }
   Login=e=>{
      e.preventDefault();
      axios({
        method:'GET',
        //http://localhost:4000/Login?username=tony&password=mmm
        url:`http://localhost:4000/Login?username=${this.state.name}&password=${this.state.room}`,
      })
      .then((response)=>{
          const data = response.data;
          if(data.feedback==='logged'){
             this.setState({Room:data.phone});
               this.setState({loged:true,notLoged:false});
              // alert('ok');
              // {this.state.loged && <Redirect to={`/Chat?name=${this.state.name}&room=${this.state.Room}`}/>}   
          }
     
      })
     

   }
render(){
   return(
      <React.Fragment>
         {this.state.notLoged &&
      <div className="joinOuterContainer">
         <div className="hContainer"><button onClick={this.handleLog} className="headings">Login</button><button onClick={this.handleReg} className="heading">Register</button></div>
      <div className="joinInerContainer">
          {this.state.login && <span> 
                 <center><h2>Login</h2></center>
                 <br/>
        
         <div><input type="text" placeholder="username" className="joinInput" onChange={this.handleName}></input></div>
         <div><input type="text" placeholder="password" className="joinInput mt-20" onChange={this.handelRoom}></input></div>
         
        
         <button onClick={this.Login} className="button mt-20">Login</button>
          </span> }
          {this.state.register && <Register/>}
         
      </div>
      
   </div>}
   {this.state.loged &&  <Chat Name={this.state.name} rroom={this.state.Room}/>}
   </React.Fragment>
      
   )
}
}
export default Join;
