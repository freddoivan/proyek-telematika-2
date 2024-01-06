import { Layout } from '@/components/Layout'
import TrainerCard from '@/components/card/TrainerCard'
import withAuth from '@/components/hoc/withAuth'
import apiMock from '@/lib/axios-mock'
import { TrainerChat } from '@/types'
import React from 'react'
import toast from 'react-hot-toast'
export default withAuth(Index, 'all')
function Index() {

  const [trainerList, setTrainerList] = React.useState<TrainerChat[]>([])
  const getTrainerList = async () => {
    try {
      const response = await apiMock.get('chat/list/user')
      setTrainerList(response.data.data)
    } catch (err) {
      toast.error("oops something went wrong")
    }
  }

  React.useEffect(() => {
    getTrainerList()
  }, [])


  return (
    <Layout>
      <div className='flex flex-col items-center max-h-screen md:h-screen relative px-10 pt-6'>
        <div className='md:h-3/4 bg-white overflow-auto flex flex-col md:flex-row layout md:overflow-hidden'>
          <div className='w-1/4 h-full p-4'>
            <div className='space-y-2 h-full'>
              <div>
                <p className='h2'>
                  Chat
                </p>
              </div>
              <div>
                <input type="text" placeholder='Search' className='w-full h-12 rounded-md border-2 border-gray-300 outline-none px-4' />
              </div>
              <div className='space-y-1 pb-24 overflow-auto h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                {
                  trainerList.map((trainer, index) => (
                    <TrainerCard key={index} Trainer={trainer} />
                  ))
                }
              </div>
            </div>
          </div>
          <div className='w-3/4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-between'>
            <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>

              <div className='flex justify-center items-center h-full'>
                <p className='text-gray-400'>No messages yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
