"use client"

import { Button } from '@/components/ui/button'
import { logoutApi } from '@/services/auth/user-account'
import React from 'react'

const ProfilePage = () => {

  async function handleLogout(){
    const res = await logoutApi()
    console.log(res)
  }

  return (
    <div className='main-container'>
      <Button onClick={handleLogout} variant={'outline'} className='w-full'>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage