import connect from "@/database/conn";

export default function handler(req, res) {

    //checking if connection error  in mongoose 
  connect().catch((error) => 
  res.status(400).json({ error: "" }));

  res.status(200).json({ name: "John Doe" });
}
