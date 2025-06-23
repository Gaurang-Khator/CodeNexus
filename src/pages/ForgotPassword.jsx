import React, { useState } from 'react'
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux'

const ForgotPassword = () => {

    const [email,setEmail]=useState("");
    const [emailSent,setEmailSent]=useState(false);
    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));

    }

    return (
        <div className='bg-richblack-900 text-white w-full h-full flex items-center justify-center flex-col gap-2 fixed'>
            <div className='flex-col w-[30%] mx-auto flex gap-2'>
                <h2 className='text-richblack-5 text-2xl font-bold'>
                    {
                        !emailSent ?("Reset Your Password"):("Check email")
                    }
                </h2>
                <p className='text-richblack-300'>
                    {
                        !emailSent ? ("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"):(`We have sent the reset email to ${email}`)
                    }
                </p>
                {
                !emailSent && (
                    <form onSubmit={submitHandler} className='flex flex-col'>
                        <label for="email" className='text-sm text-richblack-50'>Email Address <sup className='text-pink-300'>*</sup></label>
                        <input type="email"
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Enter your email address'
                                className='bg-richblack-800 placeholder:text-white rounded-lg py-2 px-4 mt-2'
                        />

                        <button type='submit' className='text-black bg-yellow-50 py-3 w-full font-bold rounded-lg mt-6'>
                            {
                                !emailSent ? ("Reset Password"):("Resend Email")
                            }
                        </button>
                    </form>
                )
                }


            </div>
        </div>
    )
}

export default ForgotPassword