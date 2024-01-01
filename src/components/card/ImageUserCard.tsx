import React from 'react'
import { ImageCard } from '../LoadMore'
import Image from 'next/image'
import { formatRelative, subDays } from 'date-fns'

interface Props {
    image : ImageCard[]
    count: number
    total: number
}

const formatTimestamp = (timestamp: any) => {
    const time = new Date(timestamp)
    return formatRelative(subDays(time, 0), new Date())
  }
const ImageUserCard = ({image,count,total}: Props) => {
  return (
    <div className='w-full flex flex-col justify-center items-center layout space-y-4'>
        {
          
            image && total === 0  && image.map((item, index) => (
              <div className="w-1/2 p-3 space-x-3 bg-gray-300 flex flex-row border rounded-md shadow-lg" key={index}>
                <div>
               <Image src={`http://${item.imgURL}`} alt='IMAGE' width={100} height={100} className="rounded-md"/>
               </div>
               <div>
                  <p>Scan ke {count-index}</p>
                  <p>{formatTimestamp(item.createdAt)}</p>
                </div>
              </div>
            ))
          }

          {
            total != 0 && <>
             {
          image && image.map((item, index) => (
            <div className="w-1/2 p-3 space-x-3 bg-gray-300 flex flex-row border rounded-md shadow-lg" key={index}>
              <div>
             <Image src={`http://${item.imgURL}`} alt='IMAGE' width={100} height={100} className="rounded-md"/>
             </div>
             <div>
                <p>Scan ke {total-index}</p>
                <p>{formatTimestamp(item.createdAt)}</p>
              </div>
            </div>
          ))
        }</>
          }
        
    </div>
  )
}

export default ImageUserCard