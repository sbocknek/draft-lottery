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
    };

    function executeLottery() {
        var winner = lottCtrlr.pickLotteryBall();
        UICtrlr.addWinnerToResultsCard(winner, lottCtrlr.currentPick);
        UICtrlr.overlayOddsCard(winner, lottCtrlr.currentPick);
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