import PropTypes from "prop-types";
const Product_card = ({product,refill_request,setRefill_request}) =>{
    const handle_refill=()=>{
        const temp=refill_request
        if(!temp[product.name]){
            temp[product.name]=1
        }
        else{
            temp[product.name]=temp[product.name]+1
        }
        sessionStorage.setItem('refills', JSON.stringify(temp));
        setRefill_request(temp)
    }
    return(
          <div  className="col-md-4" >
            <div className="card mb-4 box-shadow"  style={{borderRadius:"0",maxWidth:"90%"}}  >
              <img className="card-img-top card_image" src={product.image_url} />
              <div className="card-body">
                <div className="row text-center">
                  <div className="col">
                      <p>{product.name}</p>
                  </div>
                  <div className="col">
                      <p>Price: {product.price}$</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-success" onClick={()=>handle_refill()}>
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
      price: PropTypes.string.isRequired,
    }).isRequired,
    refill_request:PropTypes.object.isRequired,
    setRefill_request:PropTypes.func.isRequired
}
export default Product_card