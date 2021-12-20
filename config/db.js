const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        })

        console.log ("Base de datos conectada")

    } catch (error) {
        console.log(error)
        ProcessingInstruction.exit(1)
    }
}

module.exports = connectDB
