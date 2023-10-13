import mongoose from "mongoose";

export default async function connectToDB() {
    try {
        await mongoose.connect("mongodb+srv://vipul:absdef@cluster0.hh21r.mongodb.net/Portfolio?retryWrites=true&w=majority");
        console.log("Database connected successfully");
    } 
    catch (error) {
        console.log(error);
    }
}