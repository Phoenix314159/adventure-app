angular.module('adventure').component('map', {
    templateUrl: './views/map.html',
    controllerAs: 'map',
    controller: function (mainService, uiGmapGoogleMapApi, $timeout) {
        let vm = this,
            newSearch = () => {
                vm.map.setCenter(mainService.map.center) // sets center of map when new search is activated
                vm.map.zoom = 6 // sets zoom of map when new search is activated
            }
        vm.map = mainService.map // initial map to display
        vm.showMap = false // heatmap is not initially shown
        vm.showLoad = false // loading spinner is initially hidden
        vm.menu = mainService.arr //gets select menu options from mainService
        vm.toggleMaps = () => { // function to toggle between showing heat map and point map
            vm.showMap = !vm.showMap
            vm.select()  // initiates new API search for coordinates depending on what element is selected
        }

        uiGmapGoogleMapApi.then(res => { // need to wait for the google maps object to come back in mainService
            let buildMarkerArray = mainService.buildMarkerArray,
                buildHeatArray = mainService.buildHeatArray
            vm.initMap = mainService.initMap
            vm.coinOptions = mainService.coinOptions
            vm.keyOptions = mainService.keyOptions
            vm.cPrizeOptions = mainService.cPrizeOptions
            vm.select = () => { // function to display marker type depending on selected element
                switch (vm.selected) {
                    case 'Coins':
                        vm.getCoins()
                        break
                    case 'Keys':
                        vm.getKeys()
                        break
                    case 'Cinemark Prizes':
                        vm.getCPrize()
                        break
                }
            }
            vm.getCoins = () => {
                vm.coinMarkers = [] // array to store marker coordinates
                vm.coinId = [] // every marker needs a unique id
                vm.cPointsHeat = [] // array to store heat map points
                vm.showLoad = true // show loading spinner for 3 seconds
                newSearch() // initiate new search
                mainService.getCoins().then(res => {  // executes API call to get coin coordinate data
                    vm.coinPoints = res.data // array from server containing coin coordinate data
                    $timeout(() => { // show loading spinner for 2 seconds until points drop
                        vm.showLoad = false
                        buildMarkerArray(vm.coinPoints, vm.coinMarkers, vm.coinId) // builds array of coin coordinates
                        buildHeatArray(vm.coinPoints, vm.cPointsHeat) // builds array of heat map points
                        vm.initMap(vm.cPointsHeat) //initiates heat map
                    }, 2000)
                })
            }
            vm.getKeys = () => {
                vm.keyMarkers = [] // array to store marker coordinates
                vm.keyId = [] // every marker needs a unique id
                vm.keyPointsHeat = [] // array to store heat map points
                vm.showLoad = true // show loading spinner
                newSearch() // initiate new search
                mainService.getKey().then(res => {  // executes API call to get key coordinate data
                    vm.keyPoints = res.data // array from server containing key coordinate data
                    $timeout(() => { // show loading spinner for 2 seconds until points drop
                        vm.showLoad = false
                        buildMarkerArray(vm.keyPoints, vm.keyMarkers, vm.keyId) //calls function from api component to build array of key coordinates
                        buildHeatArray(vm.keyPoints, vm.keyPointsHeat) //builds array of heat map points
                        vm.initMap(vm.keyPointsHeat) //initiates heat map
                    }, 2000)
                })
            }
            vm.getCPrize = () => {
                vm.cpMarkers = [] // array to store marker coordinates
                vm.cpId = [] // every marker needs a unique id
                vm.cPrizePointsHeat = [] //array to store heat map points
                vm.showLoad = true // show loading spinner
                newSearch() // initiate new search
                mainService.getCPrize().then(res => { //executes API call to get cinemark prize coordinate data
                    vm.cPrizePoints = res.data // array from server containing cinemark prize coordinate data
                    $timeout(() => { // show loading spinner for 2 seconds until points drop
                        vm.showLoad = false
                        buildMarkerArray(vm.cPrizePoints, vm.cpMarkers, vm.cpId) // builds array of cinemark prize coordinates
                        buildHeatArray(vm.cPrizePoints, vm.cPrizePointsHeat) //builds array of heat map points
                        vm.initMap(vm.cPrizePointsHeat) //initiates heat map
                    }, 2000)
                })
            }
        })
    }
})
