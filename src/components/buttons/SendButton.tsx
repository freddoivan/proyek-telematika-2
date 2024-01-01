import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { ImSpinner8 } from 'react-icons/im'
interface Props {
    loading: boolean
    onClick: () => void
}
const SendButton = ({ loading, onClick }: Props) => {
    return (
        <div className='rounded-full bg-slate-500 p-2 flex justify-center items-center'>
            {
                loading ? <ImSpinner8 className='animate-spin' /> : <button onClick={onClick}>
                    <FaPaperPlane />
                </button>
            }
        </div>
    )
}

export default SendButton