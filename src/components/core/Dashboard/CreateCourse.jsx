import React, { useState } from 'react'
import UploadTips from './CourseCreation/UploadTips'
import StepChecker from './CourseCreation/StepChecker'
import { setStep } from '../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'

const CreateCourse = () => {
	const dispatch=useDispatch();
	const {editCourse}=useSelector((state)=>state.course);
  return (
	<div className='bg-richblack-900 w-full px-5 text-white flex flex-row gap-10 p-4 '>
		<div className='w-10/12 ml-28'>
			<div className='text-richblack-5 text-3xl font-semibold my-6 '>{editCourse?"Edit":"Add"} a Course</div>
			<StepChecker/>
		</div>
		<UploadTips />
	</div>
  )
}

export default CreateCourse