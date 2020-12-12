const express = require('express')
const bodyparser = require('body-parser')
const gtts = require('gtts.js').gTTS

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    const text = req.body.text

    const speech = new gtts(text)

    speech.save("output.mp3")
    .then(function () {
        res.download("output.mp3")
    })
    .catch(function(err) {
        console.log(err)
    })
})

app.listen(5000, function () {
    console.log("Server is listening on Port 5000")
})