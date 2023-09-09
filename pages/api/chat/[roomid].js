import connect from "@/database/conn";
import { getAllRooms } from "@/controller/room.controller";


export default async function handler(req, res) {
 
    connect().catch((error) => res.status(400).json({ error: "" }));

    //by searching or in get request 
    //http://localhost:3000/api/chat/1 
    //we get "GET request "in thunder client or output

  switch (req.method) {
    case "GET":
        await getAllRooms(req,res)
    break;
    case "POST":
        res.json("POST Request");
      break;
    default:
        res.setHeader('Allow',['GET','POST']);
        res.status(400).json({ error: `Method ${method} not allowed` });
        break;
    }
}
