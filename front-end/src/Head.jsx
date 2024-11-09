import image from './assets/images/logo2.png'
import SearchBar from './assets/small_comps/SearchBar';
import NavIcon from './assets/small_comps/NavIcon';
import PropTypes from "prop-types";
const Head = ({setPage,loggedin,setLogged,refill_request,setRefill_request}) =>{
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
                        <NavIcon directon='login' name={loggedin?'log out':'log in'} icon={loggedin?'bx bx-user':'bx bxs-user'} setPage={setPage} setLogged={setLogged}/>
                        {loggedin?null:<NavIcon directon='register' name='register' icon='bx bxs-user-account' setPage={setPage}/>}
                        {loggedin?<NavIcon directon='' name='your orders' icon='bx bxs-cart' setPage={setPage} refill_request={refill_request} setRefill_request={setRefill_request} />:null}
                    </div>
                </div>
                <div className="form-card menu-box" style={{display:'block'}}>
                {Object.keys(refill_request).map((key)=><p key={key}>{key}</p>)}
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
    setRefill_request: PropTypes.func.isRequired
};
export default Head;