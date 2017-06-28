const express = require('express'),
    bodyParser = require('body-parser'),
    mainCtrl = require('./mainCtrl'),
    app = express(),
    cors = require('cors'),
    corsOptions = {
        origin: `http://localhost:${mainCtrl.port}`
    }

app.use(cors(corsOptions))
app.use(bodyParser.json())

mainCtrl.fileArr.map(file => {
    app.use(express.static(__dirname + file)) //iterates over array and loads middleware
})

app.get('/api/coins', mainCtrl.getCoins)
app.get('/api/keys', mainCtrl.getKeys)
app.get('/api/cprizes', mainCtrl.getCPrizes)

app.listen(mainCtrl.port, () => {
    console.log(`listening on port ${mainCtrl.port}`)
})
