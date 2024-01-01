import { Button } from '@/components/Button'
import InputBox from '@/components/InputBox'
import LoginLayout from '@/components/LoginLayout'
import withAuth from '@/components/hoc/withAuth'
import apiMock from '@/lib/axios-mock'
import { useRouter } from 'next/router'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DEFAULT_TOAST_MESSAGE } from '../../constant/toast'
export default withAuth(Index, 'auth')
function Index() {
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            file: null,
        },
    })


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.file){
            formData.append("avatar", data.file[0]);
        }
        toast.promise(
            apiMock.post(`/auth/user/register`, formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    setTimeout(() => {
                        setIsLoading(false)
                        router.push('/login')
                    }, 2000)
                }).finally(() => {
                    setIsLoading(false)
                }),
            {
                ...DEFAULT_TOAST_MESSAGE,
                success: 'User Successfully Created',
            }
        );
        setIsLoading(false)
    }
    return (
        <LoginLayout>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-48 sm:w-52 md:w-60 gap-3 z-10'>
                <p className='text-center h2 text-white'>Register</p>
                <InputBox
                    className='text-white'
                    id="name"
                    type='text'
                    errors={errors}
                    disabled={isLoading}
                    register={register}
                    icons='user'
                    placeholder='Username'
                    required
                />
                <InputBox
                    className='text-white'
                    type='email'
                    id="email"
                    errors={errors}
                    disabled={isLoading}
                    register={register}
                    icons='email'
                    placeholder='Email'
                    required
                />
                <InputBox
                    className='text-white'
                    type='password'
                    id="password"
                    errors={errors}
                    disabled={isLoading}
                    register={register}
                    icons='user'
                    placeholder='Password'
                    required
                />
                <input type="file" id="file" {...register("file")} />
                
                <Button disabled={isLoading} type="submit" >
                    Submit
                </Button>
            </form>

        </LoginLayout>
    )
}