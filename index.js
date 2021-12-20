// 1. IMPORTACIONES
const express = require("express")
const app = express()
const cors = require ("cors")
require("dotenv").config()

const connectDB = require('./config/db')




// 2. MIDDLEWARES
connectDB()

app.use(cors()) //Dar acceso a servidores de terceros

app.use(express.json()) //req y res en .json




// 3. RUTAS
app.use("/merch", require ("./routes/merch"))

app.use("/users", require ("./routes/users"))

app.use("/blog", require ("./routes/blog"))




// 4. SERVER
app.listen(process.env.PORT, () => {
	console.log(`Servidor 🏃🏻 en puerto ${process.env.PORT}`)
})
