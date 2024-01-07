import Image from "next/image";
import React from "react";
interface Props {
  image: string;
  text: string;
}
const SugestCard = ({image, text}: Props) => {
  return (
    <div>
      <div className="h-44 w-52 bg-white m-auto p-1 rounded-sm">
        <Image src={image} width={820} height={100} alt="bg-vector" />
      </div>
      <div>
        <p className="text-justify text-white">
          {text}
        </p>
      </div>
    </div>
  );
};
export default SugestCard;