import { Map_forms,handle_submit } from "./assets/script_files/helperFunc";
import PropTypes from "prop-types";
import InputFeild from './InputFeild';
import logo from './assets/images/logo3.png'
import { useState,useRef, useEffect } from "react";
const Form = ({type,setPage,setLogged,notification,setNotification})=>{
    const [validations,setValidations]= useState([])
    
    const original_page=useRef(type);
    useEffect(()=>{
        if(original_page.current!=type){
            original_page.current=type
            setValidations([])
        }
    },[type])
    const send_submit = (event) =>{
        handle_submit(event,type,setNotification,notification,setValidations,setPage,setLogged)
    } 
    const Form_data=Map_forms(type)
    return(
        <>
      <div className="form-card">
            <h1 className="form-header">{Form_data.header}</h1>
            <div className="row">
                <div className="col">
                    <form style={{marginBottom:"10px"}}  onSubmit={send_submit}>
                        {Form_data.fields.map((input)=><InputFeild key={input.name+type} input_data={input} valid={validations.length==0||validations[input.name]} extra_info={validations[input.name+'error']}></InputFeild>)}
                        <div className='text-center'>
                        <button type="submit" className="btn btn-primary">{Form_data.name}</button>
                        </div>
                    </form>
                    <p style={{display:type==='register'?'none':'inline'}}>dont have an account . 
                        <span className="join-us" onClick={() => setPage('register')}>join us</span>
                    </p>
                </div>
                <div className="col d-flex justify-content-center">
                    <img src={logo} style={{maxWidth:'80%'}}></img>
                </div>
             </div>
      </div>
      </>
    )
}

Form.propTypes = {
    type: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
    setLogged: PropTypes.func.isRequired,
    notification: PropTypes.array.isRequired,
    setNotification: PropTypes.func.isRequired
  };
export default Form;