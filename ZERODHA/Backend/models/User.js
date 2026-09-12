const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "required more than 2 charactor"]
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);