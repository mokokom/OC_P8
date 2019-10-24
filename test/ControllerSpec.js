/*global app, jasmine, describe, it, beforeEach, expect */

describe("controller", function() {
	"use strict";

	var subject, model, view;

	var setUpModel = function(todos) {
		model.read.and.callFake(function(query, callback) {
			callback = callback || query;
			callback(todos);
		});

		model.getCount.and.callFake(function(callback) {
			var todoCounts = {
				active: todos.filter(function(todo) {
					return !todo.completed;
				}).length,
				completed: todos.filter(function(todo) {
					return !!todo.completed;
				}).length,
				total: todos.length
			};

			callback(todoCounts);
		});

		model.remove.and.callFake(function(id, callback) {
			callback();
		});

		model.create.and.callFake(function(title, callback) {
			callback();
		});

		model.update.and.callFake(function(id, updateData, callback) {
			callback();
		});
	};

	var createViewStub = function() {
		var eventRegistry = {}; // * object that stock an event attached to the handler (here the constructor Controller)
		// * "eventRegistry" == "viewCommands" in view.js l.137
		return {
			render: jasmine.createSpy("render"),
			bind: function(event, handler) {
				// * see controller.js l.17. It fake the result of View.prototype.bind l.178
				eventRegistry[event] = handler;
			},
			trigger: function(event, parameter) {
				// * "event" == "viewCmd" in view.js l.137
				eventRegistry[event](parameter); // * ==  viewCommands[viewCmd]() in view.js l.137
			}
		};
	};

	beforeEach(function() {
		model = jasmine.createSpyObj("model", [
			"read",
			"getCount",
			"remove",
			"create",
			"update"
		]);
		view = createViewStub();
		subject = new app.Controller(model, view); // * linked with script on SpecRunner.html
	});

	it("should show entries on start-up", function() {
		/* // TODO: write test
		setUpModel([]); // * on start-up no todo created, storage.js create an empty array

		subject.setView("#/"); // * on start-up first page is homepage -> "" = All

		expect(view.render).toHaveBeenCalled(); // * // via Controller.vetView the view.render method is called indirectyl */

		subject.setView("");

		expect(subject._activeRoute).toBeDefined();
	});

	describe("routing", function() {
		it("should show all entries without a route", function() {
			var todo = { title: "my todo" };
			setUpModel([todo]);

			subject.setView(""); // * Set view is a prototype method from controller.js. This method calls indirectly the view.render method

			expect(view.render).toHaveBeenCalledWith("showEntries", [todo]); // * showEntries is first arg in controller.js prototype showAll, showCompleted and showActive methods
		});

		it('should show all entries without "all" route', function() {
			var todo = { title: "my todo" };
			setUpModel([todo]);

			subject.setView("#/");

			expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
		});

		it("should show active entries", function() {
			// TODO: write test
			let todo = { title: "my todo" };
			setUpModel([todo]);

			subject.setView("#/active");

			expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
		});

		it("should show completed entries", function() {
			// TODO: write test
			let todo = { title: "my todo" };
			setUpModel([todo]);

			subject.setView("#/completed");

			expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
		});
	});

	it("should show the content block when todos exists", function() {
		setUpModel([{ title: "my todo", completed: true }]);

		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("contentBlockVisibility", {
			visible: true
		});
	});

	it("should hide the content block when no todos exists", function() {
		setUpModel([]);

		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("contentBlockVisibility", {
			visible: false
		});
	});

	it("should check the toggle all button, if all todos are completed", function() {
		setUpModel([{ title: "my todo", completed: true }]);

		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("toggleAll", {
			checked: true
		});
	});

	// * added by me
	it("should check the toggle all button, if all todos are not completed", function() {
		setUpModel([
			{ title: "my todo", completed: true },
			{ title: "my todo", completed: false }
		]);

		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("toggleAll", {
			checked: false
		});
	});

	it('should set the "clear completed" button', function() {
		var todo = { id: 42, title: "my todo", completed: true };
		setUpModel([todo]);

		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("clearCompletedButton", {
			completed: 1,
			visible: true
		});
	});

	// * added by me
	it('should unset the "clear completed" button', function() {
		setUpModel([
			{ title: "my todo", completed: false },
			{ title: "my todo2", completed: false }
		]);

		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("clearCompletedButton", {
			completed: 0,
			visible: false
		});
	});

	it('should highlight "All" filter by default', function() {
		// TODO: write test
		subject.setView("");

		expect(view.render).toHaveBeenCalledWith("setFilter", "");
	});

	it('should highlight "Active" filter when switching to active view', function() {
		// TODO: write test
		subject.setView("#/active");

		expect(view.render).toHaveBeenCalledWith("setFilter", "active");
	});

	describe("toggle all", function() {
		it("should toggle all todos to completed", function() {
			// TODO: write test
			// controller.js l.223 ? l.205
			setUpModel([
				{ id: 11, title: "my todo", completed: true },
				{ id: 12, title: "my todo", completed: false }
			]);

			subject.setView("");

			view.trigger("toggleAll", { completed: true }); // * act as controller.js l.46 to act as toggleAll has been clicked

			expect(model.read).toHaveBeenCalledWith(
				{ completed: false }, // * controller.js l.224, searching uncompleted todo to turn them completed
				jasmine.any(Function)
			);
			/* expect(view.render).toHaveBeenCalledWith("updateElementCount", 0); */
		});

		it("should update the view", function() {
			// TODO: write test
			let todos = [
				{ title: "my todo", completed: true },
				{ title: "my todo2", completed: true }
			];
			setUpModel(todos);

			subject.setView("");

			expect(model.getCount).toHaveBeenCalledWith(jasmine.any(Function)); // * controller.js l.240 check and send back object that list active, completed and total of todos
			expect(view.render).toHaveBeenCalledWith("toggleAll", { checked: true }); // * controller.js l.247: this update the toggleAll button from grey to dark
			expect(view.render).toHaveBeenCalledWith("updateElementCount", 0); // * controller.js l.241: check all todos.active -> in this case 0 because when toggleAll clicked it modify all todos.active to todos.completes
		});
	});

	describe("new todo", function() {
		it("should add a new todo to the model", function() {
			// TODO: write test`
			setUpModel([]);

			subject.setView("");

			view.trigger("newTodo", "my test"); // * act as "change" event fire (see controller.js l.17)

			expect(model.create).toHaveBeenCalledWith(
				// * controller.js l.106: add a new todo to the model
				"my test",
				jasmine.any(Function)
			);
			expect(view.render).toHaveBeenCalledWith("clearNewTodo");
		});

		it("should add a new todo to the view", function() {
			setUpModel([]);

			subject.setView("");

			view.render.calls.reset(); // *  Reset this spy as if it has never been called.
			model.read.calls.reset();
			model.read.and.callFake(function(callback) {
				// * By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied function.
				callback([
					{
						title: "a new todo",
						completed: false
					}
				]);
			});
			// * model.read act as the model.js read method which return the todos parse list

			view.trigger("newTodo", "a new todo"); // equal line in view.js l.137 ? no
			// * trigger should act as View.protoype.bind. Here "a new todo" equal the result of handler in "if(event === newTodo)" statement where event is "newTodo"

			expect(model.read).toHaveBeenCalled();

			expect(view.render).toHaveBeenCalledWith("showEntries", [
				{
					title: "a new todo",
					completed: false
				}
			]);
		});

		it("should clear the input field when a new todo is added", function() {
			setUpModel([]);

			subject.setView("");

			view.trigger("newTodo", "a new todo");

			expect(view.render).toHaveBeenCalledWith("clearNewTodo");
		});
	});

	describe("element removal", function() {
		it("should remove an entry from the model", function() {
			// TODO: write test
			var todo = { id: 42, title: "my todo", completed: true };
			setUpModel([todo]);

			subject.setView("");
			view.trigger("itemRemove", { id: 42 });

			expect(model.read).toHaveBeenCalledWith(jasmine.any(Function)); // * controller.js l.165: get all the todos from model.js
			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function)); // * controller.js l.175
		});

		it("should remove an entry from the view", function() {
			var todo = { id: 42, title: "my todo", completed: true };
			setUpModel([todo]);

			subject.setView("");
			view.trigger("itemRemove", { id: 42 });

			expect(view.render).toHaveBeenCalledWith("removeItem", 42);
		});

		it("should update the element count", function() {
			var todo = { id: 42, title: "my todo", completed: true };
			setUpModel([todo]);

			subject.setView("");
			view.trigger("itemRemove", { id: 42 });

			expect(view.render).toHaveBeenCalledWith("updateElementCount", 0);
		});
	});

	describe("remove completed", function() {
		it("should remove a completed entry from the model", function() {
			var todo = { id: 42, title: "my todo", completed: true };
			setUpModel([todo]);

			subject.setView("");
			view.trigger("removeCompleted");

			expect(model.read).toHaveBeenCalledWith(
				{ completed: true },
				jasmine.any(Function)
			);
			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
		});

		it("should remove a completed entry from the view", function() {
			var todo = { id: 42, title: "my todo", completed: true };
			setUpModel([todo]);

			subject.setView("");
			view.trigger("removeCompleted");

			expect(view.render).toHaveBeenCalledWith("removeItem", 42);
		});
	});

	describe("element complete toggle", function() {
		it("should update the model", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);
			subject.setView("");

			view.trigger("itemToggle", { id: 21, completed: true });

			expect(model.update).toHaveBeenCalledWith(
				21,
				{ completed: true },
				jasmine.any(Function)
			);
		});

		it("should update the view", function() {
			var todo = { id: 42, title: "my todo", completed: true };
			setUpModel([todo]);
			subject.setView("");

			view.trigger("itemToggle", { id: 42, completed: false });

			expect(view.render).toHaveBeenCalledWith("elementComplete", {
				id: 42,
				completed: false
			});
		});
	});

	describe("edit item", function() {
		it("should switch to edit mode", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEdit", { id: 21 });

			expect(view.render).toHaveBeenCalledWith("editItem", {
				id: 21,
				title: "my todo"
			});
		});

		it("should leave edit mode on done", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEditDone", { id: 21, title: "new title" });

			expect(view.render).toHaveBeenCalledWith("editItemDone", {
				id: 21,
				title: "new title"
			});
		});

		it("should persist the changes on done", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEditDone", { id: 21, title: "new title" });

			expect(model.update).toHaveBeenCalledWith(
				21,
				{ title: "new title" },
				jasmine.any(Function)
			);
		});

		it("should remove the element from the model when persisting an empty title", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEditDone", { id: 21, title: "" });

			expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
		});

		it("should remove the element from the view when persisting an empty title", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEditDone", { id: 21, title: "" });

			expect(view.render).toHaveBeenCalledWith("removeItem", 21);
		});

		it("should leave edit mode on cancel", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEditCancel", { id: 21 });

			expect(view.render).toHaveBeenCalledWith("editItemDone", {
				id: 21,
				title: "my todo"
			});
		});

		it("should not persist the changes on cancel", function() {
			var todo = { id: 21, title: "my todo", completed: false };
			setUpModel([todo]);

			subject.setView("");

			view.trigger("itemEditCancel", { id: 21 });

			expect(model.update).not.toHaveBeenCalled();
		});
	});
});
