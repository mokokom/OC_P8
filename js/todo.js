import Controller from "./controller.js";
import Model from "./model.js";
import Store from "./store.js";
import Template from "./template.js";
import View from "./view.js";

/**
 * Create a Todo app object
 *
 * @example
 * let myTodo = new MyTodo(todoAppName);
 */
class Todo {
	/**
	 *
	 * @constructor
	 * @param {string} name The name of the todo app, which will be use as localStorage name to store datas
	 */
	constructor(name) {
		/**
		 * @type {object} Creates a new client side storage object and will create an empty collection if no collection already exists.
		 */
		this.storage = new Store(name);
		/**
		 * @type {object} Creates a new Model instance and hooks up the storage.
		 */
		this.model = new Model(this.storage);
		/**
		 * @type {object} Sets up defaults for all the Template methods such as a default template
		 */
		this.template = new Template();
		/**
		 * @type {object} View that abstracts away the browser's DOM completely.
		 */
		this.view = new View(this.template);
		/**
		 * @type {object} Takes a model and view and acts as the controller between them.
		 */
		this.controller = new Controller(this.model, this.view);
		console.log(this.model);
	}
}

let todo = new Todo("todos-vanillajs");

export default todo;
