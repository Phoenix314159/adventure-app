const mainCtrl = require('../controllers/mainCtrl');

module.exports = app => {
    app.get('/api/allprizes', mainCtrl.getAllPrizes);
}
