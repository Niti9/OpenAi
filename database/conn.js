
import mongoose from 'mongoose';
import ENV from '../config.env'

export default async function connect(){
    const db = await mongoose.connect(ENV.ATALAS_URL);

    if(mongoose.connection.readyState ===1)
    {
        console.log("Database connected");
        return;
    }

    console.log(`MongoDB successfully connected...! ${ENV.ATALAS_URL}`)


}