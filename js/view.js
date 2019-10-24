/*global qs, qsa, $on, $parent, $delegate */

/**
 * View that abstracts away the browser's DOM completely.
 * It has two simple entry points:
 *
 *   - bind(eventName, handler)
 *     Takes a todo application event and registers the handler
 *   - render(command, parameterObject)
 *     Renders the given command with the options
 */
export default class View {
	constructor(template) {
		this.template = template;

		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;

		this.$todoList = qs(".todo-list");
		this.$todoItemCounter = qs(".todo-count");
		this.$clearCompleted = qs(".clear-completed");
		this.$main = qs(".main");
		this.$footer = qs(".footer");
		this.$toggleAll = qs(".toggle-all");
		this.$newTodo = qs(".new-todo");
	}
	_removeItem(id) {
		let elem = qs('[data-id="' + id + '"]');

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	}

	_clearCompletedButton(completedCount, visible) {
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(
			completedCount
		);
		this.$clearCompleted.style.display = visible ? "block" : "none";
	}

	_setFilter(currentPage) {
		qs(".filters .selected").className = "";
		qs('.filters [href="#/' + currentPage + '"]').className = "selected";
	}

	_elementComplete(id, completed) {
		let listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = completed ? "completed" : "";

		// In case it was toggled from an event and not by clicking the checkbox
		qs("input", listItem).checked = completed;
	}

	_editItem(id, title) {
		let listItem = qs('[data-id="' + id + '"]');

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

	_editItemDone(id, title) {
		let listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		let input = qs("input.edit", listItem);
		listItem.removeChild(input);

		listItem.className = listItem.className.replace("editing", "");

		qsa("label", listItem).forEach(function(label) {
			label.textContent = title;
		});
	}

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

	_itemId(element) {
		let li = $parent(element, "li");
		return parseInt(li.dataset.id, 10);
	}

	_bindItemEditDone(handler) {
		let self = this;
		$delegate(self.$todoList, "li .edit", "blur", function() {
			if (!this.dataset.iscanceled) {
				handler({
					id: self._itemId(this),
					title: this.value
				});
			}
		});

		$delegate(self.$todoList, "li .edit", "keypress", function(event) {
			if (event.keyCode === self.ENTER_KEY) {
				// Remove the cursor from the input when you hit enter just like if it
				// were a real form
				this.blur();
			}
		});
	}

	_bindItemEditCancel(handler) {
		let self = this;
		$delegate(self.$todoList, "li .edit", "keyup", function(event) {
			if (event.keyCode === self.ESCAPE_KEY) {
				this.dataset.iscanceled = true;
				this.blur();

				handler({ id: self._itemId(this) });
			}
		});
	}

	bind(event, handler) {
		let self = this;
		// * check how this callback works
		if (event === "newTodo") {
			$on(this.$newTodo, "change", () => {
				handler(this.$newTodo.value);
			});
		} else if (event === "removeCompleted") {
			$on(this.$clearCompleted, "click", () => {
				handler();
			});
		} else if (event === "toggleAll") {
			$on(this.$toggleAll, "click", function() {
				handler({ completed: this.checked });
			});
		} else if (event === "itemEdit") {
			$delegate(this.$todoList, "li label", "dblclick", function() {
				handler({ id: self._itemId(this) });
			});
		} else if (event === "itemRemove") {
			$delegate(this.$todoList, ".destroy", "click", function() {
				handler({ id: self._itemId(this) });
			});
		} else if (event === "itemToggle") {
			$delegate(this.$todoList, ".toggle", "click", function() {
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
