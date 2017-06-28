const express = require('express'),
    bodyParser = require('body-parser'),
    mainCtrl = require('./mainCtrl'),
    scriptsArray = require('./fileArray'),
    app = express(),
    cors = require('cors'),
    corsOptions = {
        origin: `http://localhost:${mainCtrl.port}`
    }

app.use(cors(corsOptions))
app.use(bodyParser.json())

scriptsArray.fileArr.map(file => {
    app.use(express.static(__dirname + file)) //iterates over array and loads middleware
})

app.get('/api/allprizes', mainCtrl.getAllPrizes)

app.listen(mainCtrl.port, () => {
    console.log(`listening on port ${mainCtrl.port}`)
})
