import MenuItem from "./MenuItem"
import PropTypes from "prop-types";
const Menu= ({refill_request,cart,total_price,setRefill_request,setTotal,try_refresh})=>{
    return(
        <div className="form-card menu-box" style={{display:Object.keys(refill_request).length>0&&cart?'block':'none'}}>
       
        {Object.keys(refill_request).map((key)=>

        <MenuItem key={key} name={key} quantatity={refill_request[key].quantaity} refill_request={refill_request} 
        setRefill_request={setRefill_request} setTotal={setTotal} total_price={total_price}/>)}

        <p>{parseFloat(total_price).toFixed(2)}</p>
        <button type="button" className="btn btn-primary" onClick={() => try_refresh()}>
           <i className='bx bxs-cart' style={{zIndex:"3",fontSize:"20px"}}></i>
           submit refill order
        </button>
        </div>
    )
}
Menu.propTypes = {
    refill_request: PropTypes.object.isRequired,
    setRefill_request: PropTypes.func.isRequired,
    total_price: PropTypes.number.isRequired,
    setTotal: PropTypes.func.isRequired,
    try_refresh: PropTypes.func.isRequired,
    cart: PropTypes.bool.isRequired
};
export default Menu