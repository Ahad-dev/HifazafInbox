import React from 'react'
import { Navigate ,Outlet} from 'react-router-dom'
import  useAuth  from '../hooks/useAuth'
import UserSideBar from './UserSideBar';

const PrivateUserRoute = () => {
    const {authenticated,user,loading} = useAuth();


    if(loading){
        return (
            <div className='flex h-screen w-screen items-center justify-center bg-slate-100'>
                <h1 className='text-2xl font-bold'>Loading...</h1>
            </div>
        )
    }

    if(user.isBlacklisted){
        return (
            <div className='flex h-screen w-screen items-center justify-center bg-slate-100'>
                    <h1 className='text-2xl font-bold'>Your account has been blacklisted</h1>
            </div>
        )
    }

    console.log("User: ", user)
  return (
    authenticated && user.userRole=="Employee" ?
    <div className='flex flex-row w-full bg-slate-100'>
        <UserSideBar/>
        <Outlet/> 
    </div>
    : <Navigate to="/"/>


  )
}

export default PrivateUserRoute
