const axios = require('axios'),
    filter = require('../services/filterMulti'),
    config = require('../config/config');

module.exports = {

    getAllPrizes: (req, res) => {
        axios.all([
            axios.get(`${config.url}/${config.arr[0]}`),
            axios.get(`${config.url}/${config.arr[1]}`),
            axios.get(`${config.url}/${config.arr[2]}`)
        ])
            .then(axios.spread((coinRes, keyRes, cPrizeRes) => {
                let arr1 = filter.filterMultiDimArr(coinRes.data.features[0].geometry.coordinates),  // keep coordinates separate
                    arr2 = filter.filterMultiDimArr(keyRes.data.features[0].geometry.coordinates),
                    arr3 = filter.filterMultiDimArr(cPrizeRes.data.features[0].geometry.coordinates);
              res.status(200).json({  //shoot to front-end
                    coinData: arr1,
                    keyData: arr2,
                    cPrizeData: arr3
                })
            }))
    }
}
