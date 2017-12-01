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
    const getGoogleMap = async () => {
      await uiGmapGoogleMapApi// need to wait for the google maps object to come back in mainService
      const res = await mainService.getAllPrizes() // executes API call to get all prize coordinate data
      vm.select = () => { // function to display marker type depending on selected element
        vm.coinPoints = res.data.coinData // arrays from server containing coordinate data
        vm.keyPoints = res.data.keyData
        vm.cPrizePoints = res.data.cPrizeData
        let buildMarkerArray = mainService.buildMarkerArray,
          buildHeatArray = mainService.buildHeatArray

        vm.initMap = mainService.initMap // initialize heat map when ready
        vm.coinOptions = mainService.coinOptions
        vm.keyOptions = mainService.keyOptions
        vm.cPrizeOptions = mainService.cPrizeOptions

        vm.coinMarkers = [] // array to store coin marker coordinates
        vm.coinId = [] // array to store coin marker ids
        vm.cPointsHeat = [] // array to store coin heat map points
        vm.keyMarkers = [] // array to store key marker coordinates
        vm.keyId = [] // array to store key marker ids
        vm.keyPointsHeat = [] // array to store key heat map points
        vm.cpMarkers = [] // array to store cinemark prize marker coordinates
        vm.cpId = [] // array to store cinemark prize marker ids
        vm.cPrizePointsHeat = [] //array to store cinemark prize heat map points
        vm.showLoad = true // show loading spinner

        vm.toggleMaps = () => { // function to toggle between showing heat map and point map
          vm.showMap = !vm.showMap
          vm.select()  // initiates new API search for coordinates depending on what element is selected
        }
        vm.getCoins = () => {
          $timeout(() => {
            vm.showLoad = false // 2 seconds after search, loading spinner will be hidden
            newSearch()
            buildMarkerArray(vm.coinPoints, vm.coinMarkers, vm.coinId) // builds array of coin coordinates
            buildHeatArray(vm.coinPoints, vm.cPointsHeat) // builds array of heat map points
            vm.initMap(vm.cPointsHeat) //initiates heat map
          }, 2000)
        }
        vm.getKeys = () => {
          $timeout(() => {
            vm.showLoad = false
            newSearch()
            buildMarkerArray(vm.keyPoints, vm.keyMarkers, vm.keyId) //calls function from api component to build array of key coordinates
            buildHeatArray(vm.keyPoints, vm.keyPointsHeat) //builds array of heat map points
            vm.initMap(vm.keyPointsHeat) //initiates heat map
          }, 2000)
        }
        vm.getCPrize = () => {
          $timeout(() => {
            vm.showLoad = false
            newSearch()
            buildMarkerArray(vm.cPrizePoints, vm.cpMarkers, vm.cpId) // builds array of cinemark prize coordinates
            buildHeatArray(vm.cPrizePoints, vm.cPrizePointsHeat) //builds array of heat map points
            vm.initMap(vm.cPrizePointsHeat) //initiates heat map
          }, 2000)
        }
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

    }
    getGoogleMap()
  }
})


