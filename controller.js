// GLOBAL APP CONTROLLER
var controller = (function(lottCtrlr, UICtrlr){

    var setUpEventListeners = function() {

        // HOVER ODDS CARDS
        $(".odds-panel__card").hover(function(){
            $(this).toggleClass("active");
        });

        // EXECUTE LOTTERY
        $(".btn").click(function(){
            executeLottery();
        });
        $(".reset-btn").click(function(){
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
    }

    function resetLottery() {
        // 1. remove names from results cards
        UICtrlr.resetResultsCards();
        // 2. reset lottery array
        // 3. reset odds cards
        // 4. reset current pick
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