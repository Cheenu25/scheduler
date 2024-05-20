import Card from '@mui/joy/Card'
import Checkbox from '@mui/joy/Checkbox'
import React, { useEffect, useState } from 'react'
import Close from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import Button from '@mui/joy/Button'
import { format } from 'date-fns'
import { useCookies } from 'react-cookie'

const DeletedTask = () => {
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const [tasks,setTasks] = useState([])
  const [selectedTask,setSelectedTask] = useState(null)
  const userEmail = cookies.Email

  const fetchTask = async() => {
    const response = await fetch(`http://localhost:8000/api/deltask/${userEmail}`)
    if(response.ok){
      const data = await response.json()
      console.log(data.tasks)
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
    <div className="deltask-container">
      <h1>Deleted Task</h1>
      {tasks.map((task)=>(
        <Card key={task.id} sx={{width:'400px', height:'30px'}}>
        <div className="deltask-card">
          <Checkbox uncheckedIcon={<Close />} size="lg" variant="outlined" label={task.del_task} />
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
            {selectedTask.del_task}
            <DialogTitle>DUE DATE</DialogTitle>
            {selectedTask.due_date ? format(new Date(selectedTask.due_date),'yyyy-MM-dd') : 'NULL'}
          </ModalDialog>
        </Modal>}
      </div>
    </div>
  )
}

export default DeletedTask