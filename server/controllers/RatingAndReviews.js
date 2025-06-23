const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReviews");

exports.createRating=async(req,res)=>{
    try{
        const {rating,review,courseID}=req.body;

        const userID=req.user.id;

        if(!rating || !courseID){
            return res.status(500).json({
                success:false,
                message:"All fields must be filled",
            })
        }
        
        //check if user is enrolled in course or not :if not he/she cant review

        const course=await Course.findById(courseID);
        if(!course){
            return res.status(500).json({
                success:false,
                message:"Course not found",
            })
        }
        if(course.studentsEnrolled.includes(userID)===false){
            return res.status(500).json({
                success:false,
                message:"User not enrolled in course",
            })
        }

        //check if user has already reviewed or not : if yes return 

        const alreadyReviewed=await RatingAndReviews.findOne({user:userID,course:courseID});
        // console.log('hjgjjg',alreadyReviewed);

        if(alreadyReviewed){
            return res.status(500).json({
                success:false,
                message:"User has already reviewed",
            })
        }



        const ratingResponse=await RatingAndReviews.create({user:userID,rating,review,course:courseID});


        const updatedCourse=await Course.findByIdAndUpdate(courseID,{
            $push:{
                ratingAndReviews:ratingResponse._id,
            }
        })

        if(!updatedCourse){
            return res.status(500).json({
                success:false,
                message:"Course was not updated",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Rating created successfully",
            ratingResponse
        })


    }catch(error){
        console.log("Rating creation failed ",error);
        return res.status(500).json({
            success:false,
            message:"Rating creation failed",
        })
    }
}



exports.getAverageRating=async(req,res)=>{
    try{
        const {courseID}=req.body;

        if(!courseID){
            return res.status(500).json({
                success:false,
                message:"Course id nnot found"
            })
        }

        const course=await Course.findById(courseID);
        if(!course){
            return res.status(500).json({
                success:false,
                message:"Course not found in db"
            })
        }

        const ratingIDs=course.ratingAndReviews;

        let counter=0;
        let ratingcount=0;
        while(counter<ratingIDs.length){
            ratingcount+=ratingIDs[counter].rating;
            counter++;
        }
        let avg=0;

        if(counter!=0)
        avg=ratingcount/counter;

        return res.status(200).json({
            success:true,
            message:"Aveerage rating sent",
            avg
        })

            
    }catch(error){
        console.log("Rating avg calculation failed ",error);
        return res.status(500).json({
            success:false,
            message:"Rating avg calculation failed",
        })
    }

}


exports.getAllRatingCourse=async(req,res)=>{
    try{
        const {courseID}=req.body;

        if(!courseID){
            return res.status(500).json({
                success:false,
                message:"Course id nnot found"
            })
        }
        const allRatings=await RatingAndReviews.find({course:courseID})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName emailID image"                                        
                                    })
                                    .exec();

        return res.status(200).json({
        success:true,
        message:"All rating sent",
        allRatings
        })
            
    }catch(error){
        console.log("Rating send failed ",error);
        return res.status(500).json({
            success:false,
            message:"Rating send failed",
        })
    }
}



exports.getAllRating=async(req,res)=>{
    try{

        const allRatings=await RatingAndReviews.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName emailID image"                                        
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseTitle"
                                            })
                                            .exec();

        return res.status(200).json({
            success:true,
            message:"All rating sent",
            allRatings
        })

            
    }catch(error){
        console.log("Rating send failed ",error);
        return res.status(500).json({
            success:false,
            message:"Rating send failed",
        })
    }
}