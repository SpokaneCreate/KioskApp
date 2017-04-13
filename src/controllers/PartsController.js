
function PartsController($scope, scPartsCollection) {
    $scope.message = 'Hello World!';
    $scope.partsList = [];
    $scope.searchText = "";

    $scope.partsContainer = {
        values: {},
        add: function(type, part) {
            if (!this.values[type]) {
                this.values[type] = [];
            }
            this.values[type].push(part);
        }
    };

    $scope.includesAll = function(part, key) {
        return $scope.searchText.split(" ")
        .reduce( (accumulation, piece) => {
            return accumulation && part[key].toLowerCase().includes(piece.toLowerCase());
        }, true);
    };

    $scope.search = function(part, index, array) {
        return Object.keys(part).filter( (key) => {
            return key != "_id";
        })
        .reduce( (accumulation, key) => {
            return accumulation || $scope.includesAll(part, key);
        }, false);
    };

    $scope.loadPartsList = function() {
        scPartsCollection.then( (collection) => {
            return collection.findMany();
        })
        .map(result => {
            $scope.partsContainer.add(result.type, result);
        })
        .then( () => {
            console.log($scope.partsContainer.values);
            $scope.$apply();
        });
    };

    $scope.numpadClick = function (key) {
        alert(key);
    }

    $scope.loadPartsList();
}

module.exports = PartsController;
