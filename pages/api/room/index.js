import connect from "@/database/conn";
import { getAllRooms } from "@/controller/room.controller";


export default async function handler(req, res) {
 
    connect().catch((error) => res.status(400).json({ error: "" }));

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
