import UserTable from "./assets/small_comps/UserTable"
import PropTypes from "prop-types"
const UserStats=({users})=>{
    return(
        <div className='col-3 container'>
        <div className="form-card text-center" style={{minHeight:"30rem",width:"100%",margin:"0px",padding:'0px'}}>
          <div  style={{borderBottom:"1px solid black",width:"100%"}}>
            <p style={{fontSize:"30px",padding:"2px"}}>orders made by users</p>
          </div>
          <UserTable users={users}/>
        </div>
        </div>
    )
}
UserStats.propTypes = {
    users:PropTypes.array.isRequired
}
export default UserStats