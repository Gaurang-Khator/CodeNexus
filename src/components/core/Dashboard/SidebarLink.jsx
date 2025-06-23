import React from 'react'
import * as Icons from 'react-icons/vsc'
import {useLocation} from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const SidebarLink = ({tab}) => {
    const Icon=Icons[tab.icon];
    const location=useLocation();

    function matchPath(){
        console.log("printing ",location.pathname);
        return location.pathname===tab.path;
    }

  return (
    <NavLink to={tab.path} className={`${matchPath() ? "bg-yellow-400 text-yellow-50" :"text-richblack-300 background-transparent" } relative flex flex-row gap-2 items-center pl-2 py-2 `}>
        <Icon />
        {tab.name}
        <div className={`${matchPath() ? "opacity-100" :"opacity-0" } w-[2px] h-full bg-white absolute left-0 top-0
        `}></div>
    </NavLink>
  )
}

export default SidebarLink