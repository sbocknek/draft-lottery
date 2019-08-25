// GLOBAL APP CONTROLLER
var controller = (function(lottCtrlr, UICtrlr){

    var DOM = UICtrlr.getDOMStrings();

    var setUpEventListeners = function() {

        // HOVER ODDS CARDS
        $(".odds-panel__card").hover(function(){
            $(this).toggleClass("active");
        });

        // ROLL LOTTERY
        $(DOM.pickButton).click(function(){
            if(lottCtrlr.currentPick < 6) {
                executeLottery();
            }
        });

        // RESET LOTTERY
        $(DOM.resetButton).click(function() {
            resetLottery();
        });
    };

    function executeLottery() {
        var winner = lottCtrlr.pickLotteryBall();
        // 1. add name to results panel
        UICtrlr.addWinnerToResultsCard(winner, lottCtrlr.currentPick);
        // 2. replace odds card with pick number
        UICtrlr.overlayOddsCard(winner, lottCtrlr.currentPick);
        // 3. update lottery array to remove winner
        lottCtrlr.removeWinnerFromLotteryArr(winner);
        // 4. update lotteryArr with new odds
        lottCtrlr.updatePercentages();
        // 5. use new lotteryArr to change percentages in UI
        var latestLotteryArr = lottCtrlr.getLotteryArr();
        UICtrlr.updateOddsCardPercentages(latestLotteryArr);
        // 6. increment current pick
        lottCtrlr.currentPick++;
        // 7. if all five picks have been drawn, animate out the pick button
        if(lottCtrlr.currentPick === 6) {
            UICtrlr.hidePickButton();
            // finish remainder of draft lottery array
            var draftOrder = lottCtrlr.completeDraftOrder();
            // add draft order array to UI
            UICtrlr.populateDraftOrder(draftOrder);
        }
    }

    function resetLottery() {
        // 1. remove names from results cards
        UICtrlr.resetResultsCards();
        // 2. reset lottery array
        lottCtrlr.resetArrays();
        // 3. reset odds cards
        var refreshedLotteryArr = lottCtrlr.getLotteryArr();
        UICtrlr.resetOddsCards(refreshedLotteryArr);
        // 4. reset current pick
        lottCtrlr.currentPick = 1;
        // 5. make sure pick button is showing
        UICtrlr.showPickButton();
        // 6. clear draft order from UI
        UICtrlr.resetDraftOrder();
    }

    return {
        init: function() {
            console.log("Application has started");
            lottCtrlr.initialiseLottery();
            UICtrlr.generateOddsCards(managersArr);
            setUpEventListeners();
        }
    };

}(lotteryController, UIController));