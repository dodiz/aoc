"use strict";
exports.__esModule = true;
var input_1 = require("./input");
console.time("execution_time: ");
var treeGrid = input_1.input.split("\n").map(function (r) { return r.split("").map(function (h) { return +h; }); });
function calcIsVisible(row, column) {
    var height = treeGrid[row][column];
    var isTopVisible = 0, isBottomVisible = 0, isLeftVisible = 0, isRightVisible = 0;
    for (var i = row - 1; i >= 0; i--) {
        if (height > treeGrid[i][column])
            isTopVisible++;
        else {
            isTopVisible++;
            break;
        }
    }
    for (var i = row + 1; i < treeGrid.length; i++) {
        if (height > treeGrid[i][column])
            isBottomVisible++;
        else {
            isBottomVisible++;
            break;
        }
    }
    for (var i = column - 1; i >= 0; i--) {
        if (height > treeGrid[row][i])
            isLeftVisible++;
        else {
            isLeftVisible++;
            break;
        }
    }
    for (var i = column + 1; i < treeGrid[row].length; i++) {
        if (height > treeGrid[row][i])
            isRightVisible++;
        else {
            isRightVisible++;
            break;
        }
    }
    return isLeftVisible * isRightVisible * isTopVisible * isBottomVisible;
}
var maxScenicScore = 0;
for (var i = 1; i < treeGrid.length; i++) {
    for (var j = 1; j < treeGrid[i].length; j++) {
        var scenicScore = calcIsVisible(i, j);
        if (scenicScore > maxScenicScore)
            maxScenicScore = scenicScore;
    }
}
console.log(maxScenicScore);
console.timeEnd("execution_time: ");
