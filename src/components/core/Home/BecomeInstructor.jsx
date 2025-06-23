import React from 'react'
import Instrucor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import ModifiedButtons from './ModifiedButtons'
import { FaArrowRight } from 'react-icons/fa'

const BecomeInstructor = () => {
  return (
    <div className='flex flex-row gap-10 my-20'>
        <div className='w-1/2'>
            <img src={Instrucor} className='shadow-[-20px_-20px_0px_0px_rgba(255,255,255,1)]'/>
        </div>
        <div className='flex flex-col gap-10 items-start justify-center w-2/5'>
            <div className='text-bold text-4xl'>
                Become an
                <br/>
                <HighlightText text={"instructor"}/>
            </div>
            <div className='text-richblack-500 '>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>
            <div>
                <ModifiedButtons linkto={"/signup"} active={true} >
                    <div className="flex flex-row gap-4 items-center mx-auto">
                        <div>Start Teaching Today</div>
                        <FaArrowRight/>
                    </div>
                </ModifiedButtons>
            </div>

        </div>
    </div>
  )
}

export default BecomeInstructor