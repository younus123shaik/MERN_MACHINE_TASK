import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username , setUsername]=useState("")
  const [password , setPassword] = useState("")
  let nav = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const cred = {
      username : username,
      password : password
    }
    try {
      console.log(cred)
      await axios.get("http://localhost:5000/users/user", {
        params: {
          "username": username,
          "password": password,
        },
    });
      localStorage.setItem("cred",JSON.stringify(cred))
      alert("Login Success")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      alert("Invalid Credentials...")
    }
  }
  return (
    <div className='signandlogin'>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='title'>Login Page</h2>

        <div className='input'>
          <label>User Name:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
          />
        </div>

        <div className='input'>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>

        <div className='input'>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;