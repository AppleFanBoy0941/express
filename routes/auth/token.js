import useDB from '../../database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default async function token(request, response) {
	if (!request.body.username || !request.body.password) {
		response.status(400)
		response.send('Username and password required')
		response.end()
		return
	}

	const { collection, client } = await useDB('users')

	try {
		const user = await collection.findOne({ username: request.body.username })
		client.close() // close the client when you're done using it

		// if user doesn't exist, return 403 forbidden
		if (!user) {
			response.status(403)
			response.end()
			return
		}

		// if password doesn't match with user, return 403 forbidden
		if (!(await bcrypt.compare(request.body.password, user.password))) {
			response.status(403)
			response.end()
			return
		}

		const newToken = jwt.sign(
			{ username: user.username },
			process.env.TOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		)

		response.status(200)
		response.send(newToken)
		response.end()
	} catch (error) {
		console.log('Authentication token error', error)
		response.status(500)
		response.end()
	}

	response.end()
}
