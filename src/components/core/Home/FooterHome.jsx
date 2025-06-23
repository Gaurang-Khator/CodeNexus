import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import logo from '../../../assets/Logo/CodeNexus Cropped.png'

const FooterHome = () => {
  return (
    <div className='bg-richblack-800 text-richblack-300 py-10 pt-32'>
        <div className='w-10/12 max-w-maxContent mx-auto flex flex-col'> 

            <div className='flex flex-row gap-14'>
                <div className='flex flex-col gap-2'>
                    <div><img src={logo} width={200}/></div>
                    <div className='text-richblack-50 cursor-text font-bold mt-4 '>Company</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Careers</Link>
                    <Link to={"/about"} className='hover:text-richblack-50 cursor-pointer text-sm'>About</Link>
                    <Link to={"/affiliates"} className='hover:text-richblack-50 cursor-pointer text-sm'>Affiliates</Link>
                    <div className='flex flex-row gap-2'>
                        <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'><FaFacebook/></Link>
                        <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'><FaGoogle/></Link>
                        <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'><FaTwitter/></Link>
                        <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'><FaYoutube/></Link>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-richblack-50 cursor-text font-bold '>Resources</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Articles</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Blog</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Chart Sheet</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Code challenges</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Docs</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Projects</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Videos</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Workspaces</Link>
                    <div className='text-richblack-50 cursor-text font-bold mt-4'>Support</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Help Center</Link>

                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-richblack-50 cursor-text font-bold '>Plans</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Paid memberships</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>For students</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Business solutions</Link>
                    <div className='text-richblack-50 cursor-text font-bold mt-4'>Community</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Forums</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Chapters</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Events</Link>

                </div>

                <div className='w-[1px] h-[600px] bg-richblack-400 opacity-50'></div>

                <div className='flex flex-col gap-2'>
                    <div className='text-richblack-50 cursor-text font-bold '>Subjects</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>AI</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Cloud Computing</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Code Foundations</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Computer Science</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Cybersecurity</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Data Analytics</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Data Science</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Data Visualization</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Developer Tools</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>DevOps</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Game Development</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>IT</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Machine Learning</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Math</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Mobile Development</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Web Design</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Web Development</Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-richblack-50 cursor-text font-bold '>Languages</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Bash</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>C++</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>C#</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Go</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>HTML & CSS</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Java</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Javascript</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Kotlin</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>PHP</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Python</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>R</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Ruby</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>SQL</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Swift</Link>
                </div>
                <div className='flex flex-col gap-2'> 
                    <div className='text-richblack-50 cursor-text font-bold '>Career building</div>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Career Paths</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Career services</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Interview prep</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Professional certification</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Full catalog</Link>
                    <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Beta Content</Link>
                </div>


                

            </div>
            <div className='h-[1px] w-full bg-richblack-400 opacity-50 mt-16'></div>
            
            <div className='flex flex-row justify-between mt-16'>
                <div className='flex flex-row gap-4'>
                <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer border-r-[1px] border-richblack-400 pr-4 text-sm'>Privacy Policy</Link>
                <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer  border-r-[1px] border-richblack-400 pr-4 text-sm'>Cookie Policy</Link>
                <Link to={"/career"} className='hover:text-richblack-50 cursor-pointer text-sm'>Terms</Link>
                </div>
                <div className='text-sm flex flex-row items-center gap-2'>
                    Made with 
                    <FaHeart/> By <span>Gaurang Khator</span>
                </div>
            </div>


        </div>
    </div>
  )
}

export default FooterHome