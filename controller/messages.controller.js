

/** Here we create message controller for room id  */

import Message from '@/models/message.model';
import Room from '@/models/room.model';

/** GET : http://localhost:3000/api/chat/room/id */
export async function getChat(req, res) {
    try {

        //ensure that here constant variable {roomid} name should be exactly same to [roomid] present in pages/api/chat folder
        const { roomid } = req.query;
        if (!roomid) return res.status(400).json({ error: "No room id present....!" });

        const messages = await Message.find({ room: roomid });
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

    /** specify data to the message model */
    const message = new Message({

        /** This is hardcoded but we will give dynamic question,answer */
        // question: "What is ChatGPT",
        // answer: "ChatGPT is a chatbot",
        //or
        // question: question,
        // answer: answer,
        //or
        question,
        answer,
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