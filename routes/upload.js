const routes = require('express').Router();
const imgUpload = require('../modules/imgUpload')
const vision = require('@google-cloud/vision')

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})

routes.post('/', imgUpload.multer.single('photo'), imgUpload.sendUploadToGCS, async (req, res) => {
  try {
    let results = await client.labelDetection(req.file.cloudStoragePublicUrl)
    const labels = results[0].labelAnnotations;
    const labelName = labels.map(label => label.description)
    res.status(201).json({
      labels: labelName,
      imagePath: req.file.cloudStoragePublicUrl
    })
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = routes