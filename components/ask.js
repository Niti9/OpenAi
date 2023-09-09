import Image from "next/image";

export default () => {
  return (
    <div className=" grid grid-cols-12 bg-gray-700 rounded-full">
      <div className="icon col-span-1 bg-indigo-500 mr-auto rounded-full p-2">
        <Image src="/assets/man.png" width={50} height={50} alt="profile" />
       </div>
      <div  className="question col-span-11 px-4 flex flex-col justify-center">
        <span className="text-lg" >
            What is OpenAI?
        </span>
        </div>
    </div>
  );
};
