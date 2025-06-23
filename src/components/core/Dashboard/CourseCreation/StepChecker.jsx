import React from 'react'
import { useSelector } from 'react-redux'
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import { FaCheck } from "react-icons/fa";

const StepChecker = () => {
    const {step}=useSelector((state)=>state.course);

    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]
  return (
    <div>
        <div  className='flex flex-row w-full justify-between'>
            {
                steps.map((stepCount)=>{
                    return (<div className='flex flex-col items-center mr-10'>
                        <div className={` ${step===stepCount.id ? "bg-yellow-300 border-yellow-50 text-richblack-900" : "bg-richblack-800 border-richblack-700 text-richblack-300"} font-bold rounded-full p-1 h-[30px] flex items-center justify-center aspect-square `} key={stepCount.id}>{stepCount<step ? (<FaCheck/>):(stepCount.id)}</div>
                        <div className='font-semibold text-sm mt-1'>{stepCount.title}</div>
                    </div>)
                })
            }
        </div>
        {step===1 && <Form1/>}
        {step===2 && <Form2/>}
        {step===3 && <Form3/>}
    </div>
  )
}

export default StepChecker