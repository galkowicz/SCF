'use strict';

var app = angular.module('myApp', ['ngSanitize']);


app.controller('SoundCloud', ['$http', '$scope', function ($http, $scope) {
    SC.initialize({
        client_id: 'd652006c469530a4a7d6184b18e16c81'
    });


    var page_size = 6;

    $scope.showResults = function (search){
        console.log("searching...");
        var searchString = 'http://api.soundcloud.com/tracks.json?client_id=d652006c469530a4a7d6184b18e16c81&q='+search+'';
        $http({
            method: 'GET',
            url: searchString,
            params: {limit: page_size}//, linked_partitioning: 1 }

        }).then(function successCallback(response) {
            var songs = [];
            response.data.forEach(function (element, index, array) {
                songs.push(element);
            });
            console.log("the response---------------------: "+ response.data);
            $scope.songs = songs;
            //console.log(songs);

        }, function errorCallback(response) {
            console.log("err");
            console.log(response);
        });


    }
    var currentSongIndex = 0;
    $scope.showImg = function (index) {
        $scope.img = $scope.songs[index].artwork_url;
        currentSongIndex = index;
        //console.log(index);
    }

    $scope.showWidget = function () {
        var track_url = $scope.songs[currentSongIndex].permalink_url;
        SC.oEmbed(track_url, {auto_play: true}).then(function (oEmbed) {
            console.log('oEmbed response: ', oEmbed.html);
            angular.element(document.getElementById('widget')).append(oEmbed.html);
           //angular.element(document.getElementById('widger')).replace(oEmbed.html);
            //TODO make the widget replace the old one and not append

        });
    }
    $scope.nextResults = function () {

    }

}]);


app.controller('searchController', function($scope) {

        $scope.search = "Search";
        $scope.data = [];
        $scope.submitForm = function(search) {
            $scope.data.push(search);
            console.log("searching... and pushing");
         };
    });


app.controller('saveHistory', function($scope) {

    $scope.itmes = [];
    $scope.addToHistory = function(search) {
        $scope.itmes.push(search);
        console.log("adding to history");
        console.log("history data: "+$scope.itmes);
    };
});

