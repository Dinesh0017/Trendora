import React from 'react'
import { assets } from '../assets/images/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div classname='flex flex-col items-center gap-4 px-4 sm:px-0'>
            <img className='w-12 m-auto mb-5' alt="" src={assets.exchange_icon}/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle-free exchange policy</p>
        </div>

        <div classname='flex flex-col items-center gap-4 px-4 sm:px-0'>
            <img className='w-12 m-auto mb-5' alt="" src={assets.quality_icon}/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We offer a 7-day return policy for all our products.</p>
        </div>

        <div classname='flex flex-col items-center gap-4 px-4 sm:px-0'>
            <img className='w-12 m-auto mb-5' alt="" src={assets.support_img}/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>Our support team is available 24/7 to assist you.</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
