const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MONGODB CONNECTED SUCCESSFULLY! ✓")
    }catch(err){
        console.log("❌ MONGODB CONNECTION ERROR")
    }

}
module.exports = connectDB;