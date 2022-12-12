import useDB from '../../database.js'

export default async function createCheese(request, response) {
	const { collection, client } = await useDB('cheeses')

	try {
		const document = {
			...request.body,
			image: { ...request.file },
		}

		const result = await collection.findOneAndUpdate(
			{ createdAt: Date.now() },
			{ $set: document },
			{ returnDocument: 'after', upsert: true }
		)

		// if more than one, use insertMany – has to be array

		console.log(
			`New listing created with the following id: ${result.insertedId}`
		)
		console.log(request.file)
		client.close()
		response.status(201)
		response.json(result)
		response.end()
	} catch (error) {
		console.log('Create cheese error', error)
		response.status(500)
		response.end()
	}
}
