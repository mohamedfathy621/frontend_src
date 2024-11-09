const UserData=(user)=>{
    return(
        <tr>
             <td style={{fontSize:"16px",fontWeight:"700"}}>
                {user.name}
              </td>
              <td style={{fontSize:"16px",fontWeight:"700"}}>
                 {user.count}
              </td>
        </tr>
    )
}
export default UserData