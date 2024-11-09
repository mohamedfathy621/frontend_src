import PropTypes from "prop-types"
const YearlCharts = ({category,count}) =>{
    return (
        <div  className="col-3" >
        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",maxWidth:"90%"}}  >
          <div className="card-body">
            <div className='row text-center'>
              <h1>{count}</h1>
            </div>
            <div className='row text-center'>
              <p style={{fontSize:"20px"}}>orders made this {category}</p>
            </div>
          </div>
        </div>
      </div>   
    )
}
YearlCharts.propTypes = {
    category: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
}
export default YearlCharts