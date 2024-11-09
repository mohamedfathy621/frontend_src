import PropTypes from "prop-types";
import { handel_refill } from "./assets/script_files/helperFunc";
const Product_card = ({product,refill_request,setRefill_request,total_price,setTotal}) =>{

    return(
          <div  className="col-md-4" >
            <div className="card mb-4 box-shadow"  style={{borderRadius:"0",maxWidth:"90%"}}  >
              <img className="card-img-top card_image" src={product.image_url} />
              <div className="card-body">
                <div className="row text-center">
                  <div className="col">
                      <p style={{fontSize:"20px"}}>{product.name}</p>
                  </div>
                  <div className="col">
                      <p style={{fontSize:"20px"}}>Price: {product.price}$</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-success" onClick={()=>handel_refill(product,refill_request,total_price,setTotal,setRefill_request)}>
                   <i className='bx bx-cart' style={{zIndex:"3",fontSize:"20px"}}></i>
                   Place refill order
                </button>
                </div>
              </div>
            </div>
          </div>  
    )
}
Product_card.propTypes = {
    product: PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    refill_request:PropTypes.object.isRequired,
    setRefill_request:PropTypes.func.isRequired,
    total_price: PropTypes.number.isRequired,
    setTotal: PropTypes.func.isRequired
}
export default Product_card