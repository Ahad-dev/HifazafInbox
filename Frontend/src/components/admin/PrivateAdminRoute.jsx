import React from 'react'
import { Navigate ,Outlet} from 'react-router-dom'
import  useAuth  from '@/hooks/useAuth'
import AdminSidebar from './AdminSidebar';

const PrivateAdminRoute = () => {
    const {authenticated,user,loading} = useAuth();

    if(loading){
        return (
            <div className='flex h-screen w-screen items-center justify-center bg-slate-100'>
                <h1 className='text-2xl font-bold'>Loading...</h1>
            </div>
        )
    }
  return (
    authenticated && user.userRole =="Admin" ?
    <div className='flex flex-row w-full bg-slate-100'>
        <AdminSidebar/>
        <Outlet/> 
    </div>
    : <Navigate to="/"/>


  )
}

export default PrivateAdminRoute
