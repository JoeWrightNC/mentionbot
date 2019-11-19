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
    $("#pokeBot").on("click", function() {
        console.log("clickety Clack")
        $(".pokeText").text("")
        typeWriter();
    })

var i = 0;
var txt = "Ommmmmm, Did you just poke me?"; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    $(".pokeText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
});
