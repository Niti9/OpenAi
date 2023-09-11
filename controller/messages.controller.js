

// /** Here we create message controller for room id  */

// import Message from '@/models/message.model';
// import Room from '@/models/room.model';
// import { Configuration, OpenAIApi } from "openai";

// // import ENV from '@/config.env'
// import ENV from '../config.env';

// /** GET : http://localhost:3000/api/chat/room/id */
// export async function getChat(req, res) {
//     try {

//         //ensure that here constant variable {roomid} name should be exactly same to [roomid] present in pages/api/chat folder
//         const { roomid } = req.query;
//         if (!roomid) return res.status(400).json({ error: "No room id present....!" });

//         //her by passing some value to arguments we can remove extra data of _v and room
//         const messages = await Message.find({ room: roomid }, { __v: 0, room: 0 });
//         //if we don't have messages
//         if (!messages) return res.status(400).json({ error: "No message found....!" });

//         return res.status(200).json({ success: true, data: messages });

//     } catch (error) {
//         return res.status(400).json({ error });
//     }
// }


// /** POSTS : http://localhost:3000/api/chat/room/id */
// export async function createChat(req, res) {

//     const { roomid } = req.query
//     const { question, answer } = req.body;

//     if (!roomid) return res.status(400).json({ error: "No room id present" });
//     if (!question && !answer) res.status(400).json({ error: "Cannot get data from" });

//     const rooms = await Room.findOne({ _id: roomid })
//     if (!rooms) return res.status(400).json({ error: "No room found.....!" });


//     /** CONFIG OPEN  AI API */
//     const configuration = new  Configuration({
//         // apiKey:  ENV.OPEANAI_API_KEY
//         apiKey:  "OPEANAI_API_KEY"
//         // apiKey: process.env.OPENAI_API_KEY
//     });



//     const openai = new OpenAIApi(configuration);

//     const completion = await openai.createCompletion({
//         model : "text-davinci-003",
//         prompt: question,
//         temperature: 0.5,  //temperature controlls randomness of generated text 
//         max_token : 100,
//         top_p: 1

//     })
//     //after this we do POST request and No need to give answer in body 
//     // http://localhost:3000/api/chat/id
//     // also giving {"question":" what is chatgpt"}
//     //it will automatically get result from the help of OPENAI
    
    
//     /** specify data to the message model */
//     const message = new Message({

//         question,
//         answer: completion.data.choices[0].text, // this helps to get data or response from open ai 
//         //in answer choice will be first in the form of text 
//         room: roomid
//     })

//     /** Save data in the database */
//     await message.save();


//     /**push message in the room model 
//      * --->   for that we use rooms with messages array and then push message id 
//     */
//     rooms.messages.push(message._id);

//     /** save data in the room model */
//     await rooms.save();

//     return res.status(200).json({ success: true, data: message });
// }


















/** Here we create message controller for room id  */

import Message from '@/models/message.model';
import Room from '@/models/room.model';
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';

// import ENV from '@/config.env'
import ENV from '../config.env';

/** GET : http://localhost:3000/api/chat/room/id */
export async function getChat(req, res) {
    try {

        //ensure that here constant variable {roomid} name should be exactly same to [roomid] present in pages/api/chat folder
        const { roomid } = req.query;
        if (!roomid) return res.status(400).json({ error: "No room id present....!" });

        //her by passing some value to arguments we can remove extra data of _v and room
        const messages = await Message.find({ room: roomid }, { __v: 0, room: 0 });
        //if we don't have messages
        if (!messages) return res.status(400).json({ error: "No message found....!" });

        return res.status(200).json({ success: true, data: messages });

    } catch (error) {
        return res.status(400).json({ error });
    }
}


/** POSTS : http://localhost:3000/api/chat/room/id */
export async function createChat(req, res) {

    const { roomid } = req.query
    const { question, answer } = req.body;

    if (!roomid) return res.status(400).json({ error: "No room id present" });
    if (!question && !answer) res.status(400).json({ error: "Cannot get data from" });

    const rooms = await Room.findOne({ _id: roomid })
    if (!rooms) return res.status(400).json({ error: "No room found.....!" });


    /** CONFIG OPEN  AI API */
    const openai = new  OpenAI({
        apiKey:  ENV.OPEANAI_API_KEY
        // apiKey:  process.env.OPEANAI_API_KEY
        // apiKey: process.env.OPENAI_API_KEY
    });



    // const openai = new OpenAIApi(configuration);
// try{
    const completion = await openai.chat.completions.create({
        model : "text-davinci-003",
        prompt: question,
        temperature: 0.5,  //temperature controlls randomness of generated text 
        max_token : 100,
        top_p: 1

    })
    console.log(completion.choices[0].text);
    //after this we do POST request and No need to give answer in body 
    // http://localhost:3000/api/chat/id
    // also giving {"question":" what is chatgpt"}
    //it will automatically get result from the help of OPENAI
    
// }
//  catch(error){  
//     if(error){
//         console.error(error.status);
//         console.error(error.message);
//         console.error(error.code);
//         console.error(error.type);
//     }
//     else{
//         console.log(error);
//     }
//  } 
 /** specify data to the message model */
    const message = new Message({

        question,
        answer: completion.data.choices[0].text, // this helps to get data or response from open ai 
        //in answer choice will be first in the form of text 
        room: roomid
    })

    /** Save data in the database */
    await message.save();


    /**push message in the room model 
     * --->   for that we use rooms with messages array and then push message id 
    */
    rooms.messages.push(message._id);

    /** save data in the room model */
    await rooms.save();

    return res.status(200).json({ success: true, data: message });
}