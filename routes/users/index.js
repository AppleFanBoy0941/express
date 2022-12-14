import createUser from './createUser.js'
import authorization from '../../middlewares/auth.js'
import getUsers from './getUsers.js'
import upload from '../../middlewares/upload.js'

export default function users(app) {
	app
		.route('/api/v1/users/:id?')
		.all(authorization)
		.get(getUsers)
		.post(upload.single('image'), createUser)
}
