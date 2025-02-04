"use client"

import { Button } from '@/components/ui/button'
import { logoutApi } from '@/services/auth/user-account'
import { useBoundStore } from '@/store/store'
import Link from 'next/link'
import React from 'react'

const ProfilePage = () => {


  const logout = useBoundStore(state => state.logout)

  async function handleLogout(){
    logout()
  }

  return (
    <div className='main-container'>
      <Link href={"/profile/details"} >Edit Profile</Link>
      <Button onClick={handleLogout} variant={'outline'} className='w-full'>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage