


export async function getAllRooms(req, res) {
  try {
    return res.json("GET request");
  } catch (error) {
    return res.status(400).json({ error });
  }
}
