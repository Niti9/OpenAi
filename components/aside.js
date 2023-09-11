// "use client";

import { BiComment, BiPlus, BiTrashAlt } from "react-icons/bi";
import {useMutation, useQueryClient} from 'react-query';
import {createRoom,deleteRoom} from '@/lib/request';

export default ({getRooms}) => {
// now will get array of rooms from database , now here will try to iterate them
console.log(getRooms);



/** create new room */
//this below code will quickly update the new rooms 
//to instantly update new data in backend will show on browser
const queryClient = useQueryClient();
const createMutation = useMutation(createRoom,{
  onSuccess :() =>{
    // console.log()
    queryClient.invalidateQueries('rooms'); //here rooms is a key than 
    //rooms key will revalidate the queries and update all the data
  }
});


/** delete room */
const deleteMutation= useMutation(deleteRoom,{
  onSuccess :() =>{
    // console.log()
    queryClient.invalidateQueries('rooms'); 
  }
})

  return (
    <aside className="fixed left-0 w-80 h-screen bg-gray-900">
      <div className=" text-gray-50 flex flex-col items-center py-3 gap-5">
       
       {/* this button use to create new button */}
        <button className="border rounded-md border-gray-600 w-4/5 hover:bg-indigo-600 "
        onClick={()=> createMutation.mutate()}
        >
          {/* using BiPlus react icon here  */}
          <span className=" block py-3">
            <BiPlus className="inline" size={20} /> New Chat{" "}
          </span>
        </button>

        {/* creating rooms button in this div */}
        <div className="chat_list w-full flex flex-col gap-4 px-3">
         {
          getRooms.map((chat,index)=>{
            return(
              //here index is given as key so error will not create
              <div key={index} className="w-full border-0 rounded-md bg-gray-800 py-1 px-3 flex justify-center items-center">
              <button className="text-left truncate w-full active:bg-violet-700 ">
                {/* truncate will hide all the overflow text */}
  
                <span className="block py-3 text-gray-50">
                  {/* adding comment icon from react-icon */}
                  <BiComment className=" inline mx-2" size={20} />
                 
                 {/* here room number come from database if not then there is a message */}
                  {chat.name || 'Chat Name Here '}
                </span>
              </button>
              <button onClick={()=> deleteMutation.mutate(chat._id)} className="bg-gradient-to-l from-gray-800 py-4 px-3 hover:text-indigo-400">
                <BiTrashAlt />
              </button>
            </div>
            )
          })
         }
         
        </div>
      </div>
    </aside>
  );
};
