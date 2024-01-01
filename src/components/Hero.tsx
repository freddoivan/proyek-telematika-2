'use client';

import styles from './login.module.css'
import Link from 'next/link';
import LoginLayout from './LoginLayout';

const Hero = () => {
    return (
        <LoginLayout>
            <div className='z-40'>
                <h1 className='hero__title text-white'>
                    GetFitt
                </h1>
                <p className='hero__subtitle'>
                    Get fit and healthy!
                </p>
                <button className={styles.btn}>
                    <Link href='/login'>Login</Link>
                </button>
                <button className={styles.btn}>
                    <Link href='/register'>Register</Link>
                </button>
            </div>
        </LoginLayout>

    )
}

export default Hero