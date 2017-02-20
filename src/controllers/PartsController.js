
function PartsController($scope, scPartsCollection) {
    $scope.message = 'Hello World!';
    $scope.partsList = [];

    $scope.loadPartsList = function() {
        scPartsCollection.then( (collection) => {
            return collection.findMany();
        })
        .then(results => {
            $scope.partsList = results;
            $scope.$apply();
        });
    };

    $scope.numpadClick = function (key) {
        alert(key);
    }

    $scope.loadPartsList();
}

module.exports = PartsController;
