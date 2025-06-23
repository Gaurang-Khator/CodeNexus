import React from 'react'
import HighlightText from './HighlightText'
import KnowYourProgress from '../../..//assets/Images/Know_your_progress.svg'
import CompareWithOthers from '../../../assets/Images/Compare_with_others.svg'
import PlanYourLessons from '../../../assets/Images/Plan_your_lessons.svg'
import ModifiedButtons from './ModifiedButtons'

const CalendarSection = () => {
  return (
    <div className='w-10/12 max-w-maxContent mx-auto flex flex-col relative items-center min-h-[800px] gap-4'>
        <div className='text-semibold text-4xl mx-auto'>
            Your swiss knife for <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-richblack-700 text-center w-[70%] mx-auto'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <img src={KnowYourProgress} className='absolute top-[100px] left-[10px] mt-28'/>
        <img src={CompareWithOthers} className='absolute top-[100px] right-[410px] mt-10'/>
        <img src={PlanYourLessons} className='absolute top-[150px] right-[80px]'/>

        <div className='translate-y-[600px]'>
            <ModifiedButtons linkto={"/signup"} active={true} >
                Learn More
            </ModifiedButtons>
        </div>

    </div>
  )
}

export default CalendarSection