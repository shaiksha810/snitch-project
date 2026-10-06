import mongoose from 'mongoose'
import config from './config.js'


const connectDB = async () => {
    try {
        
     mongoose.connect(config.MONGO_URI)
     console.log("database is connected");


    } catch (error) {
       console.log("mongodb error:",error);
        
    }
}


export default connectDB