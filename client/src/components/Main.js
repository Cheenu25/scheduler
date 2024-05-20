import React from 'react'
import { useState } from 'react'
import Header from './Header.js'
import Nav from './Nav.js'
import Today from './Modules/Today.js'
import Upcoming from './Modules/Upcoming.js'
import MyCalender from './Modules/MyCalender.js'
import CompletedTask from './Modules/CompletedTask.js'
import DeletedTask from './Modules/DeletedTask.js'


const Main = () => {
  
  const [data,setData] = useState('today')

  const handleData = (module) => {
    setData(module)
  }

  return (
    <div className="main-container">
      <Header/>
      <div className="main-content">
      <div className="nav-container" style={{color:'black', width:'300px'}}>
        <Nav changeModule = {handleData} />
      </div>
        {data === 'today' && <Today/>}
        {data === 'upcoming' && <Upcoming/>}
        {data === 'calender' && <MyCalender/>}
        {data === 'comTask' && <CompletedTask/>}
        {data === 'delTask' && <DeletedTask/>}
      </div>
    </div>
  )
}

export default Main