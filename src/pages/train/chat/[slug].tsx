import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import UserCard from '@/components/card/UserCrad'
import { TrainerLayout } from '@/components/trainer/TrainerLayout'
import apiMock from '@/lib/axios-mock'
import { Message, UserChat } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'
import { FaCircleUser } from 'react-icons/fa6'

const Chat = () => {
  const router = useRouter()
  const { slug } = router.query
  const [trainerList, setTrainerList] = React.useState<UserChat[]>([])
  const [allTrainerList, setAllTrainerList] = React.useState<UserChat[]>([])
  const [initialMessages, setInitialMessages] = React.useState<Message[]>([])
  const [search, setSearch] = React.useState<string>("")
  const getTrainerList = async () => {
    try {
      const response = await apiMock.get('chat/list/trainer')
      setTrainerList(response.data.data)
      setAllTrainerList(response.data.data)
    } catch (err) {
      toast.error("oops something went wrong")
    }
  }

  const getMessages = async (chatId: string) => {
    try {
      const response = await apiMock.get(`chat/message/${chatId}`)
      const results = response.data.data
      setInitialMessages(results)
    } catch (err) {
      toast.error("oops something went wrong")
    }
  }

  React.useEffect(() => {
    getTrainerList()
    if (slug) {
      getMessages(slug.toString())
    }
  }, [slug])

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (search.length > 0) {
      const filteredTrainer = trainerList.filter((trainer) => trainer.userName.toLowerCase().includes(search.toLowerCase()))
      setTrainerList(filteredTrainer)
    } else {
      getTrainerList()
    }
  }

  function getCurrentPartner() {
    const currentPartner = allTrainerList.find((trainer) => trainer.conversationID === slug)
    return currentPartner
  }
  const currentPartner = getCurrentPartner()
  return (
    <TrainerLayout>
      <div className='flex flex-col items-center max-h-screen md:h-screen relative px-10 pt-6'>
        <div className='md:h-3/4 bg-white overflow-auto flex flex-col md:flex-row layout md:overflow-hidden'>
          <div className='md:w-1/4 h-full p-4'>
            <div className='space-y-2 h-full'>
              <div>
                <p className='h2'>
                  Chat
                </p>
              </div>
              <div>
                <form onSubmit={(e) => onSearch(e)}>
                  <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='w-full h-12 rounded-md border-2 border-gray-300 outline-none px-4' />
                </form>
              </div>
              <div className='space-y-1 pb-24 overflow-auto h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                {
                  trainerList.map((user, index) => (
                    <UserCard chatId={slug?.toString()} key={index} user={user} />
                  ))
                }
              </div>
            </div>
          </div>
          <div className='md:w-3/4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-between'>
            <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>
              <div className=' md:flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
                <div className='relative flex items-center space-x-4'>
                  <div className='relative'>
                    <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
                      {
                        currentPartner?.userImage ? <div className='w-14 h-14 relative bg-red-400 rounded-full overflow-hidden flex items-center justify-center'>
                          <Image src={`http://${currentPartner.userImage}`} className='object-cover' fill alt='sas' />
                        </div> : <FaCircleUser size={50} />
                      }
                    </div>
                  </div>

                  <div className='flex flex-col leading-tight'>
                    <div className='text-xl flex items-center'>
                      <span className='text-gray-700 mr-3 font-semibold'>
                        {
                          currentPartner?.userName
                        }
                      </span>
                    </div>

                    <span className='text-sm text-gray-600'>
                      {currentPartner?.userName}
                    </span>
                  </div>
                </div>
              </div>
              {
                slug &&
                <Messages initialMessages={initialMessages} chatId={slug?.toString()} />
              }
              {
                slug && <ChatInput chatId={slug?.toString()} />
              }
            </div>
          </div>
        </div>
      </div>
    </TrainerLayout>
  )
}

export default Chat