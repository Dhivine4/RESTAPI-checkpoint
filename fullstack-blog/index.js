const express = require("express")
const mongoose = require('mongoose')
//import routes
const routes = require('./routes.js')
// import cors middleware to handle connection from client server
const cors = require('cors')

mongoose
.connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true })
	.then(() => {
		console.log('connected to database')
		const app = express()

		app.use(cors())
		//middleware that allows json works on express
		app.use(express.json())
		app.use('/API', routes)

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
