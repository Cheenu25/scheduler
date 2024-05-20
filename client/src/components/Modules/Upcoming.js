import React, { useEffect, useState } from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import { format } from 'date-fns'
import { useCookies } from 'react-cookie'

const Upcoming = () => {
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const [tasks,setTasks] = useState([])
  const userEmail = cookies.Email

  const fetchTask = async() => {
    try {
      const response = await fetch(`http://localhost:8000/api/upcomtask/${userEmail}`)
      if(response.ok){
        const data = await response.json()
        setTasks(data.tasks)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchTask()
  },[])

  return (
    <div>
      <h1>Upcoming Task</h1>
    <div className="upcoming-container">
      {tasks.map((task) => (
        <Card sx={{height:100, width:150}}>
        <CardContent>
          <Typography level='title-md'>{task.task}</Typography>
          <Typography>{task.due_date ? format(new Date(task.due_date),'yyyy-MM-dd') : 'NULL'}</Typography>
        </CardContent>
      </Card>
      ))}
    </div>
    </div>
  )
}

export default Upcoming