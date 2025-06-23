import React, { useState } from 'react';
import HighlightText from '../components/core/Home/HighlightText';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Frame from '../assets/Images/frame.png'
import Login from '../assets/Images/login.webp';
import {login} from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [role, setRole] = useState("Student");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function loginHandler(e){
        e.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }

    return (
        <section className='bg-richblack-900 w-screen h-screen '>
            <div className='w-10/12 max-w-maxContent mx-auto pt-20'>
                <div className='flex flex-row gap-32 justify-between '>

                    {/* Left Section  */}
                    <div className='flex flex-col gap-4 items-start w-2/5 '>
                        <div className='text-2xl text-white font-bold'>
                            Welcome Back
                        </div>
                        <div className='text-richblack-500'>
                            Build skills for today, tomorrow and beyond. <HighlightText text={"Education to future-proof your career."} />
                        </div>
                        {/* Student-Instructor scroller */}
                        <div className='bg-richblack-800 rounded-full py-1 px-1 flex flex-row gap-1 mt-4 shadow-[0_1px_0px_0px_rgba(66,72,84,1)]'>
                            <div className={`${role === "Student" ? "bg-richblack-900 text-white" : "bg-richblack-800  text-richblack-400"} px-4 py-2 gap-4 rounded-full  cursor-pointer transition-all duration-200`} onClick={() => setRole("Student")}>
                                Student
                            </div>
                            <div className={`${role === "Instructor" ? "bg-richblack-900 text-white" : "bg-richblack-800  text-richblack-400"} px-4 py-2 gap-4 rounded-full  cursor-pointer transition-all duration-200`} onClick={() => setRole("Instructor")}>
                                Instructor
                            </div>
                        </div>

                        {/* Input fields */}
                        <div className='w-full mt-2'>
                            <div className='w-full'>
                                <label htmlFor="email" className='text-white text-sm'>Email Address <sup className='text-pink-500'>*</sup></label>
                                <input type="email" name="email" value={formData.email} placeholder='Enter email address' id="email" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                            </div>

                            <div className='relative mt-2'>
                                <label htmlFor="password" className='text-white text-sm'>Password <sup className='text-pink-500'>*</sup></label>
                                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} placeholder='Enter Password' id="password" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                                <div className='absolute bottom-4 right-3 text-xl'> {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setShowPassword(!showPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                            </div>
                            <Link to="/forgot-password" className='text-xs text-blue-100 flex flex-row-reverse w-full mt-2'>Forgot Password</Link>
                        </div>
                        <button className='bg-yellow-50 text-black py-2 px-6 w-full rounded-lg font-bold' onClick={loginHandler}>Sign In</button>
                        
                    </div>

                    {/* Right Section */}
                    <div className='relative w-2/5'>
                        <img src={Frame} className='absolute -bottom-5 -right-5 ' id="frameimg"/>
                        <img src={Login} className='' id="mainimg" />
                    </div>


                </div>
            </div>
        </section>
    );
}

export default LoginPage;
