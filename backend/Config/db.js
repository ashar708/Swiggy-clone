import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aarya:testdb@cluster0.0pjdrp3.mongodb.net/fooddeliveryappvite').then(()=>{
        console.log("DB connected")
    });
}