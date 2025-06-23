import React from 'react'
import { Link } from 'react-router-dom'

const ModifiedButtons = ({children,linkto,active}) => {
  return (
    <div className={` ${active ? " bg-yellow-50 text-richblack-900" : "bg-richblack-800 text-white"} rounded-lg py-3 px-5 font-bold text-lg hover:scale-95 transition-all duration-200`}>
        <Link to={linkto}>
        {children}
        </Link>
    </div>
  )
}

export default ModifiedButtons