const mongoose = require("mongoose")

const merchSchema = mongoose.Schema(
    {
        productName: {
            type: String
        },
        price: {
            type: Number
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        details: {
            type: String
        },
        size: {
            type: String
        },
        color: {
            type: String
        },
    }
)

const Merch = mongoose.model("Merch", merchSchema)

module.exports = Merch