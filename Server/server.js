const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const pool = require("./db.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config();


const app = express()
const PORT =  8000

app.use(cors())
app.use(bodyParser.json());

//posting task
app.post('/api/task/:userEmail',async(req,res) =>{
    const {userEmail} = req.params
    let {task,dueDate} = req.body
    dueDate = dueDate || null
    console.log(task,dueDate,userEmail)
    try {
        await pool.query("INSERT INTO addtask(user_email, task, due_date) VALUES($1, $2, $3)",[userEmail, task, dueDate])
        res.status(200).send({message:'task added succefully'})
    } catch (error) {
        console.error(error)
    }
})

//getting task
app.get('/api/task/:userEmail', async(req,res) => {
    const { userEmail } = req.params
    try {
        const result = await pool.query('SELECT * FROM addtask WHERE user_email = $1',[userEmail])
        const rows = result.rows
        res.status(200).send({tasks:rows})
    } catch (error) {
        console.error(error)
    }
})

//getting comp_task
app.get('/api/comptask/:userEmail',async(req,res) => {
    const { userEmail } = req.params
    try {
        const result = await pool.query('SELECT * FROM comp_task WHERE user_email = $1',[userEmail])
        const rows = result.rows
        res.status(200).send({tasks:rows})
    } catch (error) {
        console.log(error)
    }
})

//getting del_task
app.get('/api/deltask/:userEmail',async(req,res) => {
    const { userEmail } = req.params
    try {
        const  result = await pool.query('SELECT * FROM del_task WHERE user_email = $1',[userEmail])
        const rows = result.rows
        res.status(200).send({tasks:rows})
    } catch (error) {
        console.error(error)
    }
})

//gettin task fro upcoming module
app.get('/api/upcomtask/:userEmail',async(req,res) => {
    const { userEmail } = req.params
    try {
        const result = await pool.query('SELECT * FROM addtask WHERE user_email = $1 ORDER BY due_date',[userEmail])
        const rows = result.rows
        res.status(200).send({tasks:rows})
    } catch (error) {
        console.log(error)
    }
})


//moving task to completed task
app.put('/api/comptask/move/:taskId', async(req,res) => {
    const { taskId } = req.params
    try {
        const moveQuery = 'INSERT INTO comp_task SELECT * FROM addtask WHERE id = $1'
        await pool.query(moveQuery,[taskId])

        const delQuery = 'DELETE FROM addtask WHERE id = $1'
        await pool.query(delQuery,[taskId])
        res.status(200).send({message:'task moved successfuly'})

    } catch (error) {
        console.error(error)
    }
})


//moving task to delTask
app.put('/api/deltask/move/:taskId',async(req,res)=>{
    const {taskId} = req.params
    try {
        const moveQuery = 'INSERT INTO del_task SELECT * FROM addtask WHERE id = $1'
        await pool.query(moveQuery,[taskId])

        const delQuery = 'DELETE FROM addtask WHERE id = $1'
        await pool.query(delQuery,[taskId])
        res.status(200).send({message:'task moved successfuly'})

    } catch (error) {
        console.log(error)
    }
})


//signup
app.post('/api/submit', async(req,res) => {
    const {email,password} = req.body
    console.log(email,password)
    try {
        const userExist = await pool.query('SELECT * FROM users WHERE username = $1',[email])
        if(userExist.rows.length > 0){
           return res.status(400).json({message:'Email already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const addUser = await pool.query('INSERT INTO users(username,password) VALUES ($1,$2) RETURNING *',[email,hashedPassword])
        
        const token = jwt.sign({userId: addUser.rows[0].id},process.env.JWT_SECRET_KEY,{expiresIn: '1h'})
        res.status(200).json({token,email})
    } catch (error) {
        console.log(error)
    }
})



//login
app.post('/api/login', async(req,res) => {
    const {email,password} = req.body
    console.log(email,password)
    try {
       const user = await pool.query('SELECT * FROM users WHERE username = $1',[email])

       if(user.rows.length === 0){
        return res.status(401).json({message:'Invalid Email or Password'})
       }
       
       const isMatch = await bcrypt.compare(password, user.rows[0].password)

       if(!isMatch){
        return res.status(401).json({message:'Invalid Email or Password'})
       }

       const token = jwt.sign({userId: user.rows[0].id},process.env.JWT_SECRET_KEY,{expiresIn: '1h'})

       res.status(200).json({token,email})

    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))

