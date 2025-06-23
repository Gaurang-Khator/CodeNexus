import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../services/operations/ProfileUpdationAPI';
import { Link } from 'react-router-dom';


const EditBio = () => {

    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth)

    const dispatch=useDispatch();
    

    const Gender = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'RatherNotSay', label: 'Rather Not Say' }
    ];
    
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(); // Reset the form fields
        }
    }, [reset, isSubmitSuccessful])
    

    const submitEditInfo=async(data)=>{
        try{
            console.log(data);
            dispatch(updateProfile(data,token));
        }
        catch(error){
            console.log("Edit failed");

        }
    }
  return (
    <div className=' flex flex-col gap-5 w-7/12 mx-auto mt-10 '>
        <form onSubmit={handleSubmit(submitEditInfo)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 bg-richblack-800 rounded-lg px-20 py-10'>
                
                <div>Profile Information</div>
                <div className='flex flex-row gap-4 justify-between w-full '>
                    <div className='flex flex-col gap-1 w-[45%]'>
                        <label htmlFor='firstName' className='text-richblack-50 text-xs'>
                            First Name
                        </label>
                        <input 
                            type='text'
                            name='firstName'
                            id="firstName"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm  w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder={user.firstName?(user.firstName):""}
                            {...register('firstName', { })} 
                        
                        />
                        {
                            errors.firstName && 
                            <p className='text-[#cc0000] text-sm'>Enter first name.</p>
                        }
                    </div>
                    <div className='flex flex-col gap-1 w-[45%]'>
                        <label htmlFor='lastName' className='text-richblack-50 text-xs'>
                            Last Name
                        </label>
                        <input 
                            type='text'
                            name='lastName'
                            id="lastName"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm  w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder={user.lastName?(user.lastName):""}
                            {...register('lastName', {  })} 
                        
                        />
                        {
                            errors.lastName && 
                            <p className='text-[#cc0000] text-sm'>Enter Last name.</p>
                        }
                    </div>
                </div>


                <div className='flex flex-row gap-4 justify-between'>
                    <div className='flex flex-col gap-1 w-[45%]'>
                        <label htmlFor='dateOfBirth' className='text-richblack-50 text-xs'>
                            Date of Birth
                        </label>
                        <input 
                            type='date'
                            name='dateOfBirth'
                            id="dateOfBirth"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm  w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder=''
                            {...register('dateOfBirth', { })} 
                        
                        />
                        {
                            errors.dateOfBirth && 
                            <p className='text-[#cc0000] text-sm'> Enter Date of Birth </p>
                        }
                    </div>
                    
                    <div className='ml-5 flex flex-col w-[45%] mt-1'>
                        <label htmlFor='gender' className='text-richblack-50 text-xs'>Gender</label>
                        <select 
                            name='gender'
                            id="gender"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm  w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)] '
                            {...register('gender', { })} 
                        >
                            {
                                Gender.map((optedGender,index)=>{
                                    return (
                                        <option value={`${optedGender.value}`} key={index}>{optedGender.label}</option>
                                    )
                                })

                            }

                        </select>
                        {
                            errors.gender && 
                            <p className='text-[#cc0000] text-sm'>Gender is required.</p>
                        }
                    </div>
                </div>
                <div className='flex flex-row gap- justify-between'>
                    <div className='flex flex-col gap-1 w-[45%]'>
                        <label htmlFor='phoneNumber' className='text-richblack-50 text-xs'>
                            Contact Numbers
                        </label>
                        <input 
                            type='text'
                            name='phoneNumber'
                            id="phoneNumber"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder={user.additionalDetails.phoneNumber?(user.additionalDetails.phoneNumber):"0123-456-789"}
                            {...register('phoneNumber', { maxLength:12})} 
                        
                        />
                        {
                            errors.phoneNumber && 
                            <p className='text-[#cc0000] text-sm'>Invalid contact number.</p>
                        }
                    </div>
                    <div className='flex flex-col gap-1  w-[45%]'>
                        <label htmlFor='about' className='text-richblack-50 text-xs'>
                            About
                        </label>
                        <input 
                            type='text'
                            name='about'
                            id="about"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder={user.additionalDetails.about?(user.additionalDetails.about):"Enter something about yourself"}
                            {...register('about', {  })} 
                        
                        />
                        {
                            errors.about && 
                            <p className='text-[#cc0000] text-sm'>Enter the correct information.</p>
                        }
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-end justify-end gap-4'>
                <Link to="/dashboard/my-profile" className='bg-richblack-700 text-richblack-300 px-4 py-[6px] rounded-md text-lg font-semibold'>Close</Link>
                <button className='bg-yellow-50 text-black p-2 rounded-lg font-semibold px-4' type='submit'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default EditBio



    