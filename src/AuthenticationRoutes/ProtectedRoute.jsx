import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {token}=useSelector((state)=>state.auth);
    if(token!==null){
        //user is logged in 
        return children;
    }
    else{
        return <Navigate to="/login"></Navigate>
    }
}

export default ProtectedRoute