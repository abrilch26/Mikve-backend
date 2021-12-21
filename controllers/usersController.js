const bcryptjs  = require("bcryptjs")
const jwt		= require("jsonwebtoken")

const User		= require("./../models/User")

// CREAR UN USUARIO
exports.create = async (req, res) => {

	// 1. OBTENER USUARIO, EMAIL Y PASSWORD DEL FORMULARIO (REQ)
	const { 
		nombre,
		apellido,
		telefono,
		pais,
		email,
		userImage,
		bio,
		password,
		purchasedProducts
	 } = req.body

	//PROCESO ASÍNCRONO
	try {
		
		// 3. GENERAR PASSWORD PARA BASE DE DATOS
		const salt	= await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		// 4. CREAR USUARIO EN BASE DE DATOS
		const newUser = await User.create({
			nombre,
			apellido,
			telefono,
			pais,
			email,
			userImage,
			bio,
			password: hashedPassword,
			purchasedProducts
		})

		// 5. AUTENTICACIÓN CON TOKENS
		// 5.1 creamos token
		const payload = {
			user: {
				id: newUser._id //id de mongo de cada usuario
			}
		}

		// Firmamos el token
		jwt.sign(
			payload, //datos que acompañan token
			process.env.SECRET, 
			{
				expiresIn: 360000 
			},
			(error, token) => {
				if(error) throw error

				res.json({
					msg: "¡Token correctamente generado!",
					data: token
				})
			}
		)

	} catch (error) {
	// si existe error con nuestro await:
		res.status(500).json({
			msg: "Hubo un error con la creación de usuario :(",
			error: error
		})
	}
}


// INICIAR SESIÓN
exports.login = async (req, res) => {
	// 1. obtener email y password de la base de datos 
	const { email, password } = req.body

	try {
		// 2. buscar usuario en la base de datos
		const foundUser = await User.findOne({ email })

		// 3.validamos, en caso de que el usuario no exista:
		if(!foundUser) {
			return res.status(400).json({
				msg: "El usuario o la contraseña son incorrectos."
			})
		}

		// 4.si el usuario se encuentra, buscamos contraseña
		const verifiedPass = await bcryptjs.compare(password, foundUser.password)

		// 5. validamos si el password coincide
		if(!verifiedPass) {
			return await res.status(400).json({
				msg: "El usuario o la contraseña no coinciden."
			})
		}

		// establecemos payload con datos de cada usuario
		const payload = {
			user: {
				id: foundUser.id
			}
		}

		jwt.sign(
			payload,
			process.env.SECRET,
			{
				expiresIn: 360000
			},
			(error, token) => {
				if(error) throw error

				res.json({
					msg: "Inicio de sesión exitoso.",
					data: token
				})
			}
		)
		
		return

	} catch (error) {
		console.log(error)
		res.status(500).json({
			msg: "Hubo un problema con la autenticación.",
			data: error
		})
	}
}


//verificacion de usuario
exports.verifyToken = async (req, res) => {
	try {
		// Buscar id de usuario
		const foundUser = await User.findById(req.user.id).select("-password")

		return res.json({
			msg: "Datos de usuario encontrados.",
			data: foundUser
		})

	} catch (error) {
			console.log(error)

			res.status(500).json({
				msg: "Hubo un error con el usuario"
			})
	}
}