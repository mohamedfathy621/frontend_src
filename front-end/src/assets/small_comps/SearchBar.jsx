import PropTypes from "prop-types";
import { useState,useEffect } from "react";
const SearchBar = ({products,setTempProducts}) =>{
    const [filt,setFilter]=useState('')
    function handle_serach(event){
        setFilter(event.target.value)
    }
    useEffect(()=>{
        if(products.length>0){
           setTempProducts(products.filter((product)=>product.name.toLowerCase().includes(filt.toLowerCase())))
        }
    },[filt])
    return(
        <div className='d-flex flex-column h-100 justify-content-center searchBar'>
             <i className='bx bx-search searchIcon'></i>
             <input className='input-nice'  placeholder='Search' onChange={handle_serach} value={filt}></input>
        </div>
    )
}
SearchBar.propTypes = {
    products: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
    tempProducts:PropTypes.array.isRequired,
    setTempProducts:PropTypes.func.isRequired
};
export default SearchBar