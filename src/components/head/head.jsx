import React,{ Component } from 'react';
import './head.css';
class head extends Component {
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  
render(){
    return(
        <div className="head">
        <span className="emoji">
          <i class="fa fa-search" aria-hidden="true"></i>
          <i class="fa fa-paperclip" aria-hidden="true"></i>
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </span>


        <span className="image">
          <img src={this.props.imageProfile} alt="" srcset=""/>                 
        </span>
        <div className="stateTime">
        <span>{this.props.friendsName}
        </span>
        <br/>
          {this.props.status}
          </div> 


        </div>
    )
}
}
export default head;