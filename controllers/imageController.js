const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9add78bead634da6827bde4122a32b26'
   });

const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data);
    }).catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req,res,db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1).returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    }).catch(err => res.status(400).json('unble to get entries'));
}

module.exports = {
    handleImage,
    handleAPICall,
};