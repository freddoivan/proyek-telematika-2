import useAuthStore from '@/store/useAuthStore'
import { Message } from '@/types'
import { cn } from '@/utils/utils'
import { format } from 'date-fns'
import React from 'react'
import { pusherClient } from '../lib/pusher'

interface MessagesProps {
  chatId: string
  initialMessages: Message[]
}
const Messages = ({ chatId, initialMessages }: MessagesProps) => {
  const user = useAuthStore.useUser()
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const scrollDownRef = React.useRef<HTMLDivElement | null>(null)
  const formatTimestamp = (timestamp: any) => {
    const time = new Date(timestamp)
    return format(time, 'HH:mm')
  }

  React.useEffect(() => {
    pusherClient.subscribe(chatId)
    const handlerMessage = (data: any) => {
      setMessages((prev: any) => [data, ...prev])
    }

    pusherClient.bind('messages:new', handlerMessage)
    // getMessages(chatId)
    return () => {
      pusherClient.unsubscribe(chatId)
      pusherClient.unbind('messages:new')
    }

  }, [chatId])

  React.useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  return (
    <div
      id='messages'
      className='h-full md:flex flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      <div ref={scrollDownRef} />

      {
        messages.length != 0 ?
          messages.map((message: any, index: any) => {
            const isCurrentUser = message.senderID == user?.id

            const hasNextMessageFromSameUser =
              messages[index - 1]?.senderID === messages[index].senderID

            return (
              <div
                className='chat-message'
                key={`${message.id}-${message.timestamp}`}>
                <div
                  className={cn('flex items-end', {
                    'justify-end': isCurrentUser,
                  })}>
                  <div
                    className={cn(
                      'flex flex-col space-y-2 text-base max-w-xs mx-2',
                      {
                        'order-1 items-end': isCurrentUser,
                        'order-2 items-start': !isCurrentUser,
                      }
                    )}>
                    <span
                      className={cn('px-4 py-2 rounded-lg inline-block', {
                        'bg-indigo-600 text-white': isCurrentUser,
                        'bg-gray-200 text-gray-900': !isCurrentUser,
                        'rounded-br-none':
                          !hasNextMessageFromSameUser && isCurrentUser,
                        'rounded-bl-none':
                          !hasNextMessageFromSameUser && !isCurrentUser,
                      })}>
                      {message.content}{' '}
                      <span className='ml-2 text-xs text-gray-400'>
                        {formatTimestamp(message.createdAt)}
                      </span>
                    </span>
                  </div>

                  <div
                    className={cn('relative w-6 h-6', {
                      'order-2': isCurrentUser,
                      'order-1': !isCurrentUser,
                      invisible: hasNextMessageFromSameUser,
                    })}>
                    {/* <Image
                    fill
                    src={
                      isCurrentUser ? (sessionImg as string) : chatPartner.image
                    }
                    alt='Profile picture'
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                  /> */}
                  </div>
                </div>
              </div>
            )
          })
          :
          <div className='flex justify-center items-center h-full'>
            <p className='text-gray-400'>No messages yet</p>
          </div>
      }

    </div>
  )
}

export default Messages