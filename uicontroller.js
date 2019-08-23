// UI Controller
var UIController = (function(){

    // DOM strings
    var DOMstrings = {
        oddsPanel: ".odds-panel"
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
        html = '<div class="odds-panel__card"><div class="odds-panel__card--name"><span class="firstname">%firstName%</span> <br> <span class="lastname">%lastName%</span></div><div class="odds-panel__card--info-box"><div class="rank"><img src="./css/icons/podium-black.svg" class="icon-black"><img src="./css/icons/podium-white.png" class="icon-white"><p class="rank-num">%rank%</p></div><div class="trades"><img src="./css/icons/trade-black.svg" class="icon-black"><img src="./css/icons/trade-white.png" class="icon-white"><p class="trade-num">%trades%</p></div></div><div class="odds-panel__card--percentage">%percentage%</div></div>';
        
        // replace the placeholder text with actual data
        newHtml = html.replace("%firstName%", obj.firstName);
        newHtml = newHtml.replace("%lastName%", obj.lastName);
        newHtml = newHtml.replace("%rank%", getOrdinalString(obj.lastYearRank));
        newHtml = newHtml.replace("%trades%", obj.trades);
        newHtml = newHtml.replace("%percentage%", percentageString);

        // insert the HTML into the DOM
        $(DOMstrings.oddsPanel).prepend(newHtml);

    }
    

    return {
        generateOddsCards: function(arr){
            arr.forEach(function(curr){
                if(curr.percentage > 0) {
                    createOddsCard(curr);
                }
            });
        }
    };
}());