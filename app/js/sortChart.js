angular.module('schort', [])
  .controller('sortController', function($scope) {
    $scope.name = 'N. Martin';
    $scope.testArray = [];

    // TODO: delete this
    console.log('here');

    // create a random array
    $scope.randomizer = function(set) {
      var num = parseInt(set);
      console.log(num);
      var arr = [],
        i, n;
      for (i = 0; i < num; i += 1) {
        arr.push(Math.ceil(Math.random() * num));
      }
      console.log('at random');
      $scope.testArray = arr;
    };

    // sorter function (insertion sort)
    $scope.sorter = function() {
      var i, j, x, n;
      var cnt = 0;
      for (i = 1, n = $scope.testArray.length; i < n; i += 1) {
        if ($scope.testArray[i] >= $scope.testArray[i - 1]) {
          cnt = cnt;
          continue;
        } else if ($scope.testArray[i] < $scope.testArray[i - 1]) {
          for (j = i; j > 0; j -= 1) {
            if ($scope.testArray[j] < $scope.testArray[j - 1]) {
              x = $scope.testArray[j];
              $scope.testArray.splice(j, 1);
              $scope.testArray.splice(j - 1, 0, x);
              cnt += 1;
              console.log($scope.testArray);
              $scope.plotter();
            } else {
              break;
            }
          }
        }
      }
    };

    // plot bar chart on canvas
    $scope.plotter = function() {
      drawBarChart($scope.testArray);
      var t = 10000000000;
      while (t >= 0) {
        t -= 1;
      }
    };

    //creating bar charts
    function drawBarChart(arr) {
      var chartContainer = document.getElementById("stage");
      document.getElementById("stage").innerHTML = "";
      //determine the array from the radio button that is checked
      var dataset = arr;

      var widthOfContainer = chartContainer.scrollWidth;
      var heightOfContainer = chartContainer.scrollHeight;
      //the width of the bar dependent on the size of array
      var widthOfBar = parseInt(widthOfContainer / dataset.length) - 2;

      if (typeof(dataset) !== 'object') {
        return;
      }

      //height of bar dependent on the maximum and minimum element in array
      var maxNumber = dataset[0];
      var minNumber = dataset[0];
      for (var i = 1; i < dataset.length; i++) {
        if (dataset[i] > maxNumber) {
          maxNumber = dataset[i];
        } else if (dataset[i] < minNumber) {
          minNumber = dataset[i];
        }
      }

      //create canvas element
      var canvasElement = document.createElement("canvas");
      //attributes of canvas element
      canvasElement.setAttribute("id", "myCanvas");
      //set styles
      canvasElement.width = widthOfContainer;
      canvasElement.height = heightOfContainer;

      var barCanvas = canvasElement;
      var context = barCanvas.getContext('2d');

      //loop to create each bar
      for (var j = 0; j < dataset.length; j++) {
        //variable to store the total height
        var totHeight = 0;
        //create height, width of rect
        var marginLeft = parseInt(j * 2 + j * widthOfBar);
        var height = 0;
        var width = parseInt(widthOfBar);
        var top = 0;
        if ((maxNumber + minNumber) > maxNumber) {
          totHeight = maxNumber;
          height = Math.abs((dataset[j] / totHeight) * heightOfContainer);
          top = parseInt(heightOfContainer - height);
        } else if ((maxNumber + minNumber) < maxNumber) {
          totHeight = maxNumber - minNumber;
          height = Math.abs((dataset[j] / totHeight) * heightOfContainer);
          if (dataset[j] < 0) {
            top = ((maxNumber / totHeight) * heightOfContainer);
          } else if (dataset[j] > 0) {
            top = heightOfContainer - (height - ((minNumber / totHeight) * heightOfContainer));
          }
        }

        context.fillStyle = '#3377BB';
        context.fillRect(marginLeft, top, width, height);
      }
      chartContainer.appendChild(canvasElement);
      document.getElementById("div3").innerHTML = "There's your Bar Chart";
    } //end of function drawBarChart
  });
