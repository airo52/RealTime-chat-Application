import React,{ Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            User:[],
            chat:'',
            LogedUser:'',
        }
    }
   
    
    componentDidMount(){
        console.log(this.props.Nami);
        const phone = this.props.Nami;
        if(phone !=''){
            axios({
                method:'GET',
                //http://localhost:4000/Login?username=tony&password=mmm
                url:`http://localhost:4000/Users?phone=${phone}`,
              })
              .then((response)=>{
                  const data = response.data;
                  this.setState({User:data});
                  
              })

              axios({
                method:'GET',
                //http://localhost:4000/Login?username=tony&password=mmm
                url:`http://localhost:4000/User?phone=${phone}`,
              })
              .then((response)=>{
                  const data = response.data;
                  this.setState({LogedUser:data});
                console.log(data);
                  
              })


            }
    
    }
   
    stat=(username)=>{
        //alert(username,'hello');
    }
    
    allUsers = ({username,phone,avatar})=><div className="userProfile">
               <button onClick={(event)=>this.props.stat(username,phone,avatar)} className="userPrbtn">
               <span className="image">
               <img src={avatar} alt="avatar" srcset=""/>
                </span>
               <span id="namE" className="userName">
                {username}
              </span> 
              <span className="badge">3</span> 
                </button>  
               </div>;  
render(){

    const {User} = this.state;
    return(
        <div>
            <div>
                
                <div className="sideHead">
                <span>
   
</span>
                <span className="image">
               <img src={this.state.LogedUser} alt="avatar" srcset=""/>
                </span>
                <i class="fa fa-ellipsis-v" onClick={this.handleOpenPaper} aria-hidden="true"></i>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <div></div>
                
                   
                </div>
                <div className="USERS">
                    <div><input type="search" className="form-control"/></div>
                    <div className="fa fa-plus"></div>
                {User.map(this.allUsers)}
            </div>
             </div>
        </div>
    )
}
}
export default Users