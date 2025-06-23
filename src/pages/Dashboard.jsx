import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar';
import {useSelector} from 'react-redux'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const {loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);

    if(authLoading || profileLoading){
        return (<div>Loading...</div>)
    }
  return (
    <div className='flex flex-row w-full min-h-screen h-auto'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Dashboard