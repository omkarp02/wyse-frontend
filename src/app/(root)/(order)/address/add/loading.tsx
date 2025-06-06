import Loader from '@/components/loader/Loader'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <Loader />
    </div>
  )
}

export default Loading