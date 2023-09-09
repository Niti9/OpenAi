// import Image from "next/image";
// // import styles from './page.module.css'
// import styles from "../styles/global.css";


// import all components
import Aside from "@/components/aside";
import Main from '@/components/main';
import Search from "@/components/search";

export default function Home() {
  return (
      <div className="grid grid-cols-6">
        <div className="bg-gray-900 col-span-1 aside z-10 text-gray-50">
          
        <Aside/>
        </div>
        <div className="bg-gray-800  text-gray-50 col-span-5 min-h-screen  h-full mb-40">
          <Main/>
        </div>
        <Search></Search>
        </div>
  );
}
