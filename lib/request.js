

import ENV from '../config.env';


export async function getAllRooms() {
    
    const { success, data } = await (await fetch(`${ENV.BASE_URL}/room`)).json()
    if (!success) throw new Error('Error fetching rooms');
    return data;
}

export async function getMessages(roomid) {
    const { success, data } = await (await fetch(`${ENV.BASE_URL}/chat/${roomid}`)).json();
    if (!success) throw new Error('Error fetching messages');
    return data;
}



export async function createRoom() {
    const { success, data } = await (await fetch(`${ENV.BASE_URL}/room`, {
        //passing an object
        method: 'POST'
    })).json();
    if (!success) throw new Error('Error fetching room');
    return data;
}





export async function deleteRoom(roomid) {
    const { success, data } = await (await fetch(`${ENV.BASE_URL}/room/${roomid}`, {
        //passing an object
        method: 'DELETE'
    })).json();
    if (!success) throw new Error('Error deleting room');
    return data;
}



export async function sendMessage({ roomid, message }) {

    if (!roomid && !message) throw new Error("Invalid arguments");

    const { success, data } = await (await fetch(`${ENV.BASE_URL}/chat/${roomid}`, {
        //passing an object
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //here we pass message as question
        body: JSON.stringify({ question: message })
    })).json();
    if (!success) throw new Error('Error sending message');
    return [success, data];
}              