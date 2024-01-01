import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '.'


interface props {
    children: React.ReactNode
}
export const Layout = ({ children }: props) => {
    return (
        <>
        <Toaster/>
            <Head>
                <title>GetFitt</title>\
                <meta name="description" content="Get fit and healthy" />
            </Head>
            <div className=' bg-red-primary min-h-screen md:overflow-hidden'>
            <Navbar />
                <div className='md:flex hidden'>
                    <Image src={'/Ellipse.svg'} width={250} height={100} alt='bg-vector' className='absolute left-0 bottom-0' >
                    </Image>
                </div>
                <div className='md:flex hidden'>
                    <Image src={'/ellipsered.svg'} width={150} height={100} alt='bg-vector' className='absolute left-0 bottom-0' >
                    </Image>
                </div>
                <div className='h-36'>

                </div>
                {children}
            </div>
        </>
    )
}
