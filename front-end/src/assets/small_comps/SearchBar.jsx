const SearchBar = () =>{
    return(
        <div className='d-flex flex-column h-100 justify-content-center searchBar'>
             <i className='bx bx-search searchIcon'></i>
             <input className='input-nice'  placeholder='Search'></input>
        </div>
    )
}

export default SearchBar