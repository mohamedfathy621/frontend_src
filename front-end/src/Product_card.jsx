import PropTypes from "prop-types";
const Product_card = ({product,refill_request,setRefill_request,total_price,setTotal}) =>{
    const handle_refill=()=>{
        const confirm = window.confirm(`add ${product.name} to refill list`);
        if(confirm){
            const temp={...refill_request}
            if(!temp[product.name]){
                temp[product.name]={'quantaity':1,'price':product.price}
            }
            else{
                temp[product.name]={'quantaity':temp[product.name].quantaity+1,'price':product.price}
            }
            sessionStorage.setItem('refills', JSON.stringify(temp));
            sessionStorage.setItem('total',total_price+parseFloat(product.price))
            setTotal(total_price+parseFloat(product.price))
            setRefill_request(temp)
        }
    }
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
      price: PropTypes.number.isRequired,
    }).isRequired,
    refill_request:PropTypes.object.isRequired,
    setRefill_request:PropTypes.func.isRequired,
    total_price: PropTypes.number.isRequired,
    setTotal: PropTypes.func.isRequired
}
export default Product_card