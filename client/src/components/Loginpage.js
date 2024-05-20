import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import Header from './Header'
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'


const Loginpage = () => {
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const [userDetail,setUserDetail] = useState({
    email: '',
    password: ''
  })

  const [errDetail,setErrDetail] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target
    setUserDetail((prevValue) => ({...prevValue,[name] : value}))
  }

  const handleSubmit = async(e) => {
    try {
      const response = await fetch('http://localhost:8000/api/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userDetail)
      })

      if(response.ok){
        const data = await response.json()
        setCookie('Email', data.email)
        setCookie('Authtoken', data.token)
        navigate('/')
      }else{
        const errData = await response.json()
        setErrDetail(errData.message)
        throw new Error('login failed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
       <Header/>
        <div className="login-content">
          <h1 style={{marginRight:"290px"}}>Log in</h1>
            <div className="login-inputs">
              <TextField
                      type="email" 
                      id="outlined-basic" 
                      label="Email" 
                      variant="outlined"
                      name="email"
                      onChange={handleChange}
                      value = {userDetail.email}
                      fullWidth
                      required
                  />
              <TextField
                  type="password" 
                  id="outlined-basic" 
                  label="Password" 
                  variant="outlined"
                  name="password"
                  onChange={handleChange}
                  value={userDetail.password}
                  fullWidth
                  required
              />
            </div>
            {errDetail && <div className="err-data" style={{color:'red'}}>{errDetail}</div>}
            <Button variant="contained" style={{backgroundColor:"black"}} onClick={handleSubmit}>Log in with email</Button>
            <p>Don’t have an account? <Link to = "/signup">Sign up</Link></p>
        </div>
    </div>
  )
}

export default Loginpage