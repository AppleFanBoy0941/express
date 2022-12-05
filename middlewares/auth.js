// middlewares/auth.js
export default function authorization(req, res, next) {
	if (req.headers.authorization !== '1234') {
		res.status(401).send('Unauthorized')
		res.end()

		return
	}

	next()
}
