'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar'
import { Layout } from '@/components/Layout';

const Hero = () => {
    return (
        <Layout>
            <div className='layout relative'>
                <div className=''>
                    <h1 className='hero__title'>
                        GetFitt
                    </h1>
                </div>
                <div className='absolute right-0'>
                    <Image src='/bodybuilder.png' width={230} height={100} alt='hero' className='object-contain h-72 md:h-full' />
                </div>
            </div>
        </Layout>

    )
}

export default Hero