import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    fines: {
        type: Array,
        default: [0]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user' // Default role is 'user'
    }
});

 userSchema.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1 });

 const UserModel = mongoose.model('User', userSchema);

 export default UserModel;