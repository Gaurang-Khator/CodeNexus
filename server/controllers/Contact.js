const { mailSender } = require("../utils/MailSender");
require("dotenv").config();


//Controller for OTP GENERATION :First time registration k time 
exports.contactAdmin=async(req,res)=>{
    try{
        //extract email from request body
        const formData = req.body.formData;
        console.log("DAta from c ontollers",formData);
        console.log("in contact function ");

        const body=`From ${formData.email} \n Message ${formData.message}`


        await mailSender(process.env.ADMIN_EMAIL,"From About ",body);
        
        console.log("Mail has been sent successfully");
        return res.status(200).json({
            success:true,
            messge:"Email sent successfully",
            
        })
    }catch(error){
        console.log("Contacting Admin Failed ",error);
        return res.status(500).json({
            success:false,
            message:"Contacting Admin Failed",
            error
        })
    }
}