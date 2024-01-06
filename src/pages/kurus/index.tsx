"use client"
import { Layout } from '@/components/Layout'

export default function Home() {

  return (
    <Layout>
      <div className='flex flex-col items-center px-10 pt-6'>
        <h1 className='hero__subtitle text-white'>
        Kurus? Ingin menambah berat badan? Ini yang harus dilakukan!
        </h1>
      <div className='flex flex-row items-center max-h-screen relative px-10 pt-6'>
        <h1 className='text-white'>
        Latihan: 
        <h1>
        - push up (15-20 rep 1 set, 3 set)
        </h1>
        <h1>
        -	squat (8-12 rep 1 set, 2-3 set)
        </h1>
        <h1>
        - curl dumbell (serah beratnya, 10-12 rep, 3 set)
        </h1>
        <h1>
        -	shoulder press (8-10 rep, 3 set)
        </h1>
        <h1>
        -	bent over rows (8-10 rep, 3 set)
        </h1>
        <h1>
        -	overhead triceps extensions (10-12 rep, 3 set)
        </h1>
        <h1>
        *Jika tidak sanggup boleh diturunkan dan ditingkatkan setiap harinya
        </h1>
        <h1>
        *Harus rutin dilakukan setiap hari untuk mendapatkan hasil maksimal
        </h1>
        <div className='flex flex-row-reverse items-center max-h-screen relative px-10 pt-6'></div>
        <h1 className='text-white'>
        Makanan:
        </h1>
        <h1>
        Makan makanan berkalori dan protein banyak, disarankan:
        </h1>
        <h1>
        -	Nasi
        </h1>
        <h1>
        -	daging merah
        </h1>
        <h1>
        -	telur
        </h1>
        <h1>
        -	kentang
        </h1>
        <h1>
        -	paha ayam
        </h1>
        </h1>
      </div>
      </div>
    </Layout>
  )
}