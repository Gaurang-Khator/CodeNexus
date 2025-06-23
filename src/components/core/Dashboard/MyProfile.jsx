import React from 'react'
import {useSelector} from 'react-redux'
import EditBtn from './EditBtn'


const MyProfile = () => {
    const {user}=useSelector((state)=>state.profile)

    
  return (
    <div className='flex flex-col gap-10 bg-richblack-900 w-full text-white p-4'>
        {console.log(user)}

        <h1 className='text-4xl text-richblack-5'>My Profile</h1>
        {/* Section 1 */}
        <section className='flex flex-row justify-between items-center bg-richblack-800 p-6 rounded-lg mx-auto w-8/12 max-w-maxContent gap-4'>
            <div >
                <img src={user.image} height={70} width={70} className='rounded-full aspect-square'></img>
            </div>
            <div className='w-9/12'>
                <div className='text-richblack-50'>{user.firstName} {" "} {user.lastName}</div>
                <div className='text-richblack-300'>{user.emailID}</div>
            </div>
            <EditBtn/>
        </section>

        {/* Section 2 */}
        <section className='flex flex-row justify-between items-center bg-richblack-800 p-6 rounded-lg mx-auto w-8/12 max-w-maxContent'>
            <div className='flex flex-col gap-4'>
                <div className='text-richblack-5 text-xl w-full font-bold'>About</div>
                <div>{user.additionalDetails.about ? (user.additionalDetails.about) :"Write something about yourself" }</div>
            </div>
            <EditBtn/>
        </section>

        {/* Section 3 */}
        <section className='flex flex-row justify-between bg-richblack-800 p-6 rounded-lg mx-auto w-8/12 max-w-maxContent'>
            <div className='w-10/12 flex flex-row items-start'>
                <div className='flex flex-col gap-4 w-full pr-28'>
                    <h1 className='text-richblack-5 text-xl w-full font-bold'>Personal Details</h1>
                    <div className='flex flex-row justify-between w-full'>
                        <div className='flex flex-col gap-4'>
                                <div>
                                    <div className='text-richblack-300'>First Name</div>
                                    <div>{user.firstName}</div>
                                </div>
                                <div>
                                    <div className='text-richblack-300'>Email ID</div>
                                    <div>{user.emailID}</div>
                                </div>
                                <div>
                                    <div className='text-richblack-300'>Gender</div>
                                    <div>{user.additionalDetails.gender?user.additionalDetails.gender:"Add your gender"}</div>
                                </div>
                                
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <div className='text-richblack-300'>Last Name</div>
                                <div>{user.lastName}</div>
                            </div>
                            <div>
                                <div className='text-richblack-300'>Phone Number</div>
                                <div>{user.additionalDetails.phoneNumber?user.additionalDetails.phoneNumber:"Add your phone number"}</div>
                            </div>
                            <div>
                                <div className='text-richblack-300'>Date of Birth</div>
                                <div>{user.additionalDetails.dateOfBirth?user.additionalDetails.dateOfBirth:"Add your Date of Birth"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-end items-start'>
                <EditBtn/>
            </div>
        </section>
    </div>
  )
}

export default MyProfile