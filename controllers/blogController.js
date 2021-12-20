const Blog = require ("../models/Blog")


// CRUD
exports.create = async (req, res) => {
    const {
        title,
        subtitle,
        body,
        image,
        image2
    } = req.body

    try {
        const newBlog = await Blog.create({
            title,
            subtitle,
            body,
            image,
            image2
        })

        res.json ({
            msg: "Nuevo blog creado con éxito",
            data: newBlog
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando el nuevo blog",
            error: error
        })  
    }
}


exports.readAll = async (req, res) => {
    try {
        const blogs = await Blog.find({})

        res.json({
            msg: "Blogs obtenidos con éxito",
            data: blogs
        })

    } catch (error) {
       res.status(500).json({
           msg: "Hubo un error obteniendo los artículos",
           error: error
       }) 
    }
}


exports.readOne = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)

        res.json({
            msg: "Blog obtenido con éxito",
            data: blog
        })

    } catch (error) {
        res.status(500).json ({
            msg: "Hubo un problema obteniendo el blog",
            error: error
        })  
    }
}



exports.edit = async (req, res) => {
    const { id } = req.params

    const {
        title,
        subtitle,
        body,
        image,
        image2 
    } = req.body

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, 
            {
                title,
                subtitle,
                body,
                image,
                image2   
            },
            {new: true}
        )

        res.json ({
            msg: "Blog actualizado con éxito",
            data: updatedBlog
        })

    } catch (error) {
        res.status(500).json ({
            msg: "Hubo un error con la actualización de este blog",
            error: error
        })  
    }
}


exports.delete = async (req, res) => {
    const { id } = req.params

    try {
        const deletedBlog = await Blog.findByIdAndRemove({_id: id})
        
        res.json ({
            msg: "Artículo borrado con éxito",
            data: deletedBlog
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando este artículo",
            error: error
        }) 
    }
}
