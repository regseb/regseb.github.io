/* @flow */
/* global window, define, module */

/**
 * @file Bibliothèque JavaScript Wiloquery fournissant un objet JSON pour les
 *       paramètres de l'URL.
 * @author Sébastien Règne
 * @version 0.3
 * @license Licence Public Rien À Branler
 */

(function (factory) {
    "use strict";

    // Si la bibliothèque est chargée avec un AMD loader.
    if (typeof define === "function" && define.amd)
        define([], factory);
    // Si c'est un CommonJS-like qui charge la bibliothèque.
    else if (typeof exports === "object")
        module.exports = factory();
    // Sinon : un chargement classique est utilisé.
    else
        window.location.query = factory();
}(function () {
    "use strict";

    var data = {};
    var fields = window.location.search.substr(1).split("&");
    for (var i in fields) {
        var parts = fields[i].replace(/\+/g, " ").split("=");
        var key = parts[0];
        if ("" === key) continue;

        var value = null;
        if (2 === parts.length)
            value = decodeURIComponent(parts[1]);

        if (key in data)
            if (Array.isArray(data[key]))
                data[key].push(value);
            else
                data[key] = [data[key], value];
        else
            data[key] = value;
    }
    return data;
}));
