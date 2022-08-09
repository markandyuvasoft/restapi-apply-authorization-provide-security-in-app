import express from 'express'
import mongoose from 'mongoose'
import db from './db/conn.js'
import bodyParser from 'body-parser'
import studentrouter from './routes/student.js'
import userrouter from './routes/user.js'
const app=express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))




 app.use("/student",studentrouter)
app.use("/user",userrouter)


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad requ'
    })
})



app.set('view engine','ejs')
app.set('views','./views')

app.listen(3000)

console.log("http://localhost:3000")
