import PropTypes from 'prop-types';
const InputFeild= ({input_data}) =>{
    return (
        <div style={{marginBottom:"10px"}}>
             <label htmlFor="input">{input_data.label}</label>
             <input type={input_data.type}  className={'form-control'} placeholder={input_data.placeholder} name={input_data.name} />
             <small className="form-text "  style={{ color: input_data.small.color, display: input_data.small.display }}>{input_data.small.content}</small>
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
  }
export default InputFeild