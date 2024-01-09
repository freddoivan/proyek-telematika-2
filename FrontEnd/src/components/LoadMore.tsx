"use client";

import apiMock from "@/lib/axios-mock";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./Spinner";
import ImageUserCard from "./card/ImageUserCard";

export type ImageCard = {
    id: string;
    imgURL: string;
    createdAt: string;
}

export function LoadMore({total}: {total: number}) {
  const [image, setImage] = useState<ImageCard[]>([]);
  const [page, setPage] = useState(0);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async () => {
    // Once the page 8 is reached repeat the process all over again.
    await delay(2000);
    const nextPage = page + 1;
    const newProducts = await apiMock.get(`https://apigetfit.duckdns.org/image/list?page=${nextPage}`)
    setImage((prevProducts:ImageCard[]) => [...prevProducts, ...newProducts.data.data.imgs]);

    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreBeers();
    }
  }, [inView]);

  const count = image.length;
  return (
    <>
      <ImageUserCard image={image} count={count} total={total}  />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >

        {
            count != total ? <Spinner />: <p>No more data to load</p>
        }
        
      </div>
    </>
  );
}