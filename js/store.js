/*jshint eqeqeq:false */
/**
 * Takes a model and view and acts as the controller between them.
 *
 * @example
 * let myStorage = new MyStore(name, callback);
 */
export default class Store {
	/**
	 * Creates a new client side storage object and will create an empty
	 * collection if no collection already exists.
	 * @constructor
	 * @param {string} name The name of our DB we want to use
	 * @param {function} callback Our fake DB uses callbacks because in
	 * real life you probably would be making AJAX calls
	 */
	constructor(name, callback) {
		callback = callback || function() {};
		/**
		 * @type {string} name of the database
		 */
		this._dbName = name;

		if (!localStorage[name]) {
			let data = {
				todos: []
			};
			localStorage[name] = JSON.stringify(data);
		}

		callback.call(this, JSON.stringify(localStorage[name]));
	}

	/**
	 * Finds items based on a query given as a JS object
	 *
	 * @param {object} query The query to match against (i.e. {foo: 'bar'})
	 * @param {function} callback	 The callback to fire when the query has
	 * completed running
	 *
	 * @example
	 * db.find({foo: 'bar', hello: 'world'}, function (data) {
	 *	 // data will return any items that have foo: bar and
	 *	 // hello: world in their properties
	 * });
	 */
	find(query, callback) {
		if (!callback) {
			return;
		}

		let todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(
			this,
			todos.filter(todo => {
				for (let q in query) {
					if (query[q] !== todo[q]) {
						return false;
					}
				}
				return true;
			})
		);
	}

	/**
	 * Will retrieve all data from the collection
	 *
	 * @param {function} callback The callback to fire upon retrieving data
	 */
	findAll(callback) {
		callback = callback || function() {};
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos); // * "this" indicates where the function attached to "call" should refere to
	}

	/**
	 * Will save the given data to the DB. If no item exists it will create a new
	 * item, otherwise it'll simply update an existing item's properties
	 *
	 * @param {object} updateData The data to save back into the DB
	 * @param {function} callback The callback to fire after saving
	 * @param {number} id An optional param to enter an ID of an item to update
	 */
	save(updateData, callback, id) {
		let data = JSON.parse(localStorage[this._dbName]);
		let todos = data.todos;

		callback = callback || function() {};
		// If an ID was actually given, find the item and update each property
		if (id) {
			for (let todo of todos) {
				if (todo.id === id) {
					for (let key in updateData) {
						todo[key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {
			// Assign an ID
			let newId = this.createId(todos);
			updateData.id = newId;
			updateData.id = parseInt(newId);
			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	}

	/**
	 * Will create a unique id for the new created todo
	 *
	 * @param {array} todos The todos array to iterate trough it and get a new unique id
	 * @return {number} Return an brand new and unique id
	 */

	createId(todos) {
		let newId;
		let max = 0;
		if (todos.length === 0) {
			newId = 1;
		}
		for (let todo of todos) {
			if (todo.id > max) {
				max = todo.id;
			}
			newId = max + 1;
		}
		return newId;
	}

	/**
	 * Will remove an item from the Store based on its ID
	 *
	 * @param {number} id The ID of the item you want to remove
	 * @param {function} callback The callback to fire after saving
	 */
	remove(id, callback) {
		let data = JSON.parse(localStorage[this._dbName]);
		let todos = data.todos;
		/* let todoId; */

		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todos.splice(i, 1);
			}
		}

		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, todos);
	}

	/**
	 * Will drop all storage and start fresh
	 *
	 * @param {function} callback The callback to fire after dropping the data
	 */
	drop(callback) {
		let data = { todos: [] };
		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, data.todos);
	}
}
