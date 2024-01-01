import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Hero } from '@/components'
import withAuth from '@/components/hoc/withAuth'

const inter = Inter({ subsets: ['latin'] })
export default withAuth(Home, 'auth')
function Home() {
  return (
      <main className='overflow-hidden'>
        <Hero />
      </main>
  )
}
