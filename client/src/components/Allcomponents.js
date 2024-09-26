import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Employeelist from './Employeelist'
import Createemployee from './Createemployee'
import Editemployee from './Editemployee'
import Login from './Login'

const Allcomponents = () => {
  const nav = useNavigate()
  useEffect(() => {

    if (localStorage.getItem("cred") === null ) {
      nav('/login')
    } else {
      nav('/')
    }
  }, []);
  return (
    <div>
        <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/employeelist' element={<Employeelist/>}/>
        <Route path='/createemployee' element={<Createemployee/>}/>
        <Route path='/editemployee/:uniqueid' element={<Editemployee/>}/>
    </Routes>
    </div>
  )
}

export default Allcomponents