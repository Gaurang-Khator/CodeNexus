import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setCourse, setEditCourse } from '../../slices/courseSlice';
import CreateCourse from '../CreateCourse';
import { fetchCourseDetails } from '../../../../services/operations/courseAPI';
import { useParams } from 'react-router-dom';

const EditCourse = () => {
    const {courseID}=useParams();
    console.log(courseID)
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();

    useEffect(()=>{
        const getFunctionDetails=async()=>{
            dispatch(resetCourseState());
            setLoading(true);
            const formData=new FormData();
            formData.append("courseID",courseID);
            console.log("form  data",[...formData]);
            const response=await fetchCourseDetails(formData);
            
            console.log("got",response);
            if(response && response.success){
                dispatch(setCourse(response.data));
                dispatch(setEditCourse(true));
            }
            setLoading(false);
        }
        getFunctionDetails();
    },[]);
    
  return (
    <div>
        {
            loading?("Loading..."):(course? (<CreateCourse/>):("Course not found")) 
        }
    </div>
  )
}

export default EditCourse