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
    var Mennie = document.getElementById("pokeBot");
    Mennie.addEventListener("click", typeWriter)

    var i = 0;
    var txt = "Ommmmmm, Did you just poke me?  Say you're sorry and you can have your mentions back."; /* The text */
    var speed = 150; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
    if (i == 0) {
        document.getElementById("pokeText").innerHTML = ""
    }
    if (i < txt.length) {
        document.getElementById("pokeText").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    if (i == txt.length) {
        $("#mentionCard").hide();
        $("#sassyBot").html("<div class='col-12'><div class='d-flex align-content-center justify-content-center'><a href='/' class='btn btn-primary buttMargin'>I'm Sorry</a></div></div>")
    }
    }
});
