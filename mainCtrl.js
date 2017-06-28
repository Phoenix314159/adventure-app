const axios = require('axios')

let filterMultiDimArr = arr => { //function to filter duplicate arrays from array
    return arr.filter(function (item) {
        if (!this.hasOwnProperty(item[1])) {
            return this[item[1]] = true
        }
        return false
    }, {})
}
module.exports = {
    port: 3070,
    getCoins: (req, res) => {
        axios({                     //make API call
            method: 'get',
            url: 'https://staging.seek.fit/api/challenge/?loot_type=5'
        }).then(resp => {
            let data = resp.data.features[0].geometry.coordinates,
                filteredData = filterMultiDimArr(data) //filter data when it comes back
            res.status(200).json(filteredData)  //shoot to front-end
        })
    },
    getKeys: (req, res) => {
        axios({
            method: 'get',
            url: 'https://staging.seek.fit/api/challenge/?loot_type=4'
        }).then(resp => {
            let data = resp.data.features[0].geometry.coordinates,
                filteredData = filterMultiDimArr(data)
            res.status(200).json(filteredData)
        })
    },
    getCPrizes: (req, res) => {
        axios({
            method: 'get',
            url: 'https://staging.seek.fit/api/challenge/?loot_type=637'
        }).then(resp => {
            let data = resp.data.features[0].geometry.coordinates,
                filteredData = filterMultiDimArr(data)
            res.status(200).json(filteredData)
        })
    },
    fileArr: ['/dist',
        '/node_modules/angular/',
        '/node_modules/lodash/',
        '/node_modules/angular-google-maps/dist/',
        '/node_modules/angular-simple-logger/dist/',
        '/node_modules/angular-spinkit/build/',
        '/node_modules/jquery/dist',
        '/node_modules/bootstrap/dist/js/',
        '/node_modules/bootstrap/dist/css/']
}
