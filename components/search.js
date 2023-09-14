import { BiNavigation } from 'react-icons/bi';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { sendMessage } from '@/lib/request';

export default ({ roomid }) => {

    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();

    //here we try to use api of sendMessage created in request.js
    const mutation = useMutation((args) => {
        return sendMessage(args) //args passed to sendmessage it is like a  parameter

    }, { //here onSuccess is like second argument
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        }
    });

    // submit button to send question to backend to get answer from backend
    function onSubmit(e) {
        e.preventDefault();

        mutation.mutate({ roomid, message: search }); //here we passed an object
        // yahan "roomid" ek key hai aur "message" mein hum "search" kiya hua question bhejenge to get reply  
        setSearch('');
        // console.log(search);
    }

    if (mutation.isLoading) return <div className='text-center text-gray-50'
    >Loading</div>

    if (mutation.isError) return <div className='text-gray text-gray-50'>
        Error :{mutation.error.message}
    </div>
    return (
        <div className="fixed bottom-0 left-0 w-full z-0 h-40 text-gray-50 bg-gradient-to-t from-gray-800">
            <div className="grid grid-cols-6 absolute bottom-10 w-full">
                <div className="col-start-2 col-span-6 flex justify-center items-center w-full ">
                    <div className="w-2/3 px-5 bg-gray-800 border-gray-700  round-lg flex items-center">
                        <form className="flex  w-full shadow-2xl"
                            onSubmit={onSubmit}>
                            <input type="text"
                                className="w-full py-3 bg-transparent focus:outline-none text-lg"
                                autoFocus="autofocus"
                                placeholder="Whare are you looking for?"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit">
                                <BiNavigation className="text-2xl hover:text-[#10a37]"></BiNavigation>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <h1> Search Input Textbox</h1>
        </div>
    )
}