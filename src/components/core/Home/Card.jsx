import React from 'react'
import { FaPeopleGroup } from "react-icons/fa6";
import { GiFamilyTree } from "react-icons/gi";

export const Card = ({course,currentCard,setCurrentCard}) => {
  return (
    <div className={`flex flex-col course ${course.heading===currentCard ?"bg-white shadow-[10px_10px_0px_0px_rgba(255,214,10,1)]" : "bg-richblack-800"} hover:bg-richblack-5 transition-all duration-200 p-4 w-[350px] group` } onClick={()=>setCurrentCard(course.heading)}>
        <div className={`${course.heading===currentCard ? "text-black" : "text-white" } text-xl font-bold group-hover:text-black transition-all duration-200`}>
            {course.heading}
        </div>
        <div className='text-richblack-500 pb-24 border-b-2 border-dotted border-richblack-400 mt-2'>
            {course.description}
        </div>
        <div className='flex flex-row justify-between text-blue-300 mt-6 font-bold'>
            <div className='flex flex-row gap-2 items-center'>
                <FaPeopleGroup/>
                {course.level}
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <GiFamilyTree/>
                {course.lessionNumber}
                {" Lesson"}
            </div>
        </div>
    </div>
  )
}
