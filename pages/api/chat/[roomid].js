import connect from "@/database/conn";
import { getAllRooms } from "@/controller/room.controller";
import { getChat ,createChat} from "@/controller/messages.controller";


export default async function handler(req, res) {

  connect().catch((error) => res.status(400).json({ error: "" }));

  //by searching or in get request 
  //http://localhost:3000/api/chat/1 
  //we get "GET request "in thunder client or output

  switch (req.method) {
    // case "GET":
    //     await getAllRooms(req,res)
    // break;

    case 'GET':
      await getChat(req, res);
      break;
    //by GET request with id we can check that is any message create or not 
    //   http://localhost:3000/api/chat/id
    //we also can extract data from 
    // http://localhost:3000/api/room/64fd8288f9e6970fb7ab2477 with add data in 
    

    case "POST":
      await createChat(req, res);
      break;
      //by POST request with id  like and id can be
      // http://localhost:3000/api/chat/64fd8288f9e6970fb7ab2477 with add data in 
      //  body  in json format like 
      //{"question":"how are you?", "answer":"fine"}
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(400).json({ error: `Method ${method} not allowed` });
      break;
  }
}
