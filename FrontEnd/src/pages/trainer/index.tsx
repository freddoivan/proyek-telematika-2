'use client';

import TNavbar from '@/components/TNavbar';
import Image from 'next/image';

const Hero = () => {
    const handleScroll = () => {

    }
  return (
    <div className='hero'>
        <TNavbar />
        <div className='flex-1 pt-36 padding-x'>
            <h1 className='hero__title'>
                GetFitt
            </h1>
            
            <p className='hero__subtitle'>
                Train the trainees to be healthy!
            </p>
        </div>
        <div className='hero__image-container'>
            <div className='hero__image'>
                <Image src='/bodybuilder.png' alt='hero' fill className='object-contain'  />
            </div>
        </div>
    </div>
  )
}

export default Hero