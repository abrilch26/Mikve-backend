const jwt = require("jsonwebtoken")

const decrypt = async (req, res, next) => {
	// tomar token y guardarlo en una variable
	const token = req.header("x-auth-token")

	// si el token = null:
	if(! token){
		return res.status(401).json({
			msg: "No hay token, permiso no válido."
		})
	}

	// si sí existe token:
	try {
		const openToken = await jwt.verify(token, process.env.SECRET)

		console.log("openToken", openToken)
		req.user = openToken.user
		next()

	} catch (error) {
		console.log(error)

		res.json(
			{
                msg: "Hubo un error con el token."
			}
		)
	}
}


module.exports = decrypt