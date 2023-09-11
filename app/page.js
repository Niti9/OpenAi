// import Image from "next/image";
// // import styles from './page.module.css'
// import styles from "../styles/global.css";

"use client";

// import all components
import Aside from "@/components/aside";
import Main from '@/components/main';
import Search from "@/components/search";
import { useQuery } from 'react-query';
import { getAllRooms } from '@/lib/request';
import Loading from '@/components/loading';
export default function Home() {

  //use a new key to update new components and 'rooms' is that key
  const { isLoading, isError, data, error } = useQuery('rooms', getAllRooms)
  if (isLoading) return (
    <Loading></Loading>
  )
  if (!data) return <div className="text-center">Error:{error.message}</div>
  if (!data) return <div className="text-center">No Messages</div>


  //checking that what data comes on console from mongodb
  console.log(data);
  return (
    <div className="grid grid-cols-6">
      <div className="bg-gray-900 col-span-1 aside z-10 text-gray-50">

        <Aside />
      </div>
      <div className="bg-gray-800  text-gray-50 col-span-5 min-h-screen  h-full mb-40">
        <Main />
      </div>
      <Search></Search>
    </div>
  );
}
