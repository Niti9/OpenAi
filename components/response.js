import Image from "next/image";

export default () => {
  return (
    <div className=" grid grid-cols-12 py-4">
      <div className="icon col-span-1 bg-[#10a37f] mr-auto rounded-full p-2">
        <Image src="/assets/logo.png" width={50} height={50} alt="profile" />
      </div>
      <div className="question col-span-11 px-4">
        <p className="text-lg py-4">Chat GPT is a chatbot</p>
      </div>
    </div>
  );
};
