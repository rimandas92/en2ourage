const mongoose = require('mongoose');
Schema = mongoose.Schema;
const usertypeSchema = new Schema (
    {
        ufullname: {
            type: String,
            unique: true,
            required: true,
        },
        ushortname: {
            type: String,
            unique: true,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
)

module.exports = mongoose.model("Usertype", usertypeSchema);