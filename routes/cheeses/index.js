import getAllCheeses from './getAllCheeses.js'
import createCheese from './createCheese.js'
import authorization from '../../middlewares/auth.js'
import upload from '../../middlewares/upload.js'
import editCheese from './editCheese.js'
import deleteCheese from './deleteCheese.js'

export default function cheeses(app) {
	app
		.route('/api/v1/cheeses/:id?')
		.all(authorization)
		.patch(upload.single('image'), editCheese)
		.get(getAllCheeses)
		.post(upload.single('image'), createCheese)
		.delete(deleteCheese)
}
