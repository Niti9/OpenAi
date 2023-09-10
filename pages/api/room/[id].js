
//to get data of room with id 
//http://localhost:3000/api/room/id  id can be 1 ,2 ,3 if created through post request


import connect from "@/database/conn";
import { createRoom, deleteRoom, getRoom } from "@/controller/room.controller";


export default async function handler(req, res) {

  connect().catch((error) => res.status(400).json({ error: "" }));

  switch (req.method) {
    case "GET":
      //change her getAllRoom to getRoom to see demo of GET room by id 
      await getRoom(req, res);
      break;
    // GET request mein id dene se particular id response mein show hogi 
    //http://localhost:3000/api/room/id  id can be 1 ,2 ,3 ....  but first we have to create room using post request 
    // id can be check through 
    //http://localhost:3000/api/room it will show all data with unique id 
    //we can search using one of the unique id  like 
    // http://localhost:3000/api/room/64fd3a0b80621f48a7cee92a   

    case "POST":
      // res.json("POST Request");
      //now we will use here room.js file to create new Room
      await createRoom(req, res);
      break;

    // Post request se new room create hote rahenge is api se 
    //http://localhost:3000/api/room 

    case "DELETE":
      await deleteRoom(req, res);
      break;
    //use to delete the data according to id with DELETE request
    //http://localhost:3000/api/room/64fd3a0b80621f48a7cee92a  it is a unique  id 
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(400).json({ error: `Method ${method} not allowed` });
      break;
  }
}
