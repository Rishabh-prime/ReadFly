import React from 'react'
import {useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
export function LogoutBtn(props) {
    
const dispatch = useDispatch();
const logoutHandler = () =>{
    authService.logout()// is a promise 
    .then(()=>{

            dispatch(logout());
            console.log('Logged out successfully');
    
    });
}
    return (
        <>
            <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
        </>
    )
}

export default LogoutBtn;
