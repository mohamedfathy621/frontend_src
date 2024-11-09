import PropTypes from "prop-types";
const NavIcon = ({directon,name,setPage,icon,setLogged,refill_request}) =>{
    const log_out=()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLogged(false)
        setPage('login')
    }
    const map_func= () =>{
        switch(name){
            case 'log out':
                log_out()
                break
            case 'your orders':
                console.log(refill_request)
                break
            default:
                setPage(directon)
        }
    }
    return (
        <div style={{marginRight:"50px",cursor:"pointer"}} onClick={() => map_func()}>
                    <i className={icon+' text-center'} style={{zIndex:"3",fontSize:"25px"}}><p style={{fontSize:"15px"}}>{name}</p></i>
        </div>
    )
}
NavIcon.propTypes = {
    setPage:PropTypes.func.isRequired,
    directon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    setLogged:PropTypes.func,
    refill_request:PropTypes.object,
  };
export default NavIcon