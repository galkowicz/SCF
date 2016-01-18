app.controller('MainCtrl', ['$http', '$scope','$localStorage', function ($http, $scope, $localStorage) {
    SC.initialize({
        client_id: 'd652006c469530a4a7d6184b18e16c81'
    });
    $scope.$storage = $localStorage.$default({
        recents: []
    });
    $scope.tile = true;
    $scope.showResults = function (search){
        $scope.$storage.recents.unshift(search);
        $scope.startIndex = 0;
        $scope.pageNum=0;


        if ($scope.$storage.recents.length > 5) {
            $scope.$storage.recents.splice(5,1);
        }
        console.log($scope.$storage);
        console.log("searching...");
        var searchString = 'http://api.soundcloud.com/tracks.json?client_id=d652006c469530a4a7d6184b18e16c81&q='+search+'&limit=50';
        $http({
            method: 'GET',
            url: searchString

        }).then(function successCallback(response) {
            var songs = [];
            response.data.forEach(function (element, index, array) {
                songs.push(element);
            });
            //console.log(response);
            $scope.songs = songs;
            console.log(songs);
            $scope.arrSize = songs.length;
        }, function errorCallback(response) {
            console.log("err");
            console.log(response);
        });


    }
    var currentSongIndex = 0;
    $scope.showImg = function (index) {
        $scope.img = $scope.songs[index].artwork_url;
        currentSongIndex = index;
    }

    $scope.showWidget = function () {

        var track_url = $scope.songs[currentSongIndex].permalink_url;

        SC.oEmbed(track_url, {auto_play: true,maxheight: 100, maxwidth: 300}).then(function (oEmbed) {
            angular.element(document.getElementById('widget')).html(oEmbed.html);

        });

    }

    $scope.size = 6;
    $scope.startIndex = 0;
    $scope.nextResults = function () {
        console.log($scope.startIndex);
        $scope.startIndex += $scope.size;

        if ($scope.startIndex >= ($scope.arrSize) ) {
            $scope.startIndex = 0;
            $scope.pageNum=0;
        }
        $scope.pageNum+= 1;

    }
    $scope.fade =  function (btnElement) {
        if (btnElement.value === "Fade Out") {
            document.getElementById("myImg").className = "fade-out";
            btnElement.value = "Fade In";
        }
        else {
            document.getElementById("myImg").className = "fade-in";
            btnElement.value = "Fade Out";
        }
    }

}]);
