import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,         //added later

    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoURL:{
        type:String,
        default:`https://api.dicebear.com/9.x/user/svg`
    },
    createdAt: {
        type: Date,
        default: Date.now, // Correctly pass the function reference
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Correctly pass the function reference
    },
});

// Add pre-save middleware to update the `updatedAt` field automatically
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
