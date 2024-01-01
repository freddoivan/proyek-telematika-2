import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import apiMock from '@/lib/axios-mock';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { User } from '@/types/auth';
import { cn } from '@/utils/utils';
import Image from "next/image";
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCircleUser } from 'react-icons/fa6';
import InputBox from './InputBox';


interface Props {
  user: User | null
}
type Variant = 'PROFILE' | 'EDIT_PROFILE';
function Card({ user }: Props) {

  const login = useAuthStore.useLogin();
  const [variant, setVariant] = React.useState<Variant>('PROFILE');
  const toggleVariant = React.useCallback(() => {
    if (variant === 'PROFILE') {
      setVariant('EDIT_PROFILE');
    } else {
      setVariant('PROFILE');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      bio: user?.bio,
    },
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    let tempToken: string;
    toast.promise(
      apiMock.patch('/user/update', data)
      .then((res) => {
        const { jwt } = res.data.data;
        tempToken = jwt.accessToken;
        console.log(res)
        localStorage.setItem('token', jwt.accessToken);

        return apiMock.get<ApiReturn<User>>('/auth/me');
      }).then((user) => {
        console.log(user)
        login({
          ...user.data.data,
          token: tempToken,
        });

        return user.data.data
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Successfully update profile',
      }
    )

  }

  return (

    <div className={cn("flex items-center h-[65vh] w-96 justify-center transition-all duration-500",
      variant === 'PROFILE' && "transition-all duration-500",
    )}>
      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3 transition-all duration-500 w-64">
          {
            variant === 'PROFILE' ? (
              <>
                <div className="photo-wrapper p-2">
                  {
                    user?.image ?
                      <Image src={`http://${user.image}`} alt='IMAGE' width={100} height={100} className="w-32 h-32 rounded-full mx-auto" /> :
                      <FaCircleUser className="w-32 h-32 rounded-full mx-auto" />
                  }
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {user?.name}
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{user?.email}</p>
                  </div>
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    Bio
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{user?.bio ?? "Tidak ada bio"}</p>
                  </div>
                </div>
              </>
            ) : <>
              <>
                <div className="photo-wrapper p-2">
                  {
                    user?.image ?
                      <Image src={`http://${user.image}`} alt='IMAGE' width={100} height={100} className="w-32 h-32 rounded-full mx-auto" /> :
                      <FaCircleUser className="w-32 h-32 rounded-full mx-auto" />
                  }
                </div>
                <div className="p-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <table className="text-xs">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Name
                        </td>
                        <td className="px-2 py-2">
                          <InputBox
                            className='text-black font-semibold'
                            register={register}
                            errors={errors}
                            id='name'
                            placeholder='Name'
                            type='text'
                          />
                        </td>
                      </tr>
                      {/* <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                        <td className="px-2 py-2">
                        <InputBox
                            className='text-black font-semibold'
                            register={register}
                            errors={errors}
                            id='email'
                            placeholder='Email'
                            type='text'
                          />
                        </td>
                      </tr> */}
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Bio</td>
                        <td className="px-2 py-2">
                        <InputBox
                            className='text-gray-500 font-semibold'
                            register={register}
                            errors={errors}
                            id='bio'
                            placeholder='Bio'
                            type='text'
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <button
                      type='submit'
                      className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                    >
                      Save
                    </button>
                  </div>
                  </form>
                </div>
              </></>
          }
          <div className="text-center my-3">
            <button
              onClick={toggleVariant}
              className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
            >
              {variant === 'PROFILE' ? 'Edit Profile' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Card