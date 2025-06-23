import React from 'react'
import ModifiedButtons from './ModifiedButtons'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const HomeCore = ({position,heading,subheading,btn1,btn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        {/* Part 1 */}
        <div className='w-1/2 flex flex-col gap-7'>
            <div>{heading}</div>
            <div className='font-bold text-richblack-300'>{subheading}</div>
            <div className='flex gap-5 mt-4'>

                <ModifiedButtons active={btn1.active} linkto={btn1.linkto}>

                    <div className='flex gap-2 items-center'>
                        {btn1.btnText}
                        <FaArrowRight/>
                    </div>
                </ModifiedButtons>

                <ModifiedButtons active={btn2.active} linkto={btn2.linkto}>
                        {btn2.btnText}
                </ModifiedButtons>
            </div>
        </div>

        {/* Part 2 */}
        <div>

            {/* Gradient */}

            <div className='flex flex-row h-fit w-[100%] text-[16px] lg:w-[500px]'>
                <div className='flex flex-col w-[10%] font-inter font-bold text-richblack-300'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`font-mono ${codeColor} w-[90%] font-bold gap-2`}>
                    <TypeAnimation
                        sequence={[codeblock,10000,""]}
                        repeat={Infinity}
                        style={
                            {
                                whiteSpace:'pre-line',
                                display:"block"
                            }
                        }
                        omitDeletionAnimation={true}
                    />

                </div>
            </div>

        </div>

    </div>
  )
}

export default HomeCore