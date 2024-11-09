import PropTypes from "prop-types"
import YearlCharts from "./YearlyCharts"
import UserStats from "./UsersStats"
import ChartCard from "./ChartCard"
import { useState } from "react"
import PieChart from "./PieChart"
import DoughnutChart from "./DonguhtChart"
import BarChart from "./Chart"
const DashBoard = ({eco}) =>{
    const chartlist=[['pie chart','bx bxs-pie-chart-alt-2'],['donught chart','bx bxs-doughnut-chart'],['bar chart','bx bxs-bar-chart-alt-2']]
    const [current_chart,setCurrentChart]=useState('bar chart')
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
    return(
        <>
        <div className='container'> 
            <div className="row gx-5 gy-5">
                {Object.keys(eco['economic_calender']).map((date)=><YearlCharts key={date} category={date} count={eco['economic_calender'][date]}/>)}
            </div>
          </div>
          <div className='row' style={{paddingLeft:"2%",paddingRight:"2%"}}>
            {<UserStats users={eco['users']}/>}
            <div className='col'>
              <div className="form-card" style={{minHeight:"30rem",width:"100%",margin:"0px"}}>
                {selectchart(current_chart)}
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
    )
}

DashBoard.propTypes = {
    eco: PropTypes.object.isRequired,
    setCurrentChart: PropTypes.func.isRequired
}
export default DashBoard