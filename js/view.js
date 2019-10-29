/*global qs, qsa, $on, $parent, $delegate */
import helpers from "./helpers.js";

/**
 * View that abstracts away the browser's DOM completely.
 * It has two simple entry points:
 *
 *   - bind(eventName, handler)
 *     Takes a todo application event and registers the handler
 *   - render(command, parameterObject)
 *     Renders the given command with the options
 * @example
 * let myView = MyView(myTemplate)
 */
export default class View {
	/**
	 * @constructor
	 * @param {string} template Represent the HTML template of a todo
	 */
	constructor(template) {
		/**
		 * @type {string} template
		 */
		this.template = template;

		/**
		 * @type {number} Key code for the Enter touch
		 */
		this.ENTER_KEY = 13;
		/**
		 * @type {number} Key code for the Escape touch
		 */
		this.ESCAPE_KEY = 27;

		/**
		 * @type {object} Represent the HTML tag that contains the ".todo-list" class
		 */
		this.$todoList = helpers.qs(".todo-list");
		/**
		 * @type {object} Represent the HTML tag that contains the ".todo-count" class
		 */
		this.$todoItemCounter = helpers.qs(".todo-count");
		/**
		 * @type {object} Represent the HTML tag that contains the ".clear-completed" class
		 */
		this.$clearCompleted = helpers.qs(".clear-completed");
		/**
		 * @type {object} Represent the HTML tag that contains the ".main" class
		 */
		this.$main = helpers.qs(".main");
		/**
		 * @type {object} Represent the HTML tag that contains the ".footer" class
		 */
		this.$footer = helpers.qs(".footer");
		/**
		 * @type {object} Represent the HTML tag that contains the ".toggle-all" class
		 */
		this.$toggleAll = helpers.qs(".toggle-all");
		/**
		 * @type {object} Represent the HTML tag that contains the ".new-todo" class
		 */
		this.$newTodo = helpers.qs(".new-todo");
	}
	/**
	 *
	 * @param {number} id The id of the todo to remove
	 */
	_removeItem(id) {
		let elem = helpers.qs('[data-id="' + id + '"]');

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	}
	/**
	 *
	 * @param {number} completedCount Number of completed todos
	 * @param {boolean} visible Control the visibility of the "clear completed" button
	 */
	_clearCompletedButton(completedCount, visible) {
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(
			completedCount
		);
		this.$clearCompleted.style.display = visible ? "block" : "none";
	}

	/**
	 *
	 * @param {string} currentPage The name of the current page
	 */
	_setFilter(currentPage) {
		helpers.qs(".filters .selected").className = "";
		helpers.qs('.filters [href="#/' + currentPage + '"]').className =
			"selected";
	}

	/**
	 *
	 * @param {number} id The id of the todo to toggle status
	 * @param {boolean} completed Indicate the todo state
	 */
	_elementComplete(id, completed) {
		let listItem = helpers.qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = completed ? "completed" : "";

		// In case it was toggled from an event and not by clicking the checkbox
		helpers.qs("input", listItem).checked = completed;
	}
	/**
	 *
	 * @param {number} id The id of the todo to edit
	 * @param {string} title the title of the todo to edit
	 */
	_editItem(id, title) {
		let listItem = helpers.qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = listItem.className + " editing";

		let input = document.createElement("input");
		input.className = "edit";

		listItem.appendChild(input);
		input.focus();
		input.value = title;
	}
	/**
	 *
	 * @param {number} id The id of the todo that has been edited
	 * @param {string} title The name of the todo that has been edited
	 */
	_editItemDone(id, title) {
		let listItem = helpers.qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		let input = helpers.qs("input.edit", listItem);
		listItem.removeChild(input);

		listItem.className = listItem.className.replace("editing", "");

		helpers.qsa("label", listItem).forEach(function(label) {
			label.textContent = title;
		});
	}

	/**
	 *
	 * @param {string} viewCmd The name of the command to reach (which equivalent to a viewCommands method)
	 * @param {object|Array|string|number} parameter Parameter to change for a todo or multiple todos
	 */
	render(viewCmd, parameter) {
		let viewCommands = {
			showEntries: () => {
				this.$todoList.innerHTML = this.template.show(parameter);
			},
			removeItem: () => {
				this._removeItem(parameter);
			},
			updateElementCount: () => {
				this.$todoItemCounter.innerHTML = this.template.itemCounter(parameter);
			},
			clearCompletedButton: () => {
				this._clearCompletedButton(parameter.completed, parameter.visible);
			},
			contentBlockVisibility: () => {
				this.$main.style.display = this.$footer.style.display = parameter.visible
					? "block"
					: "none";
			},
			toggleAll: () => {
				this.$toggleAll.checked = parameter.checked; // * if all todo are completed parameter.checked = true otherwise false
			},
			setFilter: () => {
				this._setFilter(parameter);
			},
			clearNewTodo: () => {
				this.$newTodo.value = "";
			},
			elementComplete: () => {
				this._elementComplete(parameter.id, parameter.completed);
			},
			editItem: () => {
				this._editItem(parameter.id, parameter.title);
			},
			editItemDone: () => {
				this._editItemDone(parameter.id, parameter.title);
			}
		};

		viewCommands[viewCmd]();
	}

	/**
	 *
	 * @param {object} element Represent the HTML tag of the targeted element
	 * @return {number} The id of the parent li element of the targeted HTML tag
	 */
	_itemId(element) {
		let li = helpers.$parent(element, "li");
		return parseInt(li.dataset.id, 10);
	}

	/**
	 *
	 * @param {function} handler Callback function
	 */
	_bindItemEditDone(handler) {
		let self = this;
		helpers.$delegate(self.$todoList, "li .edit", "blur", function() {
			if (!this.dataset.iscanceled) {
				handler({
					id: self._itemId(this),
					title: this.value
				});
			}
		});

		helpers.$delegate(self.$todoList, "li .edit", "keypress", function(event) {
			if (event.keyCode === self.ENTER_KEY) {
				// Remove the cursor from the input when you hit enter just like if it
				// were a real form
				this.blur();
			}
		});
	}
	/**
	 *
	 * @param {function} handler Callback function
	 */
	_bindItemEditCancel(handler) {
		let self = this;
		helpers.$delegate(self.$todoList, "li .edit", "keyup", function(event) {
			if (event.keyCode === self.ESCAPE_KEY) {
				this.dataset.iscanceled = true;
				this.blur();

				handler({ id: self._itemId(this) });
			}
		});
	}

	/**
	 *
	 * @param {string} event Name of the event
	 * @param {function} handler callback function
	 */
	bind(event, handler) {
		let self = this;
		// * check how this callback works
		if (event === "newTodo") {
			helpers.$on(this.$newTodo, "change", () => {
				handler(this.$newTodo.value);
			});
		} else if (event === "removeCompleted") {
			helpers.$on(this.$clearCompleted, "click", () => {
				handler();
			});
		} else if (event === "toggleAll") {
			helpers.$on(this.$toggleAll, "click", function() {
				handler({ completed: this.checked });
			});
		} else if (event === "itemEdit") {
			helpers.$delegate(this.$todoList, "li label", "dblclick", function() {
				handler({ id: self._itemId(this) });
			});
		} else if (event === "itemRemove") {
			helpers.$delegate(this.$todoList, ".destroy", "click", function() {
				handler({ id: self._itemId(this) });
			});
		} else if (event === "itemToggle") {
			helpers.$delegate(this.$todoList, ".toggle", "click", function() {
				handler({
					id: self._itemId(this),
					completed: this.checked
				});
			});
		} else if (event === "itemEditDone") {
			this._bindItemEditDone(handler);
		} else if (event === "itemEditCancel") {
			this._bindItemEditCancel(handler);
		}
	}
}
