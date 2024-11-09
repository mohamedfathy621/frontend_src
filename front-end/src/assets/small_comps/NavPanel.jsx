import NavIcon from "./NavIcon"
import PropTypes from "prop-types"
const NavPanel=({loggedin,setPage,refill_request,setRefill_request,setLogged,setTotal,setNotification,count,cart,setCart})=>{
    return(
        <div className='col d-flex justify-content-end' style={{display:"flex"}}>
                <NavIcon directon='login' name={loggedin?'log out':'log in'} icon={loggedin?'bx bx-user':'bx bxs-user'} setPage={setPage} setLogged={setLogged} setRefill_request={setRefill_request} setTotal={setTotal} setNotification={setNotification} count={count}/>
                {loggedin?null:<NavIcon directon='register' name='register' icon='bx bxs-user-account' setPage={setPage}/>}
                {!loggedin?null:<NavIcon directon='home' name='home' icon='bx bxs-home' setPage={setPage}/>}
                {!loggedin?null:<NavIcon directon='chart' name='chart' icon='bx bx-line-chart' setPage={setPage}/>}
                {loggedin?<NavIcon directon='' name='your orders' icon='bx bxs-cart' setPage={setPage} refill_request={refill_request} setRefill_request={setRefill_request} order_length={Object.keys(refill_request).length} setCart={setCart} cart={cart}/>:null}
        </div>
    )
}
NavPanel.propTypes = {
    setPage: PropTypes.func.isRequired,
    loggedin: PropTypes.bool.isRequired,
    setLogged: PropTypes.func.isRequired,
    refill_request: PropTypes.object.isRequired,
    setRefill_request: PropTypes.func,
    setTotal: PropTypes.func.isRequired,
    setNotification:PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    cart: PropTypes.bool.isRequired,
    setCart: PropTypes.func.isRequired
};
export default NavPanel