import PropTypes from "prop-types"
const ChartCard=({icon,name,setCurrentChart})=>{
    return(
            <div  className="col-6">
              <div className="card mb-4 box-shadow"  style={{borderRadius:"0",maxWidth:"90%",cursor:"pointer"}} onClick={()=>setCurrentChart(name)} >
                <div className="card-body">
                  <div className='row text-center'>
                  <i className={icon+' text-center'} style={{zIndex:"3",fontSize:"50px"}}></i>
                  </div>
                  <div className='row text-center'>
                    <p style={{fontSize:"20px"}}>{name}</p>
                  </div>
                </div>
              </div>
           </div>  
    )
}
ChartCard.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setCurrentChart: PropTypes.func.isRequired
}
export default ChartCard