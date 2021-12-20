const Merch = require ("../models/Merch")


//CRUD
exports.create = async (req, res) => {
    const {
        productName,
        price,
        image,
        description,
        details,
        size,
        color,
    } = req.body
       
    try {
        const newMerch = await Merch.create({
            productName,
            price,
            image,
            description,
            details,
            size,
            color  
        })
       
        res.json ({
            msg: "Producto creado con éxito",
            data: newMerch
        })

    } catch(error) {
        res.status(500).json({
            msg: "Hubo un error creando el producto",
            error: error
        })
    }
}



exports.readAll = async (req, res) => {
    try {
        const products = await Merch.find({})

        res.json ({
            msg: "Producto obtenido con éxito",
            data: products
        })

    } catch (eror) {
        res.status(500).json ({
            msg: "Hubo un error procesando y obteniendo los productos",
            error: error
        })
    }
};


exports.readOne = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Merch.findById(id)

        res.json ({
            msg: "Producto obtenido con éxito",
            data: product
        })

    } catch (error) {
        res.status(500).json ({
            msg: "Hubo un error obteniendo el producto",
            error: error
        })
      
    }
}


exports.edit = async (req, res) => {
    const { id } = req.params

    const {
        productName,
        price,
        image,
        description,
        details,
        size,
        color
    } = req.body

    try {
        const updatedProduct = await Merch.findByIdAndUpdate(
            id,
            {
                productName,
                price,
                image,
                description,
                details,
                size,
                color  
            },
            {new: true}
        )

        res.json({
            msg: "Producto actualizado con éxito",
            data: updatedProduct
        })

    } catch (error) {
        res.status(500).json ({
            msg: "Hubo un error con la actualización del producto",
            error: error
        })    
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params

    try {
        const deletedProduct = await Merch.findByIdAndRemove({_id: id})

        res.json ({
            msg: "Producto borrado con éxito",
            data: deletedProduct
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borando este producto",
            error: error
        })

    }
}