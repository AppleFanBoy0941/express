import authorization from '../middlewares/auth.js'

export default function oste(app) {
	app.get('/oste', authorization, function (req, res) {
		res.json([
			{
				id: 1,
				name: 'Gouda',
			},
			{
				id: 2,
				name: 'Feta',
			},
		])
	})
}
