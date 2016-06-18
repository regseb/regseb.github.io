/* global window, document, $ */

"use strict";

var $headers = $("h2");
// Créer le sommaire de gauche.
$headers.each(function () {
    var $a = $("<a>").attr("href", "#" + $(this).attr("id"))
                     .text($(this).text());
    $("aside ul").append($("<li>").html($a));
});
var lastId;
var topMenuHeight = $("aside").outerHeight();
var $contents = $("aside a");
$("aside li:first").addClass("active");

var menuTop = $("aside").offset().top;
$(window).scroll(function () {
    if (menuTop < $(window).scrollTop()) {
        $("aside").css({ "position": "fixed" });
    } else {
        $("aside").css({ "position": "static" });
    }

    var id = null;
    // Si l'utilisateur est en bas de la page.
    if ($(this).scrollTop() + $(this).height() === $(document).height()) {
        id = $("h2:last").attr("id");
    } else {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Rechercher la section courante.
        $headers.each(function () {
            if ($(this).offset().top < fromTop) {
                id = this.id;
            }
        });
    }

    if (null !== id) {
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            $contents.parent().removeClass("active")
                     .end().filter("[href=\"#" + id + "\"]")
                     .parent().addClass("active");
        }
    }
}).scroll();

// Gérer les changements d'onglet.
for (var tab of document.querySelectorAll(".tabs > ul li")) {
    tab.onclick = function () {
        var index;
        for (var i = 0; i < this.parentElement.children.length; ++i) {
            if (this === this.parentElement.children[i]) {
                index = i + 1;
                this.className = "active";
            } else {
                this.parentElement.children[i].className = "";
            }
        }

        var contents = this.parentElement.parentElement.children;
        for (var i = 1; i < contents.length; ++i) {
            // Afficher le contenu de l'onglet sélectionné.
            if (index === i) {
                contents[i].style.display = "block";
            // Cacher le contenu des autres onglets.
            } else {
                contents[i].style.display = "none";
            }
        }
    }; // onclick()
}
// Afficher le contenu du premier onglet.
for (var first of document.querySelectorAll(".tabs > ul li:first-child")) {
    first.click();
}
