import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './assets/styles/app.css'
import Head from './Head';
import Form from './Form';
import Product_card from './Product_card';
import { useState,useEffect } from 'react';
import MessageBox from './assets/small_comps/MessageBox';
import { validate_JWT } from './assets/script_files/helperFunc';
import { refresh_token,get_medications } from './assets/script_files/handle_requests';
function App() {
  const storedUser = JSON.parse(sessionStorage.getItem('refills'));
  const [page,setPage]= useState('login');
  const [refill_request,setRefill_request]= useState(storedUser?storedUser:{});
  const [loggedin,setLogged]=useState('loading');
  const [notification,setNotification]= useState(['',0])
  const [products,setProducts]= useState([])
  
  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem('refreshToken')
    
    if(validate_JWT(accessToken)){
      get_medications(accessToken).then((result)=>{
        
        if(result.data.status==='success'){
          setProducts(result.data.medications)
        }
        
      })  
      setLogged(true)
      setNotification(['welcome back',notification[1]+1])
    }
    else if(refreshToken){
      refresh_token({'refresh':refreshToken}).then((result)=>{
        
        if(result.data.status==='success'){
          setLogged(true)
          setNotification(result.data.message)
          localStorage.setItem('accessToken', result.data.access_token);
          localStorage.setItem('refreshToken', result.data.access_token);
        }
        else{
          setNotification(result.data.message)
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }) 
    }
    else{
      setLogged(false)
    }
  },[loggedin])

  if(loggedin=='loading'){
    return(
      null
    )
  }
  else{
  return (
    <>
      <div style={{minHeight:"100vh",backgroundColor:"#C75B7A"}}>
      <Head setPage={setPage} loggedin={loggedin} setLogged={setLogged} refill_request={refill_request} setRefill_request={setRefill_request}/>
      {
        loggedin
        ?
        <div className="form-card" style={{minHeight:"30rem",width:"60%"}}>
          <div className="row gx-5 gy-5">
          {products.map((product) => <Product_card key={product.name} product={product} refill_request={refill_request} setRefill_request={setRefill_request}/>)}
          </div>
        </div>
        :
        <Form type={page} setPage={setPage} setLogged={setLogged} notification={notification} setNotification={setNotification}/>
      }
      <MessageBox notification={notification}/>
      </div>
    </>
  )
  }
}

export default App
