import { getMessages } from '@/lib/request';
import Ask from './ask';
import Response from './response';
import { useQuery } from 'react-query';
import Loading from '@/components/loading';
import NotFound from '@/components/notfound'


export default ({ roomid }) => {

    //these are some constant variables 
    const { isLoading,
        isError,
        data: messages,
        error } =
        //yahan useQuery use karenge messages lene ke liye room se 
        //lekin uske liye humien getMessages mein (roomid) parameter pass karna hoga
        //aur "messages " humaari "key" hai 
        //isliye hum key or parameter ko array mein denge 
        useQuery(['messages', roomid], () => getMessages(roomid));

    if (isLoading) return <Loading></Loading>
    if (isError) return <div className='text-center'>Error:{error.message}</div>
    if (messages.length === 0) return <NotFound></NotFound>
    return (
        <main className='container mx-auto w-3/5 py-5'>
            {
                //if messages then only messages will map
                //ab data ask aur response dono component mein share hoga because parameter
                messages && messages.map((message, index) => {
                    return (
                        //yahan index ek key hai meanse unique thing
                        //aur ask question show karegea
                        //similarly response mein answer show honge
                        <div key={index}>
                            {/* Ask Component */}
                            <Ask q={message.question}></Ask>
                            {/* Response Component */}
                            <Response ans={message.answer}></Response>

                        </div>
                    )
                })
            }
        </main>
    )
} 