import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useLocation,useNavigate} from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react';
import { TiTick } from "react-icons/ti";



const UpdatePassword = () => {  
    const loading = useSelector((state) => state.auth.loading);
    const [formData, setFormData] = useState({password: "",confirmPassword:""});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();
    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleonSubmit(e){
        e.preventDefault();
        const token=location.pathname.split('/').at(-1);

        dispatch(resetPassword(formData.password,formData.confirmPassword,token,navigate));
    }
    return (
        <div className='bg-richblack-900 text-white flex flex-col justify-center items-center h-full w-full fixed'>
        {
            loading?(<div>Loading....</div>):(
                <div className='w-[25%]'>
                    <h2 className='text-3xl font-bold'>Choose new password</h2>
                    <p className='text-richblack-50'>Almost done. Enter your new password and youre all set.</p>

                    <form onSubmit={handleonSubmit}>
                        {/* Password */}
                        <div className='relative mt-2'>
                            <label htmlFor="password" className='text-white text-xs'>New Password <sup className='text-pink-500'>*</sup></label>
                            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} placeholder='Enter Password' id="password" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                            <div className='absolute bottom-4 right-3 text-xl'> {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setShowPassword(!showPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                        </div>

                        {/* Confirm Password */}

                        <div className='relative mt-2'>
                            <label htmlFor="confirmPassword" className='text-white text-xs'>Confirm New Password <sup className='text-pink-500'>*</sup></label>
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm Password' id="confirmPassword" className='bg-richblack-800 px-2 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]' onChange={changeHandler} />
                            <div className='absolute bottom-4 right-3 text-xl'> {showConfirmPassword ? <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                        </div>

                        <div className='flex flex-row gap-4'>
                            <div>
                                <ul className='mt-3'>
                                    <li className='text-caribbeangreen-50 flex flex-row gap-2 items-center'><div className='rounded-full h-4 w-4 bg-caribbeangreen-50 text-black '><TiTick/></div><div className='text-[12px]'>one lowercase character</div></li>
                                    <li className='text-caribbeangreen-50 flex flex-row gap-2 items-center'><div className='rounded-full h-4 w-4 bg-caribbeangreen-50 text-black '><TiTick/></div><div className='text-[12px]'>one uppercase character</div></li>
                                    <li className='text-caribbeangreen-50 flex flex-row gap-2 items-center'><div className='rounded-full h-4 w-4 bg-caribbeangreen-50 text-black'><TiTick/></div><div className='text-[12px]'>one number</div></li>
                                </ul>
                            </div>
                            <div>
                                <ul className='mt-3'>
                                    <li className='text-caribbeangreen-50 flex flex-row gap-2 items-center'><div className='rounded-full h-4 w-4 bg-caribbeangreen-50 text-black'><TiTick/></div><div className='text-[12px]'>one special character</div></li>
                                    <li className='text-caribbeangreen-50 flex flex-row gap-2 items-center'><div className='rounded-full h-4 w-4 bg-caribbeangreen-50 text-black'><TiTick/></div><div className='text-[12px]'>8 character minimum</div></li>
                                </ul>

                            </div>
                        </div>

                        <button className='text-black bg-yellow-50 py-3 w-full font-bold rounded-lg mt-4'>Reset Password</button>
                    </form>
                </div>
            )
        }

        </div>
    )
}

export default UpdatePassword