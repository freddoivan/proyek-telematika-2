import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
    children: React.ReactNode
}
const LoginLayout = ({ children }: Props) => {
    return (
        <React.Fragment>
            <Head>
                <title>GetFitt</title>\
                <meta name="description" content="Get fit and healthy" />
            </Head>
            <Toaster/>
            <div className={`hero h-screen bg-red-primary justify-center items-center overflow-hidden`}>
                <div>
                    <Image src={'/bgvector.svg'} width={820} height={100} alt='bg-vector' className='absolute right-0 top-0 z-0' >
                    </Image>
                </div>
                <div>
                    <Image src={'/Ellipse.svg'} width={250} height={100} alt='bg-vector' className='absolute left-0 bottom-0' >
                    </Image>
                </div>
                <div>
                    <Image src={'/ellipsered.svg'} width={150} height={100} alt='bg-vector' className='absolute left-0 bottom-0' >
                    </Image>
                </div>
                {children}
            </div>

        </React.Fragment>
    )
}

export default LoginLayout