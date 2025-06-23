const jwt=require("jsonwebtoken");
require("dotenv").config();

//auth middle ware 

exports.auth=async(req,res,next)=>{
    try{
        //extracting token from bearer || cookie || body 
        console.log("here");
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token",token);
        if(!token){
            return res.status(500).json({
                success:false,
                message:"TOKEN NOT FOUND",
            })
        }

        try{
            //decoding the toekn 
            const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decodedtoken
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in token",
                error
            })
        }
        console.log("going ahead");

        // res.status(200).json({
        //     success:true,
        //     message:"Authentication was successfull",
        // })

        next();
    }
    catch(error){
        console.log("Error occured in authentication middleware",error);
        return res.status(500).json({
            success:false,
            message:"Authentication failed",
        })
    }
}


//isStudent middleawre

exports.isStudent=async (req,res,next)=>{
    try{
        const accountType=req.user.accountType;
        if(accountType!=="Student"){
            return res.status(500).json({
                success:false,
                message:"This route is ony for students ",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Student Role could not be verified",
        })
    }
}
//isInstructor middleawre

exports.isInstructor=async (req,res,next)=>{
    try{
        const accountType=req.user.accountType;
        if(accountType!=="Instructor"){
            return res.status(500).json({
                success:false,
                message:"This route is ony for instructors ",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Instructor Role could not be verified",
        })
    }
}
//isAdmin middleawre

exports.isAdmin=async (req,res,next)=>{
    try{
        const accountType=req.user.accountType;
        if(accountType!=="Admin"){
            return res.status(500).json({
                success:false,
                message:"This route is ony for students ",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Admin Role could not be verified",
        })
    }
}
