// LOTTERY CONTROLLER

var lotteryController = (function(){

    var lotteryArr = [];
    var percentOddsForEachTradeMade = 3;
    
    // set the default odds for bottom-5 finishers (ie. based on standings)
    function setDefaultOdds() {
        managersArr.forEach(function(curObj) {
            var defaultOdds = startingOdds[curObj.lastYearRank - 1];
            curObj.percentage = defaultOdds;
        });
    }

    // finds the amount by which to scale the default odds, to account for the new odds from trades
    function findOddsScale() {
        var aggregatePercent = 0;
        managersArr.forEach(function(curObj){
            var currentTradeOdds = curObj.trades * percentOddsForEachTradeMade;
            aggregatePercent += currentTradeOdds;
        });
        var scalePercentage = (100 - aggregatePercent) / 100;
        return scalePercentage;
    }

    function removePickFromArray(pickedName) {
        lotteryArr = lotteryArr.filter(name => name !== pickedName);
    }

    // generate random number between from 0 to 99
    function pickLotteryBall(arr) {
        // first generate a random number according to the arr length
        var randIndex = Math.floor(Math.random() * arr.length);
        var pickedName = arr[randIndex];
        console.log(pickedName + " was chosen!");
        // reset lotteryArr to remove winner
        removePickFromArray(pickedName);

        // RECALCULATE PERCENTAGES
        var newLotteryArrLength = lotteryArr.length;

        // get arr showing unique remaining names
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        var uniqueArr = lotteryArr.filter(onlyUnique);

        // for each name in uniqueArr, calculate new percentage
        function countNameOccurences(arr, nm) {
            var nameNum = (arr.filter(el => el === nm)).length;
            return nameNum;
        }
        for(let i = 0; i < uniqueArr.length; i++) {
            var manager = uniqueArr[i];
            // count the number of times the name occurs in the new (with winner removed) lotteryArr
            var occurences = countNameOccurences(lotteryArr, manager);
            // get the percentage of occurences out of total array length
            var adjustedOdds = Math.round(occurences / newLotteryArrLength * 100);
            console.log(manager + " now has a " + adjustedOdds + "% chance of winning.");
        }
        
    }

    
    return {
        calculateStartingOdds: function() {
            setDefaultOdds();
            var oddsScale = findOddsScale();
            managersArr.forEach(function(curObj){
                // calculate manager's trade odds
                var tradeOdds = curObj.trades * percentOddsForEachTradeMade;
                // scale initial odds
                var scaledInitialOdds = Math.round(curObj.percentage * oddsScale);
                // make the new percentage the sum of scaled odds + trade odds
                curObj.percentage = tradeOdds + scaledInitialOdds;
            });
        },
        createLotteryArray: function() {
            // loop through managers to add their respective "lottery balls" to the lotteryArr
            managersArr.forEach(function(curObj){
                // first ensure  manager has any odds of winning
                if(curObj.percentage > 0) {
                    // add the manager's name to the array as many times as their percentage number
                    for(let i = 0; i < curObj.percentage; i++) {
                        lotteryArr.push(curObj.name);
                    }
                }
            });
        
        },
        executeLottery: function(){
            pickLotteryBall(lotteryArr);
        }
        
    };
}());