import bcrypt from 'bcrypt'
import useDB from '../../database.js'
import { createHash } from 'node:crypto'

export default async function createUser(req, res) {
	if (!req.body.password || !req.body.username) {
		res.status(400)
		res.send('Missing username or password')
		res.end()
		return
	}

	const { collection, client } = await useDB('users')

	const check = await collection.findOne({ username: req.body.username })

	if (check) {
		res.status(403)
		res.send('Username already exists')
		res.end()
		return
	}

	// hashing password
	const saltRounds = 10 // 2^10 = 1024 rounds of hashing (more rounds = more secure)
	const hash = await bcrypt.hash(req.body.password, saltRounds)

	try {
		const result = await collection.findOneAndUpdate(
			{ createdAt: Date.now() },
			{
				$set: {
					username: req.body.username,
					password: hash,
				},
			},
			{ returnDocument: 'after', upsert: true }
		)

		res.status(201)
		res.json(result.value)
		res.end()
	} catch (error) {
		console.log('Create user error', error)
		res.status(500)
		res.end()
	} finally {
		client.close()
	}

	// const { collection, client } = await useDB('users')

	// try {
	// 	const hashedPassword = createHash('sha256')
	// 		.update(req.body.password)
	// 		.digest('hex')

	// 	const user = {
	// 		...req.body,
	// 		password: hashedPassword,
	// 		image: { ...req.file },
	// 	}

	// 	const result = await collection.findOneAndUpdate(
	// 		{ createdAt: Date.now() },
	// 		{ $set: user },
	// 		{ returnDocument: 'after', upsert: true }
	// 	)

	// 	client.close()

	// 	res.status(201)
	// 	res.json(result)
	// 	res.end()
	// } catch (error) {
	// 	console.log('Create user error', error)
	// 	res.status(500)
	// 	res.end()
	// }
}
