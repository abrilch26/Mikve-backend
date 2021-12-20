const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre del jugador(a) es requerido"],
        },
        apellido: {
            type: String,
            required: [true, "El apellido del jugador(a) es requerido"],
        },
        telefono: {
            type: String,
            match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Por favor ingrese un telefono válido"],
            unique: true,
            default: "",
        },
        pais: {
            type: String,
            required: [true, "El país dónde juegas es requerido"],
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un email valido"],
        },
        userImage: {
            type: String,
        },
        bio: {
            type: String
        },
        password: {
            type: String,
            required: [true, "La contraseña es necesaria Ingresa la tuya."]
        }
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User