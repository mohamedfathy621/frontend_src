import UserData from "./UserData"
import PropTypes from "prop-types"
const UserTable=({users})=>{
    return (
      <div>
        <table className="table" >
          <thead>
            <tr>
              <td scope="col" style={{ textAlign: 'center' }}>username</td>
              <td scope="col" style={{ textAlign: 'center' }}>order count</td>
            </tr>
          </thead>
          <tbody id="data">
            {users.map((user)=> <UserData key={user.user_id__username} name={user.user_id__username} count={user.order_count}/>)}
          </tbody>
        </table>
      </div>
    )
}
UserTable.propTypes = {
    users:PropTypes.array.isRequired
}
export default UserTable