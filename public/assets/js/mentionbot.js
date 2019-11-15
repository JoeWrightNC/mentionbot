$( document ).ready(function() {
    $("#Mention").on("click", function() {
        console.log("click")
        $(".mentionCard").hide();
        $(".Mention").show()
    })

    $("#Reprint").on("click", function() {
        console.log("click")
        $(".mentionCard").hide();
        $(".Reprint").show()
    })

    $("#Bigtime").on("click", function() {
        console.log("click")
        $(".mentionCard").hide();
        $(".Bigtime").show()
    })

    $("#Cringeworthy").on("click", function() {
        console.log("click")
        $(".mentionCard").hide();
        $(".Cringeworthy").show()
    })
});
