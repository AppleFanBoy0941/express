import useDB from '../../database.js'
import { ObjectId } from 'mongodb'

export default async function deleteCheese(request, response) {
	const { collection, client } = await useDB('cheeses')
	const id = request.params.id

	if (ObjectId.isValid(id)) {
		const result = await collection.findOneAndDelete({ _id: ObjectId(id) })
		response.status(200)
		response.send(result.value)
		client.close()
	} else {
		response.status(400)
		response.send('Invalid ID')
		client.close()
	}

	// You can also use deleteMany, but be careful with that one – it will delete all documents that match the query
}
