import PropTypes from 'prop-types';
const InputFeild= ({input_data,valid,extra_info}) =>{
    return (
        <div style={{marginBottom:"10px"}}>
             <label >{input_data.label}</label>
             <input type={input_data.type}  className={'form-control'} placeholder={input_data.placeholder} name={input_data.name} />
             <small className="form-text "  style={{ color: input_data.small.color, display:valid?'none':'block' }}>{extra_info?extra_info:input_data.small.content}</small>
        </div>
       
    )
}

InputFeild.propTypes = {
    input_data: PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired,
      small: PropTypes.shape({
        color: PropTypes.string,
        display: PropTypes.string,
        content: PropTypes.string,
      }).isRequired,
    }).isRequired,
    valid: PropTypes.bool.isRequired,
    extra_info:PropTypes.string
  }
export default InputFeild