import Head from "next/head";
import Card from "@/components/TrainerProfile";
import withAuth from "@/components/hoc/withAuth";
export default withAuth (Home, 'all')
function Home() {
  return (
    <div>
      <Head>
        <title>Modern Card</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pro.ico" />
      </Head>
      <div className="bg-hero w-screen h-screen bg-cover bg-fixed flex justify-center items-center">
        <Card/>
      </div>
    </div>
  );
}