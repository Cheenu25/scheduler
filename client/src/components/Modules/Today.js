import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Add from '@mui/icons-material/Add'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DateRangeIcon from '@mui/icons-material/DateRange'
import Textarea from '@mui/joy/Textarea'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import Checkbox from '@mui/joy/Checkbox'
import Card from '@mui/joy/Card'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { format } from 'date-fns'
import { useCookies } from 'react-cookie'




const Today = () => {
  
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const currentDate = format(new Date(),'yyyy-MM-dd')
  const [openRem,setOpenRem] = useState(false)
  const [openDue,setOpenDue] = useState(false)
  const [selectedTask,setSelectedTask] = useState(null)
  const [tasks,setTasks] = useState([])
  const userEmail = cookies.Email

  const [taskDetail,setTaskDetail] = useState({
    task: "",
    dueDate: "",
  })

  const handleInputChange = (e) => {
    const {name,value} = e.target
    setTaskDetail((prevValue) => ({
      ...prevValue,[name]:value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/api/task/${userEmail}`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(taskDetail)
      })

      if(response.ok){
        const data = await response.json()
        console.log('task data :',data.message)
        setTaskDetail({
          task: "",
          dueDate: "",
        })
        fetchTask()
      }

    } catch (error) {
      console.error(error)
    }
  }

  const fetchTask = async() => {
    const response = await fetch(`http://localhost:8000/api/task/${userEmail}`)
    if(response.ok){
      const data = await response.json()
      setTasks(data.tasks)
      console.log(userEmail)
    }
  }

  useEffect(()=>{
    fetchTask()
  },[])

  const handleCheckedChange = async(taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/comptask/move/${taskId}`,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
      })
      if(response.ok){
        const data = await response.json()
        console.log(data.message)
        fetchTask()
      }else{
        throw new Error('error movin task')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelTask = async(taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/deltask/move/${taskId}`,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
      })
      if(response.ok){
        const data = await response.json()
        console.log(data.message)
        fetchTask()
      }else{
        throw new Error('error moving task2')
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleSelectedTask = (task) => {
    setSelectedTask(task)
  }

  return (
    <div className="today-container">
      <div className="today-content">
        <Textarea 
        size='lg' 
        style={{width:'450px'}}
        placeholder='Add Task'
        minRows={2}
        name='task'
        onChange={handleInputChange}
        value={taskDetail.task}
        endDecorator={
        <div>
            {openDue && <Input
                            sx={{width:'300px'}}
                            type="date"
                            name='dueDate'
                            slotProps={{input: {min: currentDate,max: '2040-05-25',},}}
                            onChange={handleInputChange}
                            value={taskDetail.dueDate}
                        />
            }
         <div className='end-decorator-btn'>
          <Button variant='plain' color='neutral' onClick={() => setOpenRem(true)}>
            <NotificationsActiveIcon/>
          </Button>
          <Button variant='plain' color='neutral' onClick={() => setOpenDue(!openDue)}>
            <DateRangeIcon/>
          </Button>
          <Button variant='plain' color='neutral' style={{marginLeft:'270px'}} onClick={handleSubmit}>
            <Add/>
          </Button>
         </div>
        </div>
        }
        />
        <div className="today-modal">
          <div className="today-rem-modal">
            <Modal open={openRem} onClose={() => setOpenRem(false)}>
              <ModalDialog>
                <DialogTitle>Reminder</DialogTitle>
                <Textarea/>
              </ModalDialog>
            </Modal>
          </div>
          {selectedTask && <div className="info-modal">
            <Modal open={Boolean(selectedTask)} onClose={() => setSelectedTask(null)}> 
              <ModalDialog>
                <DialogTitle>
                  TASK
                </DialogTitle>
                {selectedTask.task}
                <DialogTitle>
                  DUE DATE
                </DialogTitle>
                {selectedTask.due_date ? format(new Date(selectedTask.due_date),'yyyy-MM-dd') : 'NULL'}
              </ModalDialog>
            </Modal>
          </div>}
        </div>
        <div className="today-task-container" >
           {tasks.map(task => (
             <Card key={task.id}>
             <div className="today-card">
             <Checkbox size="lg" variant="outlined" label={task.task} onChange={()=>handleCheckedChange(task.id)}/> 
             <Button variant='plain' color='neutral' style={{bottom:'5px'}} onClick={() => handleSelectedTask(task)}>
               <InfoOutlinedIcon/>
             </Button>
               <Button variant='plain' color='neutral' style={{bottom:'5px'}} onClick={()=>handleDelTask(task.id)}>
                 <DeleteForeverOutlinedIcon/>
               </Button>
             </div>
           </Card>
           ))}
        </div>
      </div>
    </div>
  )
}

export default Today