var app = angular.module('albumApp', ['ngRoute', 'ui.bootstrap']);
app.factory('albumService', function($http) {
    var albumObj = {};

    albumObj.albums = [];
    $http.get("albums.json").success(function(data) {
            albumObj.albums = data.results;
    });

    albumObj.get = function() {
        return albumObj.albums;
    }
    return albumObj;
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "list.html",
        controller: "listCtrl"
    })
    .when("/carousel", {
        templateUrl: "carousel.html",
        controller: "carouselCtrl"
    })
    .when("/grid", {
        templateUrl: "grid.html",
        controller: "gridCtrl"
    })
    .when("/lgAlbum/:id", {
        templateUrl: "lgAlbum.html",
        controller: "lgAlbumCtrl"
    })
    .otherwise({
        redirectTo: "/list.html"
    });
});

app.controller('listCtrl', function ($scope, albumService) {
        $scope.albums = albumService.get();
        for (var i = 1; i <= $scope.albums.length; i++) {
            $scope.albums[i - 1].id = i;
        }
});

app.controller('gridCtrl', function ($scope, albumService) {
        $scope.albums = albumService.get();
        for (var i = 1; i <= $scope.albums.length; i++) {
            $scope.albums[i - 1].id = i;
        } 
});

app.controller('carouselCtrl', function ($scope, albumService) {
    $scope.myInterval = 1000;
        $scope.albums = albumService.get();
        for (var i = 1; i <= $scope.albums.length; i++) {
            $scope.albums[i - 1].id = i;
        }
});

app.controller('lgAlbumCtrl', function ($scope, albumService, $routeParams) {
    albumService.fetchAlbumDetails().success(function(data) {
        var rawSource = data.results;
        $scope.albums = [];
        for (var i = 1; i <= rawSource.length; i++) {
            rawSource[i - 1].id = i;
            $scope.albums.push(rawSource[i - 1]);
        }

        $scope.album = $scope.albums[$routeParams.id - 1];
    });   
});
