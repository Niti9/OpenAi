import {Schema,model, models} from 'mongoose';

const MessageSchema = new Schema({
    question: String,
    answer : String,
    messages : [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

export default models.Message || model('Message', MessageSchema);