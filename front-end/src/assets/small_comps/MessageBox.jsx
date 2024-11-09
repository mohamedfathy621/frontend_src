import PropTypes from "prop-types";
import { useState,useEffect } from "react";
const MessageBox= ({notification}) =>{
    const [message,setMessage]= useState(notification[0])
  
    useEffect(()=>{
        setMessage(notification[0])
    },[notification])
    if(message.length==0){
        return(
            null
        )
    }
    else{
        return(
            <div className="form-card message-box" onAnimationEnd={()=> setMessage('')}>
                <p style={{fontSize:"30px"}}>{message}</p>
            </div>
         )
    }
}
MessageBox.propTypes = {
    notification: PropTypes.array.isRequired
};
export default MessageBox