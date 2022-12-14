import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// middlewares/auth.js
export default function authorization(req, res, next) {
	// check if there is auth, else return 401
	if (!req.headers.authorization) {
		res.status(401)
		res.end()

		return
	}

	// check if the auth is formatted correctly = has bearer and has a length of two
	const header = req.headers.authorization.split(' ')
	if (header.length !== 2 && header[0].toLowerCase() !== 'Bearer') {
		res.status(403)
		res.end()

		return
	}

	// check if auth is valid
	try {
		jwt.verify(header[1], process.env.TOKEN_SECRET)
		next()
	} catch (error) {
		res.status(403)
		res.end()

		return
	}
}
