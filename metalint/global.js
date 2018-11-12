/* global window, document, $ */

"use strict";

// Ajouter le menu.
fetch("/metalint/menu.html").then(function (response) {
    return response.text();
}).then(function (response) {
    document.querySelector("nav").innerHTML = response;
});

// Ajouter le pied de page.
fetch("/metalint/footer.html").then(function (response) {
    return response.text();
}).then(function (response) {
    document.querySelector("footer").innerHTML = response;
});

const $headers = $("h2");
// Créer le sommaire de gauche.
$headers.each(function () {
    const $a = $("<a>").attr("href", "#" + $(this).attr("id"))
                     .text($(this).text());
    $("aside ul").append($("<li>").html($a));
});
let lastId;
const topMenuHeight = $("nav").outerHeight();
const $contents = $("aside a");
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
        $("aside ul").css({ "position": "fixed" });
    } else {
        $("aside ul").css({ "position": "static" });
    }

    let id = null;
    // Si l'utilisateur est en bas de la page.
    if ($(this).scrollTop() + $(this).height() === $(document).height()) {
        id = $("h2:last").attr("id");
    } else {
        // Get container scroll position
        const fromTop = $(this).scrollTop() + topMenuHeight;

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
for (const tab of document.querySelectorAll(".tabs > ul li")) {
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

        const contents = this.parentElement.parentElement.children;
        for (let i = 1; i < contents.length; ++i) {
            // Afficher le contenu de l'onglet sélectionné et acher le contenu
            // des autres onglets.
            contents[i].style.display = index === i ? "block"
                                                    : "none";
        }
    };
}
// Afficher le contenu du premier onglet.
for (const first of document.querySelectorAll(".tabs > ul li:first-child")) {
    first.click();
}
