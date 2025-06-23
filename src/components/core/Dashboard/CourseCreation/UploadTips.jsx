import React from 'react'
import { FaFire } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa6";

const UploadTips = () => {
	return (
		<div className='bg-richblack-700 rounded-lg text-richblack-5 px-10 py-10 min-h-[450px] mr-20'>
			<div className='flex flex-row items-center gap-4 text-2xl'>
				<FaFire className='text-pink-200'/>
				Course Upload Tips
			</div>
			<ul className='mt-10'>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Set the Course Price option or make it free.
				</li>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Standard size for the course thumbnail is 1024x576.
				</li>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Video section controls the course overview video.
				</li>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Course Builder is where you create & organize a course.
				</li>
				<li className='flex flex-row items-start gap-2'>
					<FaHandPointRight/>
					Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
				</li>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Information from the Additional Data section shows up on the course single page.
				</li>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Make Announcements to notify any important
				</li>
				<li className='flex flex-row items-center gap-2'>
					<FaHandPointRight/>
					Notes to all enrolled students at once.
				</li>

			</ul>

		</div>
	)
}

export default UploadTips