import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";


const VerifyEmail = () => {
	const {loading,signupData}=useSelector((state)=>state.auth);
	const [otp,setOtp]=useState("");
	const dispatch=useDispatch();
	const navigate=useNavigate();

	useEffect(()=>{
		if(!signupData){
			navigate("/signup");
		}
	})

	const {accountType,
	firstName,
	lastName,
	email,
	password,
	confirmPassword,}=signupData;

	function handleOnSubmit(e){
		e.preventDefault();
		dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
	}
	return (
		<div className='flex justify-center items-center fixed w-full h-full bg-richblack-900 text-white'>
			{
				loading?(<div>Loading...</div>):
				(<div >
					<h2 className='text-3xl font-bold'>Verify Email</h2>
					<p className='text-richblack-200'>A verification code has been sent to you. Enter the code below</p>
					<form onSubmit={handleOnSubmit}>
					<OtpInput
						value={otp}
						onChange={setOtp}
						numInputs={6}
						renderSeparator={<span> <pre>  </pre></span>}
						renderInput={(props) => <input {...props} />}
						inputStyle={`bg-richblack-800 rounded-sm text-lg border-blue `} id="otpstyle"

						
					/>
						<button className='text-black bg-yellow-50 py-3 w-full font-bold rounded-lg mt-4'>Verify Email</button>
					</form>
					<div className='flex flex-row justify-between items-center mt-4'>
						<Link to="/login" className='flex flex-row gap-2 items-center'>
							<FaLongArrowAltLeft/>
							Back to login
						</Link>
						<div className='flex flex-row gap-2 items-center text-blue-100 cursor-pointer'>
							<FaRepeat/>
							<div onClick={dispatch(sendOtp)} >Resend it</div>
						</div>
					</div>
				</div>)
			}
		</div>
	)
}

export default VerifyEmail