const mongoose = require('mongoose');
Schema = mongoose.Schema;
const adminSchema = new Schema (
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        image: {
            type: String
        },
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

module.exports = mongoose.model("Admin", adminSchema);