const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
  apiKey: '4453450345e64befb66bcedaaad0cb6d'
});

const handleImageURL = (req, res) => {
	clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	}).catch(err => res.status(400).json('failed fetching data'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleImageURL
};