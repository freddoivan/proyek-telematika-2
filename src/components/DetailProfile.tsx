import useAuthStore from '@/store/useAuthStore'
import { User } from '@/types/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { FaCircleUser } from 'react-icons/fa6'

interface Props {
    user: User | null
}


const DetailProfile = ({ user }: Props) => {
    const logout = useAuthStore.useLogout()
    const handleLogout = () => {
        try {
            setTimeout(() => {
                logout()
            }, 2000);
            toast.success("Logout Success")
        } catch (error: any) {
            toast.error(error)
        }
    }
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    {
                        user?.image ? <div className='w-14 h-14 relative bg-red-400 rounded-full overflow-hidden flex items-center justify-center'>
                            <Image src={`http://${user.image}`} className='object-cover' fill alt='sas' />
                        </div> : <FaCircleUser size={50} />
                    }
                </div>
                <div className='text-white flex flex-col justify-center items-center font-bold'>
                    <Link legacyBehavior passHref href='/main'>
                        <a>{user && user.name}</a>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </div>
    )
}

export default DetailProfile