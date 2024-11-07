import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './assets/styles/app.css'
import Head from './Head';
import Form from './Form';
import { useState } from 'react';
function App() {
  const [page,setPage]= useState('login');
  return (
    <>
      <div style={{minHeight:"100vh",backgroundColor:"#C75B7A"}}>
      <Head setPage={setPage}/>
      <Form type={page} setPage={setPage}/>
      </div>
    </>
  )
}

export default App
