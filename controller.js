// GLOBAL APP CONTROLLER
var controller = (function(lottCtrlr, UICtrlr){

    var setUpEventListeners = function() {

        // HOVER ODDS CARDS
        $(".odds-panel__card").hover(function(){
            $(this).toggleClass("active");
        });

        // EXECUTE LOTTERY
        $(".btn").click(function(){

        });
    };

    return {
        init: function() {
            console.log("Application has started");
            setUpEventListeners();
            lottCtrlr.calculateStartingOdds();
            lottCtrlr.createLotteryArray();
            lottCtrlr.executeLottery();
        }
    };

}(lotteryController, UIController));