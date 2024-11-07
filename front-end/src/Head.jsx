import image from './assets/images/logo2.png'
import SearchBar from './assets/small_comps/SearchBar';
import NavIcon from './assets/small_comps/NavIcon';
import PropTypes from "prop-types";
const Head = ({setPage}) =>{
    return(
        <div className="container Header-Container">
            <header className="d-flex flex-wrap py-1 border-bottom row" style={{paddingLeft:"3%",marginBottom:"0",paddingRight:"3%"}}>
                <div className='row' style={{position:"relative",top:"14px"}}>
                    <div className='col' style={{display:"flex",height:"60%"}}>
                        <img src={image} style={{width:"200px",height:"30px",marginRight:"40px"}}></img>
                        <SearchBar/>
                     </div>
                    <div className='col d-flex justify-content-end' style={{display:"flex"}}>
                        <NavIcon directon='login' name='log in' icon='bx bxs-user' setPage={setPage}/>
                        <NavIcon directon='register' name='register' icon='bx bxs-user-account' setPage={setPage}/>
                        <NavIcon directon='login' name='log in' icon='bx bxs-cart' setPage={setPage}/>
                    </div>
                </div>
            </header>
        </div>
    )
}
Head.propTypes = {
    setPage: PropTypes.func.isRequired
  };
export default Head;