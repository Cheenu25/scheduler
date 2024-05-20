import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/joy/Checkbox'
import Card from '@mui/joy/Card'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Button } from '@mui/material'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import { format } from 'date-fns'
import { useCookies } from 'react-cookie'


const CompletedTask = () => {

  const [cookies,setCookie,removeCookie] = useCookies(null)
  const [selectedTask,setSelectedTask] = useState(null)
  const userEmail = cookies.Email
  const [tasks,setTasks] = useState([])

  const fetchTask = async() => {
    const response = await fetch(`http://localhost:8000/api/comptask/${userEmail}`)
    if(response.ok){
      const data = await response.json()
      setTasks(data.tasks)
    }
  }

  useEffect(()=>{
    fetchTask()
  },[])

  const handleSelectedTask = (task) => {
    setSelectedTask(task)
  }

  return (
    <div className="compTask-container">
      <h1>Completed Task</h1>
      {tasks.map(task => (
        <Card key={task.id} sx={{ width:"400px", height:"30px"}}>
        <div className="comptask-card">
          <Checkbox size="lg" variant="outlined" label={task.comp_task} defaultChecked/>
          <Button variant='plain' color='neutral' style={{bottom:'5px'}} onClick={() => handleSelectedTask(task)}>
            <InfoOutlinedIcon/>
          </Button>
        </div> 
      </Card>
      ))}
      <div className="modal-container">
        {selectedTask && <Modal open={Boolean(selectedTask)} onClose={()=>setSelectedTask(null)}>
          <ModalDialog>
            <DialogTitle>TASK</DialogTitle>
            {selectedTask.comp_task}
            <DialogTitle>DUE DATE</DialogTitle>
            {selectedTask.due_date ? format(new Date(selectedTask.due_date),'yyyy-MM-dd') : 'NULL'}
          </ModalDialog>
        </Modal>}
      </div>
    </div>
  )
}

export default CompletedTask