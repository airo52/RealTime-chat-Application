
import React from 'react';
import './infoBar.css';
//import onlineIcon from '../../icons/nee.svg';
//import closeIcon from '../../icons/nee.svg';

const InfoBar = ({room}) =>(
    <div className="infoBars">
       <div className="leftInnerContainer">
        
<h3>{room}</h3>
       </div>
       <div className="rightInnerContainer">
           
       </div>

   </div>
);
export default InfoBar;

