import { Layout } from "@/components/Layout";
import SugestCard from "@/components/card/SugestCard";
// import { Example } from "@/content/example";
import { Content } from "@/types";
import React from "react";

const template = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-screen p-4 h-full space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-black h-[30rem] md:w-1/2 relative">
          <div className="h-6 w-16 bg-white absolute left-0 -top-2 z-50 px-2 ">
            <p>Latihan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-auto h-full p-2">
          {
            Example.map((item : Content, index) => {
              return (
                <SugestCard key={index} image={item.image} text={item.text} />
              )
            })
          }

          </div>
        </div>
        <div className="bg-black h-[30rem] md:w-1/2 relative">
          <div className="h-6 w-16 bg-white absolute left-0 -top-2 z-50 px-2 ">
            <p>Makan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-auto h-full p-2">
          {
            Example.map((item : Content, index) => {
              return (
                <SugestCard key={index} image={item.image} text={item.text} />
              )
            })
          }

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default template;
