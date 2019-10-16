/*global app, $on */
(function() {
	"use strict";

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Todo(name) {
		// ! app is not defined
		// ? how and where to define it
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Todo("todos-vanillajs");

	function setView() {
		// ? setView is called inside setView
		todo.controller.setView(document.location.hash); // * location.hash = Return the anchor part of a URL
	}
	// ? is jQuery used
	$on(window, "load", setView);
	$on(window, "hashchange", setView);
})();
