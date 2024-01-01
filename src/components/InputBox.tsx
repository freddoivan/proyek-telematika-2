'use client';
import { cn } from "@/utils/utils";
import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaRegUser, FaLock, FaRegEnvelope } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors;
  icons?: string;
  register: UseFormRegister<FieldValues>,
  required?: boolean;
  id: string;
  className?: string;
  type: string;
}

export type IconListType = keyof typeof iconList;
const InputBox = ({ errors, icons, register, id, required, type, className, ...props }: Props) => {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const current = iconList[icons as IconListType]
  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-row justify-center items-center border rounded-md relative",
      errors[id] && 'border-red-700')}>
        {
          current && <label className={`block p-2`}><current.icon color='white' /></label>
        }
        {
          type === "password" ? <div className="flex justify-between items-center">
            <input
              id={id}
              type={passwordShown ? "text" : "password"}
              {...register(id, { required: "This field is required" })}
              placeholder={props.placeholder}
              className={clsx(`
      bg-transparent active:border-black rounded-md disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base bg-slate-50 focus:shadow focus:border-0`,
                errors[id] && 'focus:ring-rose-500',
                className,)}
              {...props}
            ></input>
            <i className={cn("cursor-pointer absolute right-3",
            passwordShown ? "text-white" : "" )} onClick={togglePasswordVisiblity}><FaEye /></i>
          </div> : <div>
            <input
              id={id}
              type={type}
              {...register(id, { required: "This field is required" })}
              placeholder={props.placeholder}
              className={clsx(`
      bg-transparent active:border-black rounded-md disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base bg-slate-50 focus:shadow focus:border-0`,
                errors[id] && 'focus:ring-rose-500',
                className,)}
              {...props}
            ></input>
          </div>
        }


      </div>
      {
        errors[id] && <p className="text-xs text-black underline">{errors[id]?.message?.toString()}</p>
      }
    </div>
  );
};

const iconList = {
  user: {
    icon: FaRegUser,
    name: 'User',
  },
  email: {
    icon: FaRegEnvelope,
    name: 'Email',
  },
  password: {
    icon: FaLock,
    name: 'Password',
  },
}
export default InputBox;