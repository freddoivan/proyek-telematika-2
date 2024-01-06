'use client';

import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { User } from '@/types/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import apiMock from '../lib/axios-mock';
import { Button } from './Button';
import InputBox from './InputBox';

type Props = {
  className?: string;
};

const Login = (props: Props) => {
  const router = useRouter();
  const login = useAuthStore.useLogin();
  const [isLoading, setIsLoading] = React.useState(false);

  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    let tempToken: string;
    setIsLoading(true);
    toast.promise(
      apiMock.post(`/auth/login`, data)
        .then((res) => {
          console.log(res)
          const { jwt } = res.data.data;
          tempToken = jwt.accessToken;

          localStorage.setItem('token', jwt.accessToken);

          return apiMock.get<ApiReturn<User>>('/auth/me');
        })
        .then((user) => {
          login({
            ...user.data.data,
            token: tempToken,
          });

          return user.data.data
        }).then((user) => {
          setTimeout(() => {
            if (user.role === 'USER') return router.push("/main")
            return router.push('/train/main')
          }, 1000);

        }).finally(() => {
          setIsLoading(false);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Successfully logged in',
      }
    );
    setIsLoading(false);
  }

  return (
    <>
      <form className='flex flex-col gap-3 z-10' onSubmit={handleSubmit(onSubmit)}>
      <p className='text-center h2 text-white'>GetFitt</p>
        <InputBox
          className="text-white"
          type='text'
          id='email'
          errors={errors}
          register={register}
          placeholder='Email'
          required
          icons='user'/>
        <InputBox
          className="text-white"
          type='password'
          id='password'
          errors={errors}
          register={register}
          placeholder='password'
          required
          icons='password' />

          <Button disabled={isLoading}  type='submit'>
            Login
          </Button>
      </form></>
  )
}

export default Login