import { Map_forms,request_mapper } from "./assets/script_files/helperFunc";
import PropTypes from "prop-types";
import InputFeild from './InputFeild';
import logo from './assets/images/logo3.png'

const Form = ({type,setPage})=>{
    const handleSubmit = (event) =>{
        event.preventDefault();
        request_mapper(type).then((result)=>{
            console.log(result.data);
        })
    }
    const Form_data=Map_forms(type)
    const regist_line=type==='register'?'none':'inline'
    return(
      <div className="form-card" id="merch_new">
            <h1 className="form-header">{Form_data.header}</h1>
            <div className="row">
                <div className="col">
                    <form style={{marginBottom:"10px"}}  onSubmit={handleSubmit}>
                        {Form_data.fields.map((input)=><InputFeild key={input.name} input_data={input}></InputFeild>)}
                        <div className='text-center'>
                        <button type="submit" className="btn btn-primary">{Form_data.name}</button>
                        </div>
                    </form>
                    <p style={{display:regist_line}}>dont have an account . 
                        <span className="join-us" onClick={() => setPage('register')}>join us</span>
                    </p>
                </div>
                <div className="col d-flex justify-content-center">
                    <img src={logo} style={{maxWidth:'80%'}}></img>
                </div>
             </div>
      </div>
    )
}

Form.propTypes = {
    type: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired
  };
export default Form;