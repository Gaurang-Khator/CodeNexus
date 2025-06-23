import React from 'react'
import FooterHome from '../components/core/Home/FooterHome'
import FormSection from '../components/core/common/FormSection'
import { IoCallSharp } from "react-icons/io5";
import { FaEarthAfrica } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";

const Contact = () => {
  return (
    <div className='bg-richblack-900'>
        <div className='mx-auto w-10/12 max-w-maxContent py-20 '>
            <div className='flex flex-row gap-24'>
                {/* Left part */}
                <div className='text-richblack-500 bg-richblack-800 rounded-lg p-10 pr-32 flex gap-8 flex-col max-h-[450px] '>
                    <div className='flex flex-row gap-2'>
                        <div className='text-richblack-200 text-lg mt-2'>
                            <MdMessage/>
                        </div>
                        <div className='flex flex-col '>
                            <div className='text-richblack-50 font-bold'>Chat on us</div>
                            <div className='text-sm font-semibold'>Our friendly team is here to help.</div>
                            <div className='text-sm font-semibold'>@mail.address</div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className='text-richblack-200 text-lg mt-2'>
                            <FaEarthAfrica/>
                        </div>
                        <div className='flex flex-col '>
                            <div className='text-richblack-50 font-bold'>Visit us</div>
                            <div className='text-sm font-semibold'>Come and say hello at our office HQ.</div>
                            <div className='text-sm font-semibold'>Here is the location/ address</div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className='text-richblack-200 text-lg mt-2'>
                            <IoCallSharp/>
                        </div>
                        <div className='flex flex-col '>
                            <div className='text-richblack-50 font-bold'>Call us</div>
                            <div className='text-sm font-semibold'>Mon - Fri From 8am to 5pm</div>
                            <div className='text-sm font-semibold'>+123 456 7890</div>
                        </div>
                    </div>
                </div>
                {/* Right part */}
                <div className='flex flex-col gap-4 p-20 border-richblack-700 rounded-md border'>
                    <h1 className='text-4xl font-semibold text-richblack-5'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                    <p className='text-richblack-500'>Tell us more about yourself and what you’re got in mind.</p>
                    <FormSection/>
                </div>
            </div>

        </div>
        <FooterHome/>
    </div>
  )
}

export default Contact