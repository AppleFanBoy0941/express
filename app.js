import express from 'express'
import oste from './routes/oste.js'

const app = express()

app.use(express.static('./public'))
oste(app)

// app.get('/hej/:name', (req, res) => {
// 	res.setHeader('Content-Type', 'text/html')
// 	res.send(
// 		'<link rel="stylesheet" href="/style.css">' +
// 			'<h1>Hello ' +
// 			req.params.name +
// 			' din spade</h1>'
// 	)
// })

app.get('/nogetandet', (req, res) => {
	res.send('Noget helt andet! Brian bruger ikke Mac😩🤢')
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
