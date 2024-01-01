'use client';
import React from 'react';
import toast from 'react-hot-toast';
import ReactTextareaAutosize from 'react-textarea-autosize';
import apiMock from '../lib/axios-mock';
import SendButton from './buttons/SendButton';

interface ChatInputProps {
    chatId: string
}
const ChatInput = ({ chatId }: ChatInputProps) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [inputText, setInputText] = React.useState<string>('')

    const sendMessages = async () => {
        try {
            setLoading(true)
            if (inputText.length === 0) {
                toast("Message cannot be empty",{
                    icon: '🤔',
                
                })
                return
            }
            await apiMock.post('/chat/message', {
                conversation_id: chatId,
                message: inputText,
            })
            setInputText('')
            setLoading(false)
        } catch (err) {
            toast.error("Failed to send message")
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }

    // React.useEffect(() => {
    //     pusherClient.subscribe(chatId)
    //       const handlerMessage = (data: any) => {
    //         console.log(data)
    //     }
    //     pusherClient.bind('messages:new',handlerMessage)
    //     return () => {
    //            pusherClient.unsubscribe(chatId)
    //            pusherClient.unbind('messages:new')
    //     }
    //  }, [])


    return (
        <div className='border-t border-gray-200 px-4 pt-4 pb-4 mb-2 sm:mb-0 flex'>
            <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
                <ReactTextareaAutosize ref={textAreaRef} onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.shiftKey === false) {
                        e.preventDefault()
                        sendMessages()
                    }
                }}
                    className='w-full block resize-none p-2 border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm'
                    minRows={1}
                    placeholder='Type a message...'
                    value={inputText}
                    onChange={(e) => { setInputText(e.target.value) }}
                />
                <div onClick={() => textAreaRef.current?.focus}
                    className='py-2'
                    aria-hidden='true'>
                    <div className='py-px'>
                        <div className='h-3' />
                    </div>
                </div>
                <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
                    <div className='flex-shrin-0'>
                        <SendButton loading={loading} onClick={() => sendMessages()} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput