import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const EditBtn = () => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-row gap-2 items-center justify-between w-fit bg-yellow-50 py-2 px-4 rounded-md text-black cursor-pointer hover:scale-95 ' onClick={()=>{navigate('/dashboard/settings')}}>
        <FaEdit/>
        <div>Edit</div>
    </div>
  )
}

export default EditBtn