import React from 'react'
import BulkEmailSender from '../../components/BulkEmailSender'
import useAuth from '@/hooks/useAuth'

const UserDashboard = () => {
  const {user} = useAuth()
  return (

      user && <BulkEmailSender userEmail={user?.email} />
  )
}

export default UserDashboard