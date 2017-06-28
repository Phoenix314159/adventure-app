module.exports = {
    filterMultiDimArr : arr => {         //function to filter duplicate arrays from array
        return arr.filter(function (item) {
            if (!this.hasOwnProperty(item[1])) {
                return this[item[1]] = true
            }
            return false
        }, {})
    }
}
