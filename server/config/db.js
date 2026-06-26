const mongooose=require('mongoose');
const connectDB=async()=>{
    try{
        mongooose.set('strictQuery',false);
        const conn=await mongooose.connect(process.env.MONGODB_URL);
        console.log(`Database connected:${conn.connection.host}`);
    }catch(error){
        console.log(error);
    }   
}
module.exports=connectDB;