"use client"
import { Layout } from '@/components/Layout'

export default function Home() {

  return (
    <Layout>
      <div className='flex flex-col items-center px-10 pt-6'>
        <h1 className='hero__subtitle text-white'>
        Gemuk? Ingin menurun berat badan? Ini yang harus dilakukan!
        </h1>
      <div className='flex flex-row items-center max-h-screen relative px-10 pt-6'>
        <h1 className='text-white'>
        Latihan: 
        <h1>
        - olahraga kardio (lari, sepeda, renang)
        </h1>
        <h1>
        -	squat (8 rep 1 set, 2 set)
        </h1>
        <h1>
        - curl dumbell (10 rep, 3 set  *beratnya terserah, jika merasa terlalu ringan ditingkatkan 5-10 rep)
        </h1>
        <h1>
        -	shoulder press (8 rep, 3 set)
        </h1>
        <h1>
        -	bent over rows (8 rep, 3 set)
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
        Makan makanan berkalori dan protein rendah, disarankan:
        </h1>
        <h1>
        -	Telur
        </h1>
        <h1>
        -	Oatmeal
        </h1>
        <h1>
        -	buah beri
        </h1>
        <h1>
        -	yogurt, 
        </h1>
        <h1>
        -	ikan
        </h1>
        </h1>
      </div>
      </div>
    </Layout>
  )
}