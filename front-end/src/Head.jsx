import image from './assets/images/logo2.png'
import SearchBar from './assets/small_comps/SearchBar';
import NavIcon from './assets/small_comps/NavIcon';
import PropTypes from "prop-types";
import MenuItem from './assets/small_comps/MenuItem';
import { send_order } from './assets/script_files/handle_requests';
import { useState } from 'react';
const Head = ({setPage,loggedin,setLogged,refill_request,setRefill_request,total_price,setTotal}) =>{
    const [cart,setCart]=useState(false)
    const try_refresh=()=>{
        const confirm = window.confirm(`are you sure you want to submit your order`);
        if(confirm){
            const accessToken = localStorage.getItem("accessToken");
            const username = localStorage.getItem('username');
            send_order(accessToken,{'username':username,'totalprice':total_price,'orderlist':refill_request}).then((result)=>{
                    console.log(result)
             }) 
             setRefill_request({})
             setTotal(0)
             setCart(false)
             sessionStorage.removeItem('refills')
             sessionStorage.removeItem('total')
        }
    }
    console.log(refill_request)
    return(
        <div className="container Header-Container">
            <header className="d-flex flex-wrap py-1 border-bottom row" style={{paddingLeft:"3%",marginBottom:"0",paddingRight:"3%"}}>
                <div className='row' style={{position:"relative",top:"14px"}}>
                    <div className='col' style={{display:"flex",height:"60%"}}>
                        <img src={image} style={{width:"200px",height:"30px",marginRight:"40px"}}></img>
                        <SearchBar/>
                     </div>
                    <div className='col d-flex justify-content-end' style={{display:"flex"}}>
                        <NavIcon directon='login' name={loggedin?'log out':'log in'} icon={loggedin?'bx bx-user':'bx bxs-user'} setPage={setPage} setLogged={setLogged} setRefill_request={setRefill_request} setTotal={setTotal}/>
                        {loggedin?null:<NavIcon directon='register' name='register' icon='bx bxs-user-account' setPage={setPage}/>}
                        {loggedin?<NavIcon directon='' name='your orders' icon='bx bxs-cart' setPage={setPage} refill_request={refill_request} setRefill_request={setRefill_request} order_length={Object.keys(refill_request).length} setCart={setCart} cart={cart}/>:null}
                    </div>
                </div>
                <div className="form-card menu-box" style={{display:Object.keys(refill_request).length>0&&cart?'block':'none'}}>
                {Object.keys(refill_request).map((key)=><MenuItem key={key} name={key} quantatity={refill_request[key].quantaity} refill_request={refill_request} setRefill_request={setRefill_request} setTotal={setTotal} total_price={total_price}/>)}
                <p>{parseFloat(total_price).toFixed(2)}</p>
                <button type="button" className="btn btn-primary" onClick={() => try_refresh()}>
                   <i className='bx bxs-cart' style={{zIndex:"3",fontSize:"20px"}}></i>
                   submit refill order
                </button>
                </div>
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
    setTotal: PropTypes.func.isRequired
};
export default Head;