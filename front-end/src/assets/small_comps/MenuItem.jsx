import PropTypes from "prop-types";
const MenuItem = ({name,quantatity,refill_request,setRefill_request,setTotal,total_price}) =>{
    const handle_click=(x)=>{
        const temp={...refill_request}
        temp[name]={'quantaity':temp[name].quantaity+x,'price':temp[name].price}
        if(temp[name].quantaity<1){
            delete temp[name]
        }
        sessionStorage.setItem('refills', JSON.stringify(temp));
        sessionStorage.setItem('total',total_price+parseFloat((refill_request[name].price*x)))
        setTotal(total_price+parseFloat((refill_request[name].price*x)))
        setRefill_request(temp)
    }
    return(
        <div className="row" style={{marginBottom:'20px', border:"1px solid black",paddingTop:"10px",userSelect:"none"}}>
            <div className="col" style={{paddingTop:"5%"}}>
                {name}
            </div>
            <div className="col" style={{paddingTop:"5%"}}>
                {quantatity}
            </div>
            <div className="col">
                <div className="row" style={{marginBottom:"20%"}}>
                <i className='bx bx-plus-circle' style={{zIndex:"3",fontSize:"20px",cursor:'pointer'}} onClick={()=> handle_click(1)}></i>
                </div>
                <div className="row" style={{marginBottom:"5%"}}>
                <i className='bx bx-minus-circle' style={{zIndex:"3",fontSize:"20px",cursor:'pointer'}} onClick={()=> handle_click(-1)}></i>
                </div>
            </div>
            
        </div>
    )
}
MenuItem.propTypes = {
    name: PropTypes.string.isRequired,
    quantatity: PropTypes.number.isRequired,
    refill_request: PropTypes.object.isRequired,
    setRefill_request: PropTypes.func.isRequired,
    setTotal: PropTypes.func.isRequired,
    total_price:PropTypes.number.isRequired
}
export default MenuItem