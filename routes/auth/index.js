import token from './token.js'

export default function auth(app) {
	app.route('/auth/token').post(token)
}
