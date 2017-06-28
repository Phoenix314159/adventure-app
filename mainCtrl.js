const axios = require('axios'),
    filter = require('./filterMulti')

module.exports = {
    port: 3070,
    getAllPrizes: (req, res) => {
        axios.all([
            axios.get('https://staging.seek.fit/api/challenge/?loot_type=5'), //make API call for coins
            axios.get('https://staging.seek.fit/api/challenge/?loot_type=4'), //make API call for keys
            axios.get('https://staging.seek.fit/api/challenge/?loot_type=637') //make API call for cinemark prizes
        ])
            .then(axios.spread((coinRes, keyRes, cPrizeRes) => {
                let coinData = coinRes.data.features[0].geometry.coordinates,
                    keyData = keyRes.data.features[0].geometry.coordinates,
                    cPrizeData = cPrizeRes.data.features[0].geometry.coordinates,
                    arr1 = filter.filterMultiDimArr(coinData),  // keep coordinates separate
                    arr2 = filter.filterMultiDimArr(keyData),
                    arr3 = filter.filterMultiDimArr(cPrizeData)
                res.status(200).json({  //shoot to front-end
                    coinData: arr1,
                    keyData: arr2,
                    cPrizeData: arr3
                })
            }))
    }
}
