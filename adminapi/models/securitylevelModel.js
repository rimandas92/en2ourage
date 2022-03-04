const mongoose = require('mongoose');
Schema = mongoose.Schema;
const securitylevelSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        userTypeId: {
            type: Schema.Types.ObjectId,
            ref: 'Usertype'
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

module.exports = mongoose.model("Securitylevel", securitylevelSchema);