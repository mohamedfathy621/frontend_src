import PropTypes from "prop-types";
const NavIcon = ({directon,name,setPage,icon}) =>{
    return (
        <div style={{marginRight:"50px",cursor:"pointer"}} onClick={() => setPage(directon)}>
                    <i className={icon+' text-center'} style={{zIndex:"3",fontSize:"25px"}}><p style={{fontSize:"15px"}}>{name}</p></i>
        </div>
    )
}
NavIcon.propTypes = {
    setPage:PropTypes.func.isRequired,
    directon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };
export default NavIcon