import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

export default async function useDB(collectionName) {
	await client.connect()
	console.log('Connected successfully to server')

	const db = client.db('Ostebiks')
	const collection = db.collection(collectionName)

	return { collection, client }
}
