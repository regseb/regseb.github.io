/* global window, document, $ */

"use strict";

const $headers = $("h2");
// Créer le sommaire de gauche.
$headers.each(function () {
    let $a = $("<a>").attr("href", "#" + $(this).attr("id"))
                     .text($(this).text());
    $("aside ul").append($("<li>").html($a));
});
let lastId;
let topMenuHeight = $("aside").outerHeight();
let $contents = $("aside a");
$("aside li:first").addClass("active");

let menuTop = 0;
if (0 !== $("aside").length) {
    menuTop = $("aside").offset().top;
}
$(window).scroll(function () {
    if ($(this).scrollTop() >= $("nav").height()) {
        $("nav > div").addClass("show");
        $("h1, cite").addClass("hide");
    } else {
        $("nav > div").removeClass("show");
        $("h1, cite").removeClass("hide");
    }
    if ($(this).scrollTop() >= $("header").offset().top +
                                                         $("header").height()) {
        $("nav").css("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.26)");
    } else {
        $("nav").css("box-shadow", "none");
    }


    if (menuTop < $(window).scrollTop()) {
        $("aside").css({ "position": "fixed" });
    } else {
        $("aside").css({ "position": "static" });
    }

    let id = null;
    // Si l'utilisateur est en bas de la page.
    if ($(this).scrollTop() + $(this).height() === $(document).height()) {
        id = $("h2:last").attr("id");
    } else {
        // Get container scroll position
        let fromTop = $(this).scrollTop() + topMenuHeight;

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
for (let tab of document.querySelectorAll(".tabs > ul li")) {
    tab.onclick = function () {
        let index;
        for (let i = 0; i < this.parentElement.children.length; ++i) {
            if (this === this.parentElement.children[i]) {
                index = i + 1;
                this.className = "active";
            } else {
                this.parentElement.children[i].className = "";
            }
        }

        let contents = this.parentElement.parentElement.children;
        for (let i = 1; i < contents.length; ++i) {
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
for (let first of document.querySelectorAll(".tabs > ul li:first-child")) {
    first.click();
}
