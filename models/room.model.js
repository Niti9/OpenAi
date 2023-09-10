import {Schema, model, models} from 'mongoose';

const RoomSchema = new Schema({
    name: String,
    messages : [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
});

//Here is a condition if Room is already created in room
//or if not then Room will create in model in RoomSchema
export default models.Room || model('Room', RoomSchema);