import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string
    handleClick?:MouseEventHandler<HTMLButtonElement>;
}

export type User = {
    id: number;
    name: string;
    email: string;
    image : string;
    bio: string;
    password: string;
    role: string;
}

export type TrainerChat = {
    conversationID : string;
    userImage : string;
    trainerEmail : string;
    trainerID: string;
    trainerName : string;
}

export type UserChat = {
    conversationID : string;
    userID: string;
    userName : string;
    userImage : string;
}

export type Message = {
    id : string;
    content : string;
    senderID : string;
    createdAt : string;
}

export type Content = {
    image : string;
    text : string;
}