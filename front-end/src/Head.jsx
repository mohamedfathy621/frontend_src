import image from './assets/images/logo2.png'
import SearchBar from './assets/small_comps/SearchBar';
import NavPanel from './assets/small_comps/NavPanel';
import PropTypes from "prop-types";
import Menu from './assets/small_comps/Menu';
import { useState } from 'react';
import { try_refresh } from './assets/script_files/helperFunc';
const Head = ({setPage,loggedin,setLogged,refill_request,setRefill_request,total_price,setTotal,setNotification,count,products,setProducts,tempProducts,setTempProducts}) =>{
    const [cart,setCart]=useState(false)
    return(
        <div className="container Header-Container">
            <header className="d-flex flex-wrap py-1 border-bottom row" style={{paddingLeft:"3%",marginBottom:"0",paddingRight:"3%"}}>
                <div className='row' style={{position:"relative",top:"14px"}}>
                    <div className='col' style={{display:"flex",height:"60%"}}>
                        <img src={image} style={{width:"200px",height:"30px",marginRight:"40px"}}></img>
                        <SearchBar products={products} setProducts={setProducts} setTempProducts={setTempProducts} tempProducts={tempProducts}/>
                     </div>
                    <NavPanel loggedin={loggedin} setPage={setPage} refill_request={refill_request} setCart={setCart} cart={cart}
                    setRefill_request={setRefill_request} setLogged={setLogged} setTotal={setTotal} setNotification={setNotification} count={count}/>
                </div>
                <Menu refill_request={refill_request} cart={cart} total_price={total_price} setRefill_request={setRefill_request} setTotal={setTotal} 
                try_refresh={()=>try_refresh(setNotification,setRefill_request,setTotal,setCart,count,total_price,refill_request)}/>
            </header>
        </div>
    )
}
Head.propTypes = {
    setPage: PropTypes.func.isRequired,
    loggedin: PropTypes.bool.isRequired,
    setLogged: PropTypes.func.isRequired,
    refill_request: PropTypes.object.isRequired,
    setRefill_request: PropTypes.func.isRequired,
    total_price: PropTypes.number.isRequired,
    setTotal: PropTypes.func.isRequired,
    setNotification:PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    products: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
    tempProducts:PropTypes.array.isRequired,
    setTempProducts:PropTypes.func.isRequired
};
export default Head;