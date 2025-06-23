import React, { useEffect ,useState} from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { changePassword } from '../../services/operations/ProfileUpdationAPI';
import { useDispatch, useSelector } from 'react-redux';



const EditPassword = () => {

    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

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
    

    const submitEditInfo=async(data)=>{
        try{
            console.log(data);
            dispatch(changePassword(data,token));
            console.log("Edit success");
        }
        catch(error){
            console.log("Edit failed");

        }
    }
    const [oldPassword, setOldPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);

  return (
    <div className=' flex flex-col gap-5 w-7/12 mx-auto my-10 '>
        <form onSubmit={handleSubmit(submitEditInfo)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 bg-richblack-800 rounded-lg px-20 py-10'>
                
                <div>Password</div>
                <div className='flex flex-row gap-4 justify-between w-full  '>
                    <div className='flex flex-col gap-1 w-[45%] relative'>
                        <label htmlFor='oldPassword' className='text-richblack-50 text-xs'>
                            Current Password
                        </label>
                        <input 
                            type={oldPassword ? "text" : "password"}
                            name='oldPassword'
                            id="oldPassword"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm  w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder='Enter current password'
                            {...register('oldPassword', { required: true})} 
                        
                        />
                        {
                            errors.oldPassword && 
                            <p className='text-[#cc0000] text-sm'>Enter old Password.</p>
                        }
                        <div className='absolute bottom-[14px] right-4 text-xl'> {oldPassword ? <FaEyeSlash onClick={() => setOldPassword(!oldPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setOldPassword(!oldPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                    </div>
                    <div className='flex flex-col gap-1 w-[45%] relative'>
                        <label htmlFor='newPassword' className='text-richblack-50 text-xs'>
                            New Password
                        </label>
                        <input 
                            type={newPassword ? "text" : "password"}
                            name='newPassword'
                            id="newPassword"
                            className='bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm  w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]'
                            placeholder='Enter new password'
                            {...register('newPassword', {  })} 
                        
                        />
                        <div className='absolute bottom-[14px] right-4 text-xl'> {newPassword ? <FaEyeSlash onClick={() => setNewPassword(!newPassword)} className='text-richblack-200 cursor-pointer' /> : <FaEye onClick={() => setNewPassword(!newPassword)} className='text-richblack-200 cursor-pointer' />}</div>
                        {
                            errors.newPassword && 
                            <p className='text-[#cc0000] text-sm'>Enter New Password.</p>
                        }
                    </div>
                </div> 

            </div>
            <div className='flex flex-row items-end justify-end gap-4'>
                <Link to="/dashboard/my-profile" className='bg-richblack-700 text-richblack-300 px-4 py-[6px] rounded-md text-lg font-semibold'>Close</Link>
                <button className='bg-yellow-50 text-black p-2 rounded-lg font-semibold px-4' type='submit'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default EditPassword



    