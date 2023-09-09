import { BiComment, BiPlus, BiTrashAlt } from "react-icons/bi";

//using react-icon of + symbol

export default () => {
  return (
    <aside className="fixed left-0 w-80 h-screen bg-gray-900">
      <div className=" text-gray-50 flex flex-col items-center py-3 gap-5">
        <button className="border rounded-md border-gray-600 w-4/5 hover:bg-indigo-600 ">
          {/* using BiPlus react icon here  */}
          <span className=" block py-3">
            <BiPlus className="inline" size={20} /> New Chat{" "}
          </span>
        </button>

        {/* creating rooms button in this div */}
        <div className="chat_list w-full flex flex-col gap-4 px-3">
          <div className="w-full border-0 rounded-md bg-gray-800 py-1 px-3 flex justify-center items-center">
            <button className="text-left truncate w-full active:bg-violet-700 ">
              {/* truncate will hide all the overflow text */}

              <span className="block py-3 text-gray-50">
                {/* adding comment icon from react-icon */}
                <BiComment className=" inline mx-2" size={20} />
                Room 1
              </span>
            </button>
            <button className="bg-gradient-to-l from-gray-800 py-4 px-3 hover:text-indigo-400">
              <BiTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

// export default()=>{
//   return(
//     <aside>
//       <h1> aside </h1>
//     </aside>
//   )
// }