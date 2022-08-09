import express from 'express'
import Student from '../model/student.js'
import mongoose from 'mongoose'
import checkAuth from '../middleware/check-auth.js'

const studentrouter=express.Router()


//GET STUDENT 
studentrouter.get("/",checkAuth,(req,res)=>{
Student.find()
.then(result=>{

    res.status(200).json({

        studentData:result
    })
})
.catch(err=>{
    console.log(err)

    res.status(500).json({
        error:err
    })
})
})

//GET STUDENT BY ID
studentrouter.get("/:id",(req,res,next)=>{

    console.log(req.params.id)
        Student.findById(req.params.id)

        .then(result=>{
            res.status(200).json({

                student:result
            })
        })
        .catch(err=>{
            console.log(err)
        res.status(500).json({
            error:err
        })
        })
})

//POST STUDENT
studentrouter.post("/",(req,res)=>{
 
 const student =new Student({

    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender
 })
 student.save()
 
 .then(result=>{
    console.log(result)
    res.status(200).json({
        newStudent:result
    })
 })

 .catch(err=>{

console.log(err)

res.status(500).json({
    error:err
})
 })
})
 
//DELETE STUDENT

studentrouter.delete("/:id",(req,res,next)=>{

    Student.remove({_id:req.params.id})

    .then(result=>{

        res.status(200).json({
            message:'details delete',
            result:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//PUT STUDENT UPDATE

studentrouter.put("/:id",(req,res,next)=>{

    console.log(req.params.id)
    Student.findOneAndUpdate({_id:req.params.id},{

        $set:{

            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender 
        }
    })
    .then(result=>{
        res.status(200).json({

            updated_student:result

        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})





export default studentrouter;