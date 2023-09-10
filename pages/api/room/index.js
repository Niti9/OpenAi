import connect from "@/database/conn";
import { createRoom, getAllRooms } from "@/controller/room.controller";


export default async function handler(req, res) {
 
    connect().catch((error) => res.status(400).json({ error: "" }));

  switch (req.method) {
    case "GET":
        await getAllRooms(req,res)
    break;
    // GET request se rooms show honge jitne bhi post se create hue honge
    //http://localhost:3000/api/room 
    case "POST":
      // res.json("POST Request");
      //now we will use here room.js file to create new Room
      await createRoom(req,res);
      break;

      // Post request se new room create hote rahenge is api se 
      //http://localhost:3000/api/room 
    default:
        res.setHeader('Allow',['GET','POST']);
        res.status(400).json({ error: `Method ${method} not allowed` });
        break;
    }
}
