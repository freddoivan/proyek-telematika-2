"use client"
import { Layout } from '@/components/Layout'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { Button } from '@/components/Button'
import Link from 'next/link'


export default function Home() {

  return (
    <Layout>
      <div className='flex flex-col items-center max-h-screen md:h-screen relative px-10 pt-6'>
        <h1 className='hero__subtitle text-white'>
          Pilihlah berat badan anda.
        </h1>
        <Button>
          <Link href='/kurus'>Kurus</Link>
        </Button>
        <Button>
          <Link href='/normal'>Normal</Link>
        </Button>
        <Button>
          <Link href='/gemuk'>Gemuk</Link>
        </Button>
      </div>
    </Layout>
  )
}