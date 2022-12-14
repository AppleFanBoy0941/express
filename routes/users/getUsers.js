import useDB from '../../database.js'
import dotenv from 'dotenv'
import URLBuilder from '../../functions/URLBuilder.js'

dotenv.config()

export default async function getUsers(req, res) {
	const { collection, client } = await useDB('users')

	const id = req.params.id
	const limit = parseInt(req.query.limit || 2)
	const skip = parseInt(req.query.skip || 0)

	const query = id ? { _id: ObjectId(id) } : {}

	try {
		const users = await collection.find(query).limit(limit).skip(skip).toArray()
		const length = await collection.countDocuments()
		client.close()

		const nextLink =
			skip + limit >= length
				? null
				: process.env.HOST_ADDRESS +
				  `/api/v1/users?limit=${limit}&skip=${skip + limit}`

		const previousLink =
			skip === 0
				? null
				: process.env.HOST_ADDRESS +
				  `/api/v1/users?limit=${limit}&skip=${
						skip - limit < 0 ? 0 : skip - limit
				  }`

		const presentation = {
			count: length,
			next: nextLink,
			previous: previousLink,
			results: users.map(item => ({
				...item,
				url: URLBuilder('/users/', item._id),
			})),
		}

		res.status(200)
		res.json(id ? users[0] : presentation)
		res.end()
	} catch (error) {
		console.log('Get users error', error)
		res.status(500)
		res.end()
	}
}
