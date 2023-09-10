import Room from "@/models/room.model";


// GET controller
/** GET : http://localhost:3000/api/room  */

//get all rooms from Room model 
export async function getAllRooms(req, res) {
  try {
    //here in Room.find({})  curly braces will give all data of room model
    const rooms = await Room.find({});

    // return data from room and true in success property
    //when we search  in get request we get output blank array in data and true in sucess
    //http://localhost:3000/api/room
    return res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    return res.status(400).json({ error });
  }
}


// POST controller
/** POST : http://localhost:3000/api/room  */
export async function createRoom(req, res) {
  try {

    //to get length of all rooms
    const len = await (await Room.find({})).length;

    const defaultRoom = {
      // name:"ROOM 1",
      //or if we want to increase length of room 
      name: `Room ${len + 1}`,
      messages: []
    }

    //to create new room for chat 
    const chat = await Room.create(defaultRoom);
    return res.status(200).json({ success: true, data: chat });

  }
  catch (error) {
    return res.status(400).json({ error });
  }
}


/** GET :http://localhost:3000/api/room/id  */
//this controller request help to get particular 
//room data from room ID not other data will show 
export async function getRoom(req, res) {

  //now we will get  data through id of data 
  try {

    const { id } = req.query;
    //if we don't have id 
    if (!id) return res.status(400).json({ error: "No Chat id present ---!" })

    //to get room through room id 
    const room = await Room.findById(id).populate('messages');
    //if don't have room 
    if (!room) return res.status(400).json({ error: "No room found ....!" })

    //if everything is ok and room found then return data from room
    return res.status(200).json({ success: true, data: room })
  }
  catch (error) {
    return res.status(400).json({ error });
  }
}


/** Delete  http://localhost:3000/api/room/id   */

export async function deleteRoom(req, res) {
  try {
    const { id } = req.query;
    //check if id not found  
    if (!id) return res.status(400).json({ error: "NO chat id present ....!" })

    //to delete data according to id from mongodb or database
    const del = await Room.findByIdAndDelete(id);

    console.log("deleted waali: ", del);
    return res.status(200).json({ success: true, deleted: id })
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
}