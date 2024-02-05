import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['expense', 'income'],
            //required: true
        },
        label: {
            type: String,
            //required: true
        },
        amount: {
            type: Number,
            //required: true
        },
        category: {
            type: String,
            //required: true
        },
        date: {
            type: Date,
            default: Date.now,
            //required: true
        },
        wallet: {
            type: String,
            //required: true
        },
        owner: {
            type: Schema.Types.ObjectId, ref: "User"
        }

    },
    { timestamps: true }
)

const Transaction = mongoose.model("Transaction", TransactionSchema)
export default Transaction