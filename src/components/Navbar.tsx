'use client';
import Link from 'next/link';
import Image from 'next/image';
import Links from './buttons/Links';
import withAuth from './hoc/withAuth';
import useAuthStore from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { FaAlignJustify, FaRegTimesCircle } from 'react-icons/fa';
import React from 'react';
import DetailProfile from './DetailProfile';
export default withAuth(Navbar, 'all');
function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [header, setHeader] = React.useState(false)
  const user = useAuthStore.useUser()


  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  });
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  };

  return (
    <header className={`fixed w-full top-0 z-10 md:px-4 md:py-8 ${header ? "bg-gray-600 shadow-md" : "bg-red-primary"}`}>
      <nav className='flex flex-col md:flex-row nd:justify-between'>
        <div className='flex w-screen md:w-56'>
          <Link href="/" className='flex justify-center items-center'>
            <Image
              src="/barbell.png"
              alt="GetFitt"
              width={80}
              height={18}
              className='object-contain'
            />
          </Link>
          <button className='block ml-auto md:hidden' onClick={() => setOpen(!open)}>
            {
              open ? <FaRegTimesCircle className='' size={30} /> : <FaAlignJustify size={30} />
            }
          </button>
        </div>
        <div className='md:w-2/3 md:pt-8'>
          <ul className={`font-bold flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:justify-items-end md:items-end items-center md:space-x-6 transition-all duration-1000 md:flex ${open ? "" : "hidden"}`}>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className='w-[124px] uppercase h-[49px] flex items-center justify-center rounded-md bg-black text-white flex-row '>
                <Links href={href}>{label}</Links>
              </li>
            ))}
            <li>
              <div className='flex md:hidden'>
                <DetailProfile user={user} />
              </div>
            </li>
          </ul>
        </div>
        <div className='hidden md:flex'>
          <DetailProfile user={user} />
        </div>
      </nav>
    </header>
  )
}

const links = [
  { href: '/camera', label: 'Camera' },
  { href: '/chat', label: 'Chat' },
  { href: '/latihan', label: 'Training' },
  { href: '/profile', label: 'Profile' },
];