import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './assets/styles/app.css'
import Head from './Head';
import Form from './Form';
import DrugList from './DrugList';
import DashBoard from './DashBoard';
import MessageBox from './assets/small_comps/MessageBox';
import { useState,useEffect,useRef } from 'react';
import { check_token,ask_chart } from './assets/script_files/helperFunc';
function App() {
  const storedUser = JSON.parse(sessionStorage.getItem('refills'))
  const storedTotal = parseFloat(sessionStorage.getItem('total'))
  const isMounted = useRef(false)
  const isCharting = useRef(false)
  const [page,setPage]= useState('login')
  const [refill_request,setRefill_request]= useState(storedUser?storedUser:{})
  const [total_price,setTotal] = useState(storedTotal?storedTotal:0)
  const [loggedin,setLogged]=useState('loading')
  const [notification,setNotification]= useState(['',0])
  const [products,setProducts]= useState([])
  const [tempProducts,setTempProducts]=useState([])
  const [eco,setEco]=useState([])
  useEffect(()=>{
      check_token(isMounted,setProducts,setPage,setLogged,setNotification,notification)
  },[loggedin])
  useEffect(()=>{
    if(page==='chart'&&!isCharting.current){
      isCharting.current=true
        ask_chart().then((result)=>{
         setEco(result.data)
        })
    }
    else if(isCharting.current){
      isCharting.current=false
    }
  },[page])
  useEffect(()=>{
    setTempProducts(products)
  },[products])
  if(loggedin=='loading'){
    return(
      null
    )
  }
  else{
  return (
    <>
      <div style={{minHeight:"100vh",backgroundColor:"#C75B7A",overflow:'hidden'}}>
      <Head setPage={setPage} loggedin={loggedin} setLogged={setLogged} 
      refill_request={refill_request} setRefill_request={setRefill_request} total_price={total_price} 
      setTotal={setTotal} setNotification={setNotification} count={notification[1]} products={products} setProducts={setProducts}
      tempProducts={tempProducts} setTempProducts={setTempProducts}/>
      {
        loggedin
        ?
          page=='home'
          ?
            <DrugList products={tempProducts} setRefill_request={setRefill_request} refill_request={refill_request} setTotal={setTotal} total_price={total_price}/>
          :
            eco.length!=0?<DashBoard eco={eco}/>:null
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
