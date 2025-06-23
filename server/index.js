const express = require('express');
const app=express();

const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile');
const paymentRoutes=require('./routes/Payment');
const courseRoutes=require('./routes/Course');
const contactRoutes=require('./routes/Contact')
const courseProgressRoutes=require('./routes/CourseProgress')


const {dbConnect}=require('./config/database');
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
const {cloudinaryConnect}=require('./config/cloudinary');
const cors=require("cors");
require("dotenv").config();

const PORT=process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin:["http://localhost:3000","https://codenexus-nu.vercel.app"],
        credentials:true,
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)


dbConnect();
cloudinaryConnect();


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/contact",contactRoutes);
app.use("/api/v1/courseProgress",courseProgressRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Default route has been running succesfuly"
    })
});

app.listen(PORT,()=>{
    console.log(`YOur backend is running on ${PORT}`);
})