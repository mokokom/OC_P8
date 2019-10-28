/*global app, $on */

/* import Controller from "./controller.js";
import Model from "./model.js";
import Store from "./store.js";
import Template from "./template.js";
import View from "./view.js"; */
import Todo from "./todo.js";
import Helpers from "./helpers.js";
let helpers = new Helpers();
/**
 * Sets up a brand new Todo list.
 *
 * @param {string} name The name of your new to do list.
 */
(function() {
	let todo = new Todo("todos-vanillajs");

	function setView() {
		todo.controller.setView(document.location.hash);
	}
	setView();

	helpers.$on(window, "load", setView);
	helpers.$on(window, "hashchange", setView);
})();
