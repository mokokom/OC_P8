/*global app, $on */

import todo from "./components/todo.js";
import helpers from "./components/helpers.js";
/**
 * Sets up a brand new Todo list.
 *
 * @param {string} name The name of your new to do list.
 */
(function() {
	function setView() {
		todo.controller.setView(document.location.hash);
	}
	setView();

	helpers.$on(window, "load", setView);
	helpers.$on(window, "hashchange", setView);
})();
