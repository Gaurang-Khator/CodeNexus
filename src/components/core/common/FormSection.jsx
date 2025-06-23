import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../../data/countrycode.json'
import { contactAdmin } from '../../../services/operations/contactAPI';


const FormSection = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            // reset(); // Reset the form fields
        }
    }, [reset, isSubmitSuccessful])
    

    const submitContactForm=async(data)=>{
        try{
            console.log(data);
            await contactAdmin(data);
            console.log("contact success");
        }
        catch(error){
            console.log("contacting failed");

        }
    }
    
    return (
        <div className=''>
            <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-4'>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='firstName' className='text-richblack-50 text-xs'>
                            First Name
                        </label>
                        <input 
                            type='text'
                            name='firstName'
                            id="firstName"
                            className='bg-richblack-800 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder='Enter first name'
                            {...register('firstName', { required: true })} 
                        
                        />
                        {
                            errors.firstName && 
                            <p className='text-[#cc0000] text-sm'>First name is required.</p>
                        }
                    </div>
                    
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='lastName' className='text-richblack-50 text-xs'>
                            Last Name
                        </label>
                        <input 
                            type='text'
                            name='lastName'
                            id="lastName"
                            className='bg-richblack-800 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder='Enter last name'
                            {...register('lastName', { required: true })} 
                        
                        />
                        {
                            errors.lastName && 
                            <p className='text-[#cc0000] text-sm'>Last name is required.</p>
                        }
                    </div>
                </div>

                <div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="phoneNumber" className='text-xs text-richblack-50'>Phone Number</label>
                        <div className='flex flex-row gap-4'>
                            <select 
                                name='countryCode'
                                id="countryCode"
                                className='bg-richblack-800 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                                {...register('countryCode', { required: true })} 
                            >
                            {
                                CountryCode.map((country,index)=>{
                                    return (
                                        <option value={`${country.code}`} key={index}>{country.code} - {country.country}</option>
                                    )
                                })

                            }

                            </select>
                            {
                                errors.countryCode && 
                                <p className='text-[#cc0000] text-sm'>CountryCode is required.</p>
                            }

                        </div>
                        <div>
                            <input 
                                type='number'
                                name='phoneNumber'
                                id="phoneNumber"
                                className='bg-richblack-800 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                                placeholder='12345 67890'
                                {...register('phoneNumber', { required: true ,minLength:8 ,maxLength:10 })} 
                            
                            />
                            {
                                errors.phoneNumber && 
                                <p className='text-[#cc0000] text-sm'>Enter a correct phone Number.</p>
                            }

                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-xs text-richblack-50'>
                        Email ID
                    </label>
                    <input 
                        type='email'
                        name='email'
                        id="email"
                        className='bg-richblack-800 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                        placeholder='Enter email address'
                        {...register('email', { required: true })} 
                    
                    />
                    {
                        errors.email && 
                        <p className='text-[#cc0000] text-sm'>Email ID is required.</p>
                    }
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='message' className='text-xs text-richblack-50'>
                        Message
                    </label>
                    <textarea 
                        name='message'
                        id="message"
                        cols={30}
                        rows={5}
                        className='bg-richblack-800 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                        placeholder='Enter Message'
                        {...register('message', { required: true })} 
                    
                    />
                    {
                        errors.message && 
                        <p className='text-[#cc0000] text-sm'>Write your message.</p>
                    }
                </div>

                <button type='submit' className='text-black rounded-md bg-yellow-50 py-2 px-20 font-bold'>
                    Send Message
                </button>
            </form>
        </div>
    )
}

export default FormSection