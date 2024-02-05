import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            //required: true
        },
        password: {
            type: String,
            // required: true,
            min: 5
        },
        wallets: [{
            name: {
                type: String,
                //unique: true,
                //required: true
            },
            balance: {
                type: Number,
                //required: true
            }
        }],
        transactions: [{
            type: Schema.Types.ObjectId, ref: "Transaction"
        }],
    },
    { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
export default User