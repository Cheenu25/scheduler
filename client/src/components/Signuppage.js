import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Header from './Header';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Signuppage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  })
  const [errDetail,setErrDetail] = useState('')

  const navigate = useNavigate()


  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevValue) => ({ ...prevValue, email: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevValue) => ({ ...prevValue, password: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/submit',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userDetail)
      })

      if(response.ok){
        const data = await response.json()
        setCookie('Email', data.email)
        setCookie('Authtoken', data.token)
        console.log(cookies)
        navigate('/')
      }else{
        const errorData = await response.json()
        setErrDetail(errorData.message)
        throw new Error(errorData.message)
      }
    } catch (error) {
     console.log(error)
    }
  }


  return (
    <div className="signup-container">
      <Header />
      <div className="signup-content">
        <h1 style={{ marginRight: '290px' }}>Sign up</h1>
          <div className="signup-inputs">
            <TextField
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={userDetail.email}
              onChange={handleEmailChange}
              fullWidth
              required
            />
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              value={userDetail.password}
              onChange={handlePasswordChange}
              fullWidth
              required
            />
          </div>
          {errDetail && <div className="err-data" style={{color: 'red'}}>{errDetail}</div>}
          <Button variant="contained" style={{ backgroundColor: 'black' }} type="button" onClick={handleSubmit}>
            Sign up with Email
          </Button>
        <p>
          Already signed up?<Link to="/login">Go to login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signuppage;
