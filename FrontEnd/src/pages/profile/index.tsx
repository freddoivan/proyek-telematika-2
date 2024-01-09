import { Layout } from "@/components/Layout";
import { LoadMore } from "@/components/LoadMore";
import Card from "@/components/Profile";
import ImageUserCard from "@/components/card/ImageUserCard";
import withAuth from "@/components/hoc/withAuth";
import apiMock from "@/lib/axios-mock";
import useAuthStore from "@/store/useAuthStore";
import { formatRelative, set, subDays } from "date-fns";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default withAuth(Index, 'all');

type Image = {
  id: string,
  imgURL: string
  createdAt: string
}

function Index() {
  const [image, setImage] = React.useState<Image[] | null>()
  const user = useAuthStore.useUser()
  const [count,setCount] = React.useState<number>(0)

  async function getImage() {
    try {
      const response = await apiMock.get(`https://apigetfit.duckdns.org/image/list?page=1`)
      setImage(response.data.data.imgs)
      setCount(response.data.data.count)
    } catch (err) {
      toast.error("oops something went wrong")
    }
  }

  React.useEffect(() => {
    getImage()
  }, [])

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center overflow-auto layout space-y-4 pb-4">
        <div>
        <Card user={user} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div>
            <p className="text-white h2">Riwayat Foto</p>
          </div>
          <div className="flex flex-col w-full justify-end items-center space-y-2">
            <LoadMore  total={count}/>
          </div>

        </div>
      </div>

    </Layout>


  );
}
