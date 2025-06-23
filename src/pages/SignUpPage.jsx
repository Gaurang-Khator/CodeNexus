import React, { useState } from 'react';
import HighlightText from '../components/core/Home/HighlightText';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Frame from '../assets/Images/frame.png'
import Signup from '../assets/Images/signup.webp';

import { sendOtp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { setSignupData } from '../components/core/slices/authSlice';

const SignUpPage = () => {
    const [formData, setFormData] = useState({ firstName:"", lastName:"", phoneNumber:"", email: "", password: "",confirmPassword:""});
    const [role, setRole] = useState("Student");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function signUpHandler(e){
        e.preventDefault();
        const updatedData={...formData,accountType:role};
        dispatch(setSignupData(updatedData));
        dispatch(sendOtp(formData.email,navigate));
    }

    return (
        <section className='bg-richblack-900 w-screen h-screen'>
            <div className='w-10/12 max-w-maxContent mx-auto pt-20'>
                <div className='flex flex-row gap-32 justify-between '>

                    {/* Left Section  */}
                    <div className='flex flex-col gap-4 items-start w-2/5 '>
                        <div className='text-2xl text-white font-bold'>
                        Join the millions learning to code with StudyNotion for free

                        </div>
                        <div className='text-richblack-500'>
                            Build skills for today, tomorrow and beyond. <HighlightText text={"Education to future-proof your career."} />
                        </div>
                        {/* Student-Instructor scroller */}
                        {/* Student-Instructor scroller */}

                        <form onSubmit={signUpHandler}>
                            <div className='bg-richblack-800 rounded-full py-1 px-1 flex flex-row gap-1 mt-4 shadow-[0_1px_0px_0px_rgba(66,72,84,1)] w-2/5'>
                                <div className={`${role === "Student" ? "bg-richblack-900 text-white" : "bg-richblack-800  text-richblack-400"} px-4 py-2 gap-4 rounded-full  cursor-pointer transition-all duration-200`} onClick={() => setRole("Student")}>
                                    Student
                                </div>
                                <div className={`${role === "Instructor" ? "bg-richblack-900 text-white" : "bg-richblack-800  text-richblack-400"} px-4 py-2 gap-4 rounded-full  cursor-pointer transition-all duration-200`} onClick={() => setRole("Instructor")}>
                                    Instructor
                                </div>
                            </div>

                            {/* Input fields */}
                            <div className='w-full mt-2 flex flex-col gap-3'>
                                {/* NAME */}
                                <div className='flex flex-row gap-2'>
                                    {/* First Name */}
                                    <div className=''>
                                        <label htmlFor="firstName" className='text-white text-sm'>First Name <sup className='text-pink-500'>*</sup></label>
                                        <input type="text" name="firstName" value={formData.firstName} placeholder='Enter first name' id="firstName" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                                    </div>
                                    {/* Last Name */}
                                    <div className=''>
                                        <label htmlFor="lastName" className='text-white text-sm'>Last Name <sup className='text-pink-500'>*</sup></label>
                                        <input type="text" name="lastName" value={formData.lastName} placeholder='Enter last name' id="lastName" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                                    </div>
                                </div>
                                {/* EMAIL */}
                                <div className='w-full'>
                                    <label htmlFor="email" className='text-white text-sm'>Email Address <sup className='text-pink-500'>*</sup></label>
                                    <input type="email" name="email" value={formData.email} placeholder='Enter email address' id="email" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                                </div>
                                {/* PASSWORD */}
                                <div className='flex flex-row gap-2'>

                                    {/* Password */}
                                    <div className='relative mt-2'>
                                        <label htmlFor="password" className='text-white text-sm'>Password <sup className='text-pink-500'>*</sup></label>
                                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} placeholder='Enter Password' id="password" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                                        <div className='absolute bottom-4 right-3 text-xl'> {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setShowPassword(!showPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                                    </div>

                                    {/* Confirm Password */}

                                    <div className='relative mt-2'>
                                        <label htmlFor="confirmPassword" className='text-white text-sm'>Confirm Password <sup className='text-pink-500'>*</sup></label>
                                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm Password' id="confirmPassword" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                                        <div className='absolute bottom-4 right-3 text-xl'> {showConfirmPassword ? <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                                    </div>
                                </div>
                            </div>
                            <button className='bg-yellow-50 text-black py-3 px-6 w-full rounded-lg font-bold mt-4'>Create Account</button>
                        </form>
                        
                    </div>

                    {/* Right Section */}
                    <div className='relative w-2/5'>
                        <img src={Frame} className='absolute bottom-16 -right-5 ' id="frameimg"/>
                        <img src={Signup}  id="mainimg"/>
                    </div>


                </div>
            </div>
        </section>
    );
}

export default SignUpPage;
