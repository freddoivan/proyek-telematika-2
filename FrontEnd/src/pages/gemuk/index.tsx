"use client"
import { Layout } from '@/components/Layout'

export default function Home() {

  return (
    <Layout>
      <div className='flex flex-col items-center max-h-screen md:h-screen relative px-10 pt-6'>
        <h1 className='hero__subtitle text-white'>
          Gemuk? Ingin menurunkan berat badan? Ini yang harus dilakukan!
        </h1>
      </div>
    </Layout>
  )
}