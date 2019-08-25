// UI Controller
var UIController = (function(){

    // DOM strings
    var DOMstrings = {
        oddsPanel: ".odds-panel",
        resultsCardName: ".results__card--namebox-name",
        winnerNum: ".odds-panel__card--winner-num",
        oddsPanelCard: ".odds-panel__card",
        lotteryButton: ".app__left--btn"
    }

    function getOrdinalString(num) {
        var j = num % 10,
            k = num % 100;
        if (j == 1 && k != 11) {
            return num + "st";
        }
        if (j == 2 && k != 12) {
            return num + "nd";
        }
        if (j == 3 && k != 13) {
            return num + "rd";
        }
        return num + "th";
    }

    function createOddsCard(obj) {
        var percentageString = obj.percentage + "%";
        var html, newHtml;
        html = '<div class="odds-panel__card" id="%id%"><div class="odds-panel__card--winner-num"></div><div class="odds-panel__card--name"><span class="firstname">%firstName%</span> <br> <span class="lastname">%lastName%</span></div><div class="odds-panel__card--info-box"><div class="rank"><img src="./css/icons/podium-black.svg" class="icon-black"><img src="./css/icons/podium-white.png" class="icon-white"><p class="rank-num">%rank%</p></div><div class="trades"><img src="./css/icons/trade-black.svg" class="icon-black"><img src="./css/icons/trade-white.png" class="icon-white"><p class="trade-num">%trades%</p></div></div><div class="odds-panel__card--percentage">%percentage%</div></div>';
        
        // replace the placeholder text with actual data
        newHtml = html.replace("%firstName%", obj.firstName);
        newHtml = newHtml.replace("%lastName%", obj.lastName);
        newHtml = newHtml.replace("%rank%", getOrdinalString(obj.lastYearRank));
        newHtml = newHtml.replace("%trades%", obj.trades);
        newHtml = newHtml.replace("%percentage%", percentageString);
        newHtml = newHtml.replace("%id%", obj.lastYearRank);

        // insert the HTML into the DOM
        $(DOMstrings.oddsPanel).prepend(newHtml);

    }
    

    return {
        generateOddsCards: function(arr) {
            arr.forEach(function(curr) {
                if(curr.percentage > 0) {
                    createOddsCard(curr);
                }
            });
        },
        addWinnerToResultsCard: function(obj, currPick) {
            var winnerName = obj.fullName;
            var idSelectorString = "#results-" + currPick + " " + DOMstrings.resultsCardName;
            $(idSelectorString).html(winnerName);
        },
        overlayOddsCard: function(obj, currPick) {
            var idSelector = "#" + obj.lastYearRank;
            $(idSelector).addClass("winner");
            var winnerNumSelector = idSelector + " " + DOMstrings.winnerNum;
            $(winnerNumSelector).append(currPick);
        },
        updateOddsCardPercentages: function(arr) {
            arr.forEach(function(cur) {
                var newPercentage = cur.percentage;
                var selector = "#" + cur.lastYearRank + " .odds-panel__card--percentage";
                $(selector).html(newPercentage + "%");
            });
        },
        resetResultsCards: function() {
            $(DOMstrings.resultsCardName).html("");
        },
        resetOddsCards: function(refreshedLottArr) {
            $(DOMstrings.oddsPanelCard).removeClass("winner");
            $(DOMstrings.winnerNum).html("");
            this.updateOddsCardPercentages(refreshedLottArr);
        },
        makeBtnReset: function() {
            $(DOMstrings.lotteryButton).html("Reset");
        },
        makeBtnRoll: function() {
            $(DOMstrings.lotteryButton).html("Roll");
        },
        getDOMStrings: function() {
            return DOMstrings;
        }
    };
}());