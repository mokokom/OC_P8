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
	/* 	class Todo {
		constructor(name) {
			this.storage = new Store(name);
			this.model = new Model(this.storage);
			this.template = new Template();
			this.view = new View(this.template);
			this.controller = new Controller(this.model, this.view);
		}
	} */

	let todo = new Todo("todos-vanillajs");

	function setView() {
		todo.controller.setView(document.location.hash);
	}
	setView();

	helpers.$on(window, "load", setView);
	helpers.$on(window, "hashchange", setView);
})();
