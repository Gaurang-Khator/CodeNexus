import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ratingEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";

const ReviewModal = ({ setReviewModalData }) => {
    const { user } = useSelector((state) => state.profile);
    console.log(user);
    const {token}=useSelector((state)=>state.auth);

    const {courseEntireData}=useSelector((state)=>state.viewCourse);

    const {CREATE_RATING_API}=ratingEndpoints;

    const {
        setValue,
        formState: { errors },
        register,
        handleSubmit,
    } = useForm();

    useEffect(() => {
        setValue("courseStars", 0);
        setValue("courseExperience", "");
    }, []);

    const submitHandler = async(data) => {
        console.log(data);
        if(data.courseStars===0)    {
            toast.dismiss('Rate the content');
            return ;
        }
        else{
            const response=await apiConnector("POST",CREATE_RATING_API,{rating:data.courseStars,review:data.courseExperience,courseID:courseEntireData._id,token})
            if(response && response.success){
                toast.success('Rating Added Successfully ');
            }
            else{
                toast.dismiss('Technical Glitch ! Please Try again later')
            }
        }
        setReviewModalData(false);
    };

    const ratingChanged = (newRating) => {
        setValue("courseStars", newRating);
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div>Add Review</div>
                <div onClick={() => setReviewModalData(false)}>
                    <IoMdClose />
                </div>
            </div>
            <div>
                <div>
                    <div className="flex flex-row gap-3 h-[100px] items-center justify-between">
                        <img
                            src={user.image}
                            className="aspect-square w-[40px] rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">
                                {user.firstName} {user.lastName}
                            </div>
                            <div>Posting Publicly</div>
                        </div>
                    </div>
                </div>

                <div>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
                        <label htmlFor="courseExperience">
                            Add Your Experience
                        </label>
                        <textarea
                            name="courseExperience"
                            id="courseExperience"
                            placeholder="Add Your Experience"
                            {...register("courseExperience", {
                                required: true,
                            })}
                        ></textarea>
                        {errors.courseExperience && (
                            <span>Enter Your course experience</span>
                        )}

                        <div>
                            <button
                                onClick={() => {
                                    setReviewModalData(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
