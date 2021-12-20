const mongoose = require ("mongoose")

const blogSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    body: String,
    image: String,
    image2: String
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog