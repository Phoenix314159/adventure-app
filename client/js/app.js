import config from './../../config/config';

angular.module('adventure', ['uiGmapgoogle-maps', 'angular-spinkit'])
    .config(['uiGmapGoogleMapApiProvider','$qProvider', function (GoogleMapApi, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        GoogleMapApi.configure({
            key: config.api_key,
            v: '3.29',
            libraries: 'visualization'
        })
    }])





