require('dotenv').config()
const express=require('express')
const app=express();
const connection=require("./db.js")
const cors=require("cors")
const userRoutes=require('./routes/user')
const AuthRoutes=require('./routes/auth')


//connection

connection();
  
//middlewares
app.use(express.json())
 app.use(cors())

 app.use("/api/users",userRoutes)
 app.use("/api/auth",AuthRoutes)
 const port=process.env.PORT||8080
 app.listen(port,()=>console.log("listening on the port ${port}"))