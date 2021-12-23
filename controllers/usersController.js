const bcryptjs  = require("bcryptjs")
const jwt		= require("jsonwebtoken")

const User		= require("./../models/User")

// CREAR UN USUARIO
exports.create = async (req, res) => {

	// 1. OBTENER USUARIO, EMAIL Y PASSWORD DEL FORMULARIO (REQ)
	const { 
		nombre,
		apellido,
		email,
		password	
	 } = req.body

	 console.log(req.body)
	 
	 if ((!nombre, !apellido, !email, !password)) {
		return res.status(500).json({
		  msg: "Todos los campos son obligatorios",
		  error: error
		})
	  }
	
	//PROCESO ASÍNCRONO
	try {
		
		// 3. GENERAR PASSWORD PARA BASE DE DATOS
		const salt	= await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		// 4. CREAR USUARIO EN BASE DE DATOS
		const newUser = await User.create({
			nombre,
			apellido,
			email,
			password: hashedPassword,
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
					data: token
				})
			}
		)

	} catch (error) {
		if (error.code === 11000) {
			res.json({
				msg: "Este correo ya ha sido registrado, intenta con otro",
				error: error
			})
		} else { //si hubo otro error con await:
			res.json({
				msg: "Hubo un error con la creación de usuario :(",
				error: error
			})	
		}
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
			return res.json({
				msg: "El correo o la contraseña son incorrectos."
			})
		}

		// 4.si el usuario se encuentra, buscamos contraseña
		const verifiedPass = await bcryptjs.compare(password, foundUser.password)

		// 5. validamos si el password coincide
		if(!verifiedPass) {
			return await res.json({
				msg: "El correo y la contraseña no coinciden."
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
					data: token
				})
			}
		)
		
		return

	} catch (error) {
		res.json({
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
			res.status(500).json({
				msg: "Hubo un error con el usuario"
			})
	}
}

//VER PERFIL
exports.getProfile = async (req, res) => {
	const { id } = req.params
	try {
		const user = await User.findById(id).populate("purchasedProducts")
		res.json({
			data: user
		})
	} catch (eror) {
		res.status(500).json({
			msg: "Error obteniendo los datos",
			error: error
		})
	}
}


//EDITAR DATOS DE USUARIO
exports.editUser = async (req, res) => {

	const { id } = req.params;
	const {
		nombre,
		apellido,
		telefono,
		pais,
		email,
		userImage,
		bio,
	} = req.body;

	try {
	  const updateUser = await User.findByIdAndUpdate(
		id,
		{
		nombre,
		apellido,
		telefono,
		pais,
		email,
		userImage,
		bio
		},
		{ new: true }
	  );
	  res.json({
		msg: "Datos actualizados con éxito",
		data: updateUser,
	  });
	} catch (error) {
	  res.status(500).json({
		msg: "Hubo un error actualizando los datos.",
		error: error,
	  });
	}
  };