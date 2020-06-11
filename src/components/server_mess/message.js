import React,{ Component } from 'react';
import reactEmoji from 'react-emoji';
import axios from 'axios';
class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            User:[],
            chat:'',
        }
    }
  
    componentDidMount(){
        const name = this.props.Nami;
            axios({
                method:'GET',
                //http://localhost:4000/Login?username=tony&password=mmm
                url:`http://localhost:4000/message`,
              })
              .then((response)=>{
                  const data = response.data;
                  this.setState({User:data});
                  
                  //console.log(data)
                  
              })
    
    }
MM = ({receiver,sender,text})=>receiver == this.props.room && sender == this.props.friend ?
<div className="receiver">
      
      <div className="receiverMessage">
     {reactEmoji.emojify(text)}
     </div>
     </div> : receiver == this.props.friend && sender == this.props.room ?
     <div className="sender">
        <div className="senderMessage">
    {reactEmoji.emojify(text)}
    </div>
     </div>
     :null;
  
render(){
   // console.log(this.state.User);
    const {User} = this.state;
    return(
        <div className="Mes">
            {User.map(this.MM)}
        </div>
    )
}
}
export default Users