import Product_card from "./Product_card"
import PropTypes from "prop-types"
const DrugList= (props) =>{
    return (
        <div className="form-card" style={{minHeight:"30rem",width:"60%"}}>
          <div className="row gx-5 gy-5">
          {props.products.map((product) => <Product_card key={product.name} product={product} refill_request={props.refill_request} setRefill_request={props.setRefill_request} setTotal={props.setTotal} total_price={props.total_price}/>)}
          </div>
        </div>
    )
}

DrugList.propTypes = {
    products:PropTypes.array.isRequired,
    refill_request: PropTypes.object.isRequired,
    setRefill_request: PropTypes.func.isRequired,
    total_price: PropTypes.number.isRequired,
    setTotal: PropTypes.func.isRequired,
};
export default DrugList