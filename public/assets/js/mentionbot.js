$( document ).ready(function() {
    $("#Mention").on("click", function() {
        $(".mentionCard").hide();
        $(".Mention").show()
    })

    $("#External_Reprint").on("click", function() {
        $(".mentionCard").hide();
        $(".External_Reprint").show()
    })

    $("#Internal_Reprint").on("click", function() {
        $(".mentionCard").hide();
        $(".Internal_Reprint").show()
    })
    
    $("#Appearance").on("click", function() {
        $(".mentionCard").hide();
        $(".Appearance").show()
    })

    $("#Bigtime").on("click", function() {
        $(".mentionCard").hide();
        $(".Bigtime").show()
    })

    $("#Cringeworthy").on("click", function() {
        $(".mentionCard").hide();
        $(".Cringeworthy").show()
    })

    $("#Showall").on("click", function() {
        $(".mentionCard").hide();
        $(".mentionCard").show();
    })
    var Mennie = document.getElementById("pokeBot");
    Mennie.addEventListener("click", typeWriter)

    var i = 0;
    var txt = "Ommmmmm, Did you just poke me?  Say you're sorry and you can have your mentions back.";
    var speed = 70;

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
        $(".mentionCard").hide();
        $("#sassyBot").html("<div class='col-12'><div class='d-flex align-content-center justify-content-center'><a href='/' class='btn btn-primary buttMargin'>I'm Sorry</a></div></div>")
    }
    }
});
