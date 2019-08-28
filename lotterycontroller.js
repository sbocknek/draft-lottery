// LOTTERY CONTROLLER

var lotteryController = (function(){

    var lotteryArr = [];
    var draftOrderArr = [];

    // the array that will ultimately serve as the "lottery ball cannister"
    // var lotteryArr = [];
    // the number of percent odds granted for each trade made
    var percentOddsForEachTradeMade = 2;
    
    // set the default odds for bottom-5 finishers (ie. based on standings)
    function setDefaultOdds() {
        managersArr.forEach(function(curObj) {
            var defaultOdds = initialOddsBasedOnPrevRank[curObj.lastYearRank - 1];
            curObj.percentage = defaultOdds;
        });
    }

    // finds the amount by which to scale the default odds, to account for the new odds from trades
    function findOddsScale(arr) {
        var aggregatePercent = 0;
        arr.forEach(function(curObj){
            var currentTradeOdds = curObj.trades * percentOddsForEachTradeMade;
            aggregatePercent += currentTradeOdds;
        });
        var scalePercentage = (100 - aggregatePercent) / 100;
        return scalePercentage;
    }

    function calculateStartingOdds() {
        setDefaultOdds();
        var oddsScale = findOddsScale(managersArr);
        managersArr.forEach(function(curObj){
            // calculate manager's trade odds
            var tradeOdds = curObj.trades * percentOddsForEachTradeMade;
            // scale initial odds
            var scaledInitialOdds = Math.round(curObj.percentage * oddsScale);
            // make the new percentage the sum of scaled odds + trade odds
            curObj.percentage = tradeOdds + scaledInitialOdds;
        });
    }

    function generateLotteryArray() {
        // loop through managers to add their respective "lottery balls" to the lotteryArr
        managersArr.forEach(function(curObj){
            // first ensure  manager has any odds of winning
            if(curObj.percentage > 0) {
                // add the manager's object to the array as many times as their percentage number
                for(let i = 0; i < curObj.percentage; i++) {
                    lotteryArr.push(curObj);
                }
            }
        });
    }
    
    return {
        currentPick: 1,
        initialiseLottery: function() {
            calculateStartingOdds();
            generateLotteryArray();
        },

        pickLotteryBall: function() {
        // first generate a random number according to the arr length
        var randIndex = Math.floor(Math.random() * lotteryArr.length);
        var pickedObj = lotteryArr[randIndex];
        // add the chosen manager to the draft order array
        draftOrderArr.push(pickedObj.fullName);
        // return the chosen lottery ball object to the main controller
        return pickedObj;
        },

        removeWinnerFromLotteryArr: function(winnerObj) {
            var filteredArr = lotteryArr.filter(pickedObj => pickedObj.fullName !== winnerObj.fullName);
            lotteryArr = filteredArr;
        },

        updatePercentages: function() {
            var uniqueArr = [];
            // a function for filtering the lottery array into unique values (only one object per manager)
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }
            uniqueArr = lotteryArr.filter(onlyUnique);
            // for each unique manager, recalc and update his obj percentage
            uniqueArr.forEach(function(cur) {
                var objCount = (lotteryArr.filter(el => el === cur)).length;
                var newPerc = Math.round(objCount / lotteryArr.length * 100);
                cur.percentage = newPerc;
            });
            // based on the newly updated percentage property, reset and repopulate lotteryArr
            lotteryArr = [];
            uniqueArr.forEach(function(cur) {
                for(i = 0; i < cur.percentage; i++) {
                    lotteryArr.push(cur);
                }
            });
        },
        resetArrays: function() {
            lotteryArr = [];
            draftOrderArr = [];
            calculateStartingOdds();
            generateLotteryArray();
        },
        completeDraftOrder: function() {
            // loop through managers array backwards
            for (i = managersArr.length - 1; i >= 0; i--) {
                var currentManagerFullName = managersArr[i].fullName;
                // check if the current manager is already in the draft order
                if(draftOrderArr.indexOf(currentManagerFullName) < 0) {
                    // if not, add him
                    draftOrderArr.push(currentManagerFullName);
                }
            }
            return draftOrderArr;
        },

        getLotteryArr: function() {
            return lotteryArr;
        },
        getDraftOrderArr: function() {
            return draftOrderArr;
        }
    };
}());



// // get arr showing unique remaining objects
        // function onlyUnique(value, index, self) {
        //     return self.indexOf(value) === index;
        // }
        // var uniqueArr = lotteryArr.filter(onlyUnique);
        // updatePercentages(uniqueArr);

        // uniqueArr.forEach(function(curObj){
        //     var manager = curObj;
        //     var managerName = curObj.fullName;
        //     // count the number of times the name occurs in the new (with winner removed) lotteryArr
        //     var occurences = countNameOccurences(lotteryArr, managerName);
        //     // get the percentage of occurences out of total array length
        //     var adjustedOdds = Math.round(occurences / lotteryArr.length * 100);
        //     manager.percentage = adjustedOdds;
        // });