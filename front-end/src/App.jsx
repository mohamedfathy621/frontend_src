import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './assets/styles/app.css'
import Head from './Head';
import Form from './Form';
import DrugList from './DrugList';
import UserStats from './UsersStats';
import YearlCharts from './YearlyCharts';
import BarChart from './Chart';
import PieChart from './PieChart';
import ChartCard from './ChartCard';
import DoughnutChart from './DonguhtChart';
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
  const [eco,setEco]=useState([])
  const [current_chart,setCurrentChart]=useState('bar chart')
  const chartlist=[['pie chart','bx bxs-pie-chart-alt-2'],['donught chart','bx bxs-doughnut-chart'],['bar chart','bx bxs-bar-chart-alt-2']]
  const selectchart=(chart)=>{
    const labels=eco['medicines'].map((item)=>item.name)
    const counts=eco['medicines'].map((item)=>item.refill_requests)
    switch(chart){
      case 'pie chart':
        return <PieChart labels={labels} counts={counts}/>
      case 'donught chart':
        return <DoughnutChart labels={labels} counts={counts}/>
      case 'bar chart':
        return <BarChart labels={labels} counts={counts}/>
    }
  }
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
  if(loggedin=='loading'){
    return(
      null
    )
  }
  else{
  return (
    <>
      <div style={{minHeight:"100vh",backgroundColor:"#C75B7A",overflow:'hidden'}}>
      <Head setPage={setPage} loggedin={loggedin} setLogged={setLogged} refill_request={refill_request} setRefill_request={setRefill_request} total_price={total_price} setTotal={setTotal} setNotification={setNotification} count={notification[1]}/>
      {
        loggedin
        ?
          page=='home'
          ?
            <DrugList products={products} setRefill_request={setRefill_request} refill_request={refill_request} setTotal={setTotal} total_price={total_price}/>
          :
          <>
          <div className='container'> 
            <div className="row gx-5 gy-5">
                {eco.length!=0?Object.keys(eco['economic_calender']).map((date)=><YearlCharts key={date} category={date} count={eco['economic_calender'][date]}/>):null}
            </div>
          </div>
          <div className='row' style={{paddingLeft:"2%",paddingRight:"2%"}}>
            {eco.length!=0?<UserStats users={eco['users']}/>:null}
            <div className='col'>
              <div className="form-card" style={{minHeight:"30rem",width:"100%",margin:"0px"}}>

                {eco.length!=0?selectchart(current_chart):null}
              </div>
            </div>
            <div className='col-3'>
            <div className="form-card" style={{minHeight:"30rem",width:"100%",margin:"0px"}}>
            <div className='row'>
              {chartlist.map((chart)=><ChartCard icon={chart[1]} name={chart[0]} key={chart[1]} setCurrentChart={setCurrentChart}/>)}
            </div>
            </div>
            </div>
          </div>
        
          </>
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
