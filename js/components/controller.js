/**
 * Takes a model and view and acts as the controller between them.
 *
 * @example
 * let myController = new MyController(model, view);
 */
export default class Controller {
	/**
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	constructor(model, view) {
		/**
		 * @type {Object} model
		 */
		this.model = model;
		/**
		 * @type {Object} view
		 */
		this.view = view;
		this.addItem = this.addItem.bind(this);
		this.view.bind("newTodo", title => {
			this.addItem(title);
		});
		this.view.bind("itemEdit", item => {
			this.editItem(item.id);
		});
		this.view.bind("itemEditDone", item => {
			this.editItemSave(item.id, item.title);
		});
		this.view.bind("itemEditCancel", item => {
			this.editItemCancel(item.id);
		});
		this.view.bind("itemRemove", item => {
			this.removeItem(item.id);
		});

		this.view.bind("itemToggle", item => {
			this.toggleComplete(item.id, item.completed);
		});

		this.view.bind("removeCompleted", () => {
			this.removeCompletedItems();
		});

		this.view.bind("toggleAll", status => {
			this.toggleAll(status.completed);
		});
	}
	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 *
	 * @param {string} title The title of the new todo to add
	 */
	addItem(title) {
		if (title.trim() === "") {
			return;
		}

		this.model.create(title, () => {
			this.view.render("clearNewTodo");
			this._filter(true);
		});
	}
	/**
	 * Triggers the item editing mode.
	 *
	 * @param {number} id The id of the todo to edite
	 */
	editItem(id) {
		this.model.read(id, data => {
			this.view.render("editItem", { id: id, title: data[0].title });
		});
	}
	/**
	 * Finishes the item editing mode successfully.
	 *
	 * @param {number} id The id of the save todo edite
	 * @param {string} title Todo's title
	 */
	editItemSave(id, title) {
		title = title.trim();

		if (title.length !== 0) {
			this.model.update(id, { title: title }, () => {
				this.view.render("editItemDone", { id: id, title: title });
			});
		} else {
			this.removeItem(id);
		}
	}
	/**
	 * Cancels the item editing mode.
	 *
	 * @param {number} id The id of the todo to cancel the editing
	 */
	editItemCancel(id) {
		this.model.read(id, data => {
			this.view.render("editItemDone", { id: id, title: data[0].title });
		});
	}
	/**
	 * By giving it an ID it'll find the DOM element matching that ID,
	 * remove it from the DOM and also remove it from storage.
	 *
	 * @param {number} id The ID of the item to remove from the DOM and storage.
	 */
	removeItem(id) {
		this.model.remove(id, () => {
			this.view.render("removeItem", id);
		});

		this._filter();
	}
	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	removeCompletedItems() {
		this.model.read({ completed: true }, data => {
			data.forEach(item => {
				this.removeItem(item.id);
			});
		});

		this._filter();
	}
	/**
	 * Give it an ID of a model and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} completed To check the state of complete or not
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	toggleComplete(id, completed, silent) {
		this.model.update(id, { completed: completed }, () => {
			this.view.render("elementComplete", {
				id: id,
				completed: completed
			});
		});

		if (!silent) {
			this._filter();
		}
	}
	/**
	 * Will toggle ALL checkboxes' on/off state and completeness of models
	 * Just pass in the event object.
	 *
	 * @param {boolean|undefined} completed State of the toggleAll checkbox
	 */
	toggleAll(completed) {
		this.model.read({ completed: !completed }, data => {
			data.forEach(item => {
				this.toggleComplete(item.id, completed, true);
			});
		});

		this._filter();
	}
	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 *
	 * @private
	 */
	_updateCount() {
		this.model.getCount(todos => {
			this.view.render("updateElementCount", todos.active);
			this.view.render("clearCompletedButton", {
				completed: todos.completed,
				visible: todos.completed > 0
			});

			this.view.render("toggleAll", {
				checked: todos.completed === todos.total
			});
			this.view.render("contentBlockVisibility", {
				visible: todos.total > 0
			});
		});
	}
	/**
	 * Re-filters the todo items, based on the active route.
	 *
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 * @private
	 */
	_filter(force) {
		let activeRoute =
			this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

		// Update the elements on the page, which change with each completed todo
		this._updateCount();

		// If the last active route isn't "All", or we're switching routes, we
		// re-create the todo item elements, calling:
		//   this.show[All|Active|Completed]();
		if (
			force ||
			this._lastActiveRoute !== "All" ||
			this._lastActiveRoute !== activeRoute
		) {
			this["show" + activeRoute]();
		}
		/**
		 * Store a reference to the last active route, allowing us to add condition and not show the new active route if it's the same as the last active route.
		 *
		 * @type {string} _lastActiveRoute
		 */
		this._lastActiveRoute = activeRoute;
	}
	/**
	 * Simply updates the filter nav's selected states.
	 *
	 * @param {string} currentPage
	 * @private
	 */
	_updateFilterState(currentPage) {
		/**
		 * Store a reference to the active route, allowing us to re-filter todo items as they are marked complete or incomplete.
		 *
		 * @type {string} _activeRoute
		 */
		this._activeRoute = currentPage;

		if (currentPage === "") {
			this._activeRoute = "All";
		}

		this._filter();

		this.view.render("setFilter", currentPage);
	}
	/**
	 * Loads and initialises the view.
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	setView(locationHash) {
		let route = locationHash.split("/")[1];
		let page = route || "";
		this._updateFilterState(page);
	}

	/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	showAll() {
		this.model.read(data => {
			this.view.render("showEntries", data);
		});
	}

	/**
	 * Renders all active tasks
	 */
	showActive() {
		this.model.read({ completed: false }, data => {
			this.view.render("showEntries", data);
		});
	}

	/**
	 * Renders all completed tasks
	 */
	showCompleted() {
		this.model.read({ completed: true }, data => {
			this.view.render("showEntries", data);
		});
	}
}
