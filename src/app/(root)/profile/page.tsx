"use client"

import { Button } from '@/components/ui/button'
import { logoutApi } from '@/services/auth/user-account'
import { useBoundStore } from '@/store/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfilePage = () => {

  const router = useRouter()


  return (
    <div className='main-container'>
      <Link href={"/profile/details"} >Edit Profile</Link>
    
    </div>
  )
}

export default ProfilePage