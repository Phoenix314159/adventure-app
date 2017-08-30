const express = require('express'),
    scriptsArray = require('./services/fileArray'),
    config = require('./config/config'),
    app = express();

scriptsArray.fileArr.map(file => {
    app.use(express.static(__dirname + file));
})

require('./middleware/middleware')(app);
require('./routes/getAllPrizes')(app);

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
