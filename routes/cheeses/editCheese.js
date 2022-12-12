import useDB from '../../database.js'
import { ObjectId } from 'mongodb'
import { unlink } from 'node:fs/promises'

export default async function editCheese(request, response) {
	const { collection, client } = await useDB('cheeses')
	const id = request.params.id
	const updates = request.body

	try {
		let document = {}
		let oldResult = {}

		if (!request.file) {
			document = { ...request.body }
		} else {
			document = {
				...request.body,
				image: { ...request.file },
			}

			oldResult = await collection.findOne({ _id: ObjectId(id) })
			await unlink(`${oldResult.image.path}`)
		}

		if (ObjectId.isValid(id)) {
			const result = await collection.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{ $set: document },
				{ returnDocument: 'after' }
			)

			response.status(200)
			response.json(result)
			response.end()
		} else {
			response.status(400)
			response.send('Invalid ID')
			response.end()
		}
		client.close()
	} catch (error) {
		response.status(500)
		response.send('Something went wrong')
	}
}
