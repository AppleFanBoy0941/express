import express from 'express'
import cheeses from './routes/cheeses/index.js'
import users from './routes/users/index.js'
import auth from './routes/auth/index.js'

const app = express()

// middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api routes
cheeses(app)
users(app)
auth(app)

app.get('/nogetandet', (req, res) => {
	res.send('Noget helt andet! Brian bruger ikke Mac😩🤢')
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
