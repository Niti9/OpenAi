import connect from "@/database/conn";

export default function handler(req, res) {
  // //this is valid way to create an api
  //   res.status(200).json({ name: "John Doe" });
  // //we can call this api  by  without using index.js
  // //http://localhost:3000/room

  //to check that connection established or not in vscode terminal
  connect().catch((error) => res.status(400).json({ error: "" }));

  switch (req.method) {
    case "GET":
      res.json("GET Request");
      break;
    case "POST":
      res.json("POST Request");
      break;
    default:
      res.status(400).json({ error: `Method ${method} not allowed` });
  }
}
