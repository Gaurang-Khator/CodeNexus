import React from 'react'
import HighlightText from '../components/core/Home/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingImage from '../assets/Images/FoundingStory.png'
import FactualSection from '../components/core/About/FactualSection'
import LearningChart from '../components/core/About/LearningChart'
import FormSection from '../components/core/common/FormSection'
import FooterHome from '../components/core/Home/FooterHome'

import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import { BiSolidQuoteSingleRight } from "react-icons/bi";

const About = () => {
    return (
    <div className=''>
        {/* Section 1 */}
        <section className=' bg-richblack-800 relative min-h-[600px]' >
            <div className='w-[60%] mx-auto text-center'>
                <h1 className='text-richblack-200 pt-20'>About us</h1>

                <h1 className='text-white font-bold text-4xl pt-10'>
                    Driving Innovation in Online Education for a 
                    <HighlightText text="Brighter Future"></HighlightText>
                </h1>
                <p className='text-richblack-300 text-[16px] mt-4 tracking-wide'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </div>
            <div className='flex flex-row justify-between w-10/12 mx-auto absolute left-24 -bottom-20'>
                    <img src={BannerImage1}/>
                    <img src={BannerImage2}/>
                    <img src={BannerImage3}/>
                </div>
        </section>
        {/* Section 2 */}
        <section className='bg-richblack-900 text-richblack-300  font-semibold py-20 border-b-[1px] border-richblack-700'>
            
            <p className='pt-32  mx-auto w-10/12 max-w-maxContent text-center relative'>
                <div className='flex flex-row absolute  left-8'>
                    <BiSolidQuoteSingleLeft/>
                    <BiSolidQuoteSingleLeft className='-ml-2'/>
                </div>
                <p className='text-4xl'>
                    We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}></HighlightText> , <span className='text-brown-50'>expertise</span>, and community to create an <span className='text-brown-100'>unparalleled educational experience.</span>
                </p>

                <div className='flex flex-row absolute bottom-[20px] right-36 '>
                <BiSolidQuoteSingleRight/>
                <BiSolidQuoteSingleRight className='-ml-2'/>
            </div>
            </p>
        </section>

        
        {/* Section 3 */}
        <section className='bg-richblack-900 text-richblack-300 py-14 pt-40'>
            <div className='max-w-maxContent w-10/12 mx-auto'>
                <div className='flex flex-row justify-between'>
                    <div className='w-[40%] flex flex-col gap-8'>
                        <h1 className='text-4xl font-semibold'>
                            Our Founding Story
                        </h1>
                        <p>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src={FoundingImage} width={470}/>
                    </div>
                </div>
                <div className='flex flex-row justify-between py-20 '>
                    <div className='w-[36%] flex flex-col gap-8'>
                        <h1 className='text-4xl font-semibold'>
                            Our Vision
                        </h1>
                        <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className='w-[36%] flex flex-col gap-8'>
                        <h1 className='text-4xl font-semibold'>
                            Our Mission
                        </h1>
                        <p>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        {/* Section 4 */}
        <section className='bg-richblack-800 text-white'>
            <FactualSection/>
        </section>
        {/* Section 5 */}
        <section className='bg-richblack-900 py-20 text-white'>
            <LearningChart/>
        </section>

        {/* Section 6 */}
        <section className='bg-richblack-900 py-20'>
            <div className='max-w-maxContent mx-auto w-7/12 flex flex-col gap-4 justify-center items-center'>
                <h1 className='text-4xl font-semibold text-richblack-5'>Get In Touch</h1>
                <p className='text-richblack-500'>We’d love to here for you, Please fill out this form.</p>
                <FormSection/>
            </div>
        </section>


        <FooterHome/>
    </div>
    )
}

export default About