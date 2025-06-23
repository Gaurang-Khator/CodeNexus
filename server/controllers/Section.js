const Course = require("../models/Course");
const Section=require("../models/Section");

//createsecction 
exports.createSection =async(req,res)=>{
    
    try{
        //fetch the data
        const {sectionName,courseID}=req.body;
    
        //validation
        if(!sectionName || !courseID){
            return res.status(500).json({
                success:false,
                message:"Section creation failed",
            })
        }
    
        //creating the section 
    
        const sectionDetails=await Section.create({sectionName});
    
        //now we need to upate the course:all populating both section and subsection 
    
        const updatedCourse=await Course.findByIdAndUpdate({_id:courseID},
                                    {
                                        $push:{
                                            courseContent:sectionDetails._id
                                        }
                                    }
                                    ,{new:true})
                                    .populate({
                                        path: 'courseContent',
                                        populate: {
                                            path: 'subSections'
                                        }
                                    })
                                    .exec();
                                
    
        //return the response
        return res.status(200).json({
            success:true,
            message:"Section creation performed successfully",
            updatedCourse
        })
        
    }catch(error){
        console.error("An error occuring while creating the section",error);
        return res.status(500).json({
            success:false,
            message:"Section creation failed",
        })
    }
}


//updation of a section 

exports.updateSection=async(req,res)=>{
    //data fetch 
    try{
        const {sectionName,sectionID,courseID}=req.body;
        //validate the data
        if(!sectionName || !sectionID){
            return res.status(500).json({
                success:false,
                message:"All fields must be filled",
            })
        }
        console.log("m toh backend m aagya bhaiya ");

        const updatedSection=await Section.findByIdAndUpdate({_id:sectionID},{sectionName},{new:true});
        const updatedCourse=await Course.findById(courseID).populate({
            path: 'courseContent',
            populate: {
                path: 'subSections'
            }
        })
        .exec();

        //return the response
        return res.status(200).json({
            success:true,
            message:"Section creation performed successfully",
            updatedCourse
        })
        
    }catch(error){
        console.error("An error occuring while creating the section",error);
        return res.status(500).json({
            success:false,
            message:"Section creation failed",
        })
    }
}


//deleting a section 


exports.deleteSection =async(req,res)=>{
    try {
        // Fetch the section ID and course ID from the request parameters
        const { sectionID, courseID } = req.body;

        // Validation
        if (!sectionID || !courseID) {
            return res.status(400).json({
                success: false,
                message: "Both section ID and course ID are required."
            });
        }

        // Remove the section from the Section model
        await Section.findByIdAndDelete(sectionID);

        // Remove the section reference from the Course model
        const updatedCourse = await Course.findByIdAndUpdate(
            courseID,
            {
                $pull: { courseContent: sectionID }
            },
            { new: true }).populate({
                path: 'courseContent',
                populate: {
                    path: 'subSections'
                }
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse
        });
    } catch (error) {
        console.error("An error occurred while deleting the section", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete the section"
        });
    }
}