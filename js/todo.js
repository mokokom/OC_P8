import Controller from "./controller.js";
import Model from "./model.js";
import Store from "./store.js";
import Template from "./template.js";
import View from "./view.js";

export default class Todo {
	constructor(name) {
		this.storage = new Store(name);
		this.model = new Model(this.storage);
		this.template = new Template();
		this.view = new View(this.template);
		this.controller = new Controller(this.model, this.view);
	}
}
