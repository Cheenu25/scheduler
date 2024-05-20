import React from 'react'
import HomePageImg from "../Designer.png"
import Header from './Header'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <div className='homepage-container'>
        <Header/>
        <div className="homepage-content">
            <img src={HomePageImg} alt="scheduleImg" style={{width:"400px", height:"400px"}}/>
            <p>The ability to concentrate and to use your time well is everything</p>
            <div className="homepage-btn">
              <Link to="/signup">
                <Button variant='contained' color="primary" style={{backgroundColor:"black"}}>
                    Sign up
                </Button>
              </Link>
              <Link to="/login">  
                <Button variant='contained' color="primary" style={{backgroundColor:"black"}}>
                  Login
                </Button>
              </Link>  
            </div>
        </div>
        cs=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
        ci=105289030888-1oljfh1mhif7423g0kh07s8rpf0pots6.apps.googleusercontent.com
    </div>
  )
}

export default HomePage