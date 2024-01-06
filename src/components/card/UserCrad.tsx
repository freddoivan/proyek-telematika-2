import { Message, UserChat } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import apiMock from '../../lib/axios-mock';

interface Props {
  user: UserChat
  chatId?: string | undefined
}
const UserCard = ({ user, chatId }: Props) => {
  const navigate = useRouter()
  const [initialMessages, setInitialMessages] = React.useState<Message[]>([])
  const isCurrentPartner = user.conversationID === chatId

  function handleNavigate() {
    navigate.push(`/train/chat/${user.conversationID}`)
  }
  React.useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiMock.get(`chat/message/${user.conversationID}`)
        const results = response.data.data
        setInitialMessages(results)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [user.conversationID])
  return (
    <div onClick={() => handleNavigate()} className={clsx("flex flex-row cursor-pointer rounded-sm", isCurrentPartner && "bg-slate-300")}>
      <div className='w-1/4 justify-center flex items-center'>
        <div className=''>
          {
            user.userImage ? <div className='w-12 h-12 relative bg-red-400 rounded-full overflow-hidden flex items-center justify-center'>
              <Image src={`http://${user.userImage}`} className='object-cover' fill alt='sas' />
            </div> : <FaCircleUser size={50} />
          }
        </div>
      </div>
      <div className='flex flex-col justify-center items-start w-3/4'>
        <p className='text-black'>{user.userName}</p>
        <p className='text-gray-500'>
          {
            initialMessages.length > 0 ? initialMessages[0].content : "No Message"
          }
        </p>
      </div>
    </div>
  )
}

export default UserCard