// GLOBAL APP CONTROLLER
var controller = (function(lottCtrlr, UICtrlr){

    var setUpEventListeners = function() {

        // HOVER ODDS CARDS
        $(".odds-panel__card").hover(function(){
            $(this).toggleClass("active");
        });

        // EXECUTE LOTTERY
        $(".btn").click(function(){
            console.log("button clicked!");
        });
    };

    return {
        init: function() {
            console.log("Application has started");
            lottCtrlr.initialiseLottery();
            UICtrlr.generateOddsCards(managersArr);
            setUpEventListeners();
            // lottCtrlr.executeLottery();
        }
    };

}(lotteryController, UIController));