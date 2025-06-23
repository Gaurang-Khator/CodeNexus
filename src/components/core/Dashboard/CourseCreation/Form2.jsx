import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SectionCreation from "./SectionCreation";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../slices/courseSlice";
import { setEditCourse } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../services/operations/courseAPI";

const Form2 = () => {
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch=useDispatch();
    const {course}=useSelector((state)=>state.course);
    const [loading,setLoading]=useState(false);
    const [editSection,setEditSection]=useState(null);//keep section id 
    const {token}=useSelector((state)=>state.auth);
    const handleGoingBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    

    const handleGoingAhead=()=>{
        if(course.courseContent.length===0) {
            toast.error("Add a section to go the next step");
            return ;
        }
        if(course.courseContent.some((section)=>section.subSections.length===0)){
            toast.error("A section can not be empty");
            return ;
        }
        dispatch(setStep(3));
    }
    const handleCancelEdit=()=>{
        setEditSection(null);
        setValue("sectionName","");
    }

    const handleEditing=(sectionID,sectionName)=>{
        if(sectionID===editSection){
            //edit hatana hia
            setEditSection(null);
            setValue("sectionName","");
        }
        else{
            //edit krna hai 
            setEditSection(sectionID);
            setValue("sectionName",sectionName);
        }
    }

    const onSubmitHandler=async(data)=>{
        setLoading(true);
        let result;

        if(editSection){
            result=await updateSection({
                sectionID:editSection,
                sectionName:data.sectionName,
                courseID:course._id
            },token);
        }
        else{
            result=await createSection({
                sectionName:data.sectionName,
                courseID:course._id
            },token)
        }
        

        if(result){
            dispatch(setCourse(result));
            setEditSection(null);
            setValue("sectionName","");
        }
        setLoading(false);
    }

    return <div>
        <div>Course Builder</div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <label htmlFor="sectionName">Section Name<sup>*</sup></label>
            <input  
                type="text"
                placeholder="Add section name"
                {...register("sectionName",{required:true})}
                name="sectionName"
                id="sectionName"
                className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                />
                {errors.sectionName && <span>Section Name is required</span>}
            <button type="submit">{editSection?"Edit section name":"Add section"}</button>
            {editSection && <div onClick={()=>handleCancelEdit()} className="underline">Cancel Edit</div>}
        </form>

        {course.courseContent.length>0 &&(
            <SectionCreation handleEditing={handleEditing}/>
        )}

        <div>
            <button onClick={()=>{handleGoingBack()}}>Back</button>
            <button  onClick={()=>{handleGoingAhead()}}>Next</button>
        </div>


    </div>;
};

export default Form2;