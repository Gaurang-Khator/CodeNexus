// const nodemailer=require('nodemailer');
// require("dotenv").config();
// exports.mailSender=async(email,title,body)=>{
//     try{
//         const transporter=nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             }
//         });
//         const info=transporter.sendMail({
//             from:"EdTech Platform: By Gaurang Khator",
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`
//         })
//         console.log(info);
//         return info;
//     }
//     catch(error){
//         console.log("Error occuring in mail sending config",error);
//     }
// }

const nodemailer = require('nodemailer');
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, // Use 465 with secure: true for Gmail
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"EdTech Platform: Gaurang Khator" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("❌ Error in mail sending config:", error);
  }
};
