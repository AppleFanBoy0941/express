import express from 'express'
import cheeses from './routes/cheeses/index.js'

const app = express()

app.use(express.static('./public'))
app.use(express.json())

cheeses(app)

app.get('/nogetandet', (req, res) => {
	res.send('Noget helt andet! Brian bruger ikke Mac😩🤢')
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
