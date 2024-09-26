import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const nav = useNavigate();
  let username = "";
  const handleLogout = ()=>{
    localStorage.clear();
    nav("/login")
  }
  if (localStorage.length !== 0 ) {
    username= JSON.parse(localStorage.getItem("cred")).username
  } else {
    nav('/login');
    return null
  }
  return (
    <header className='header'>
        <h3 onClick={()=>{nav("/")}}>Home</h3>
        <h3 onClick={()=>{nav("/employeelist")}}>Employee List</h3>
        <h3 style={{cursor:"text"}}>{username}</h3>
        <h3 onClick={handleLogout} >Logout</h3>
    </header>
  )
}

export default Header