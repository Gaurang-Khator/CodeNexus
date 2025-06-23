import React, { useState } from 'react'
import SidebarLink from './SidebarLink';
import { sidebarLinks } from '../../../data/dashboard-links';
import { VscSignOut } from "react-icons/vsc";
import { logout } from '../../../services/operations/authAPI';
import ConfirmationModal from '../common/ConfirmationModal';

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'

const Sidebar = () => {
    const {user}=useSelector((state)=>state.profile);
    const accountType=user.accountType;
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const settingTab= {
            "name": "Settings",
            "path": "/dashboard/settings",
            "icon": "VscSettingsGear"
    }

    const [confirmationModal,setConfirmationModal]=useState(null);

  return (
    <div className='flex flex-col bg-richblack-800 relative w-[240px] min-h-screen h-auto'>
    {   
        sidebarLinks.map((tab,index)=>{
            if(tab.type && accountType!==tab.type)   return null;
            return(
                <SidebarLink tab={tab}/>
                )
        })
    }

        <div className="bg-richblack-500 h-[1px]"></div>

        <SidebarLink tab = {settingTab}/>

        <button className='flex flex-row gap-2 items-center text-richblack-300 pl-2 py-2' 
            onClick={() => {
                setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out!",
                    btnText1: "Logout",
                    btnHandler1: () => {
                        dispatch(logout(navigate));
                    },
                    btnText2: "Close",
                    btnHandler2: () => {
                        setConfirmationModal(null);
                    }
                });
            }}
            >
            <VscSignOut/>
            <div>Logout</div>
        </button>
        
        {confirmationModal ? <ConfirmationModal confirmationModal={confirmationModal} /> : null}
    </div>
  )
}

export default Sidebar