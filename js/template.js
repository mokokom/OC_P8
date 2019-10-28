/**
 * @type {object} Stores all signs that could result of conflict
 */
let htmlEscapes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#x27;",
	"`": "&#x60;"
};

/**
 *
 * @param {string} chr Represent the incompatible HTML sign define by the new RegExp
 * @return {string} Return a string with the HTML equivalent writing of the incompatible sign
 */
let escapeHtmlChar = function(chr) {
	return htmlEscapes[chr];
};

/**
 * @type {object} Represent the charachter to exclude from the user input
 */
let reUnescapedHtml = /[&<>"'`]/g;
/**
 * @type {object} Represent the charachter to exclude from the user input
 */
let reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

/**
 *
 * @param {string} string The string to check with RegExp
 */
let escape = function(string) {
	return string && reHasUnescapedHtml.test(string)
		? string.replace(reUnescapedHtml, escapeHtmlChar)
		: string;
};

/**
 * Sets up defaults for all the Template methods such as a default template
 * @example
 * let myTemplate = new MyTemplate();
 */
export default class Template {
	/**
	 * @constructor
	 */
	constructor() {
		/**
		 * @type {string} default template which create an html implementation for each todo
		 */
		this.defaultTemplate =
			'<li data-id="{{id}}" class="{{completed}}">' +
			'<div class="view">' +
			'<input class="toggle" type="checkbox" {{checked}}>' +
			"<label>{{title}}</label>" +
			'<button class="destroy"></button>' +
			"</div>" +
			"</li>";
	}
	/**
	 * Creates an <li> HTML string and returns it for placement in your app.
	 *
	 * NOTE: In real life you should be using a templating engine such as Mustache or Handlebars, however, this is a vanilla JS example.
	 *
	 * @param {object} data The object containing keys you want to find in the template to replace.
	 * @returns {string} HTML String of an <li> element
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: 0,
	 * });
	 */
	show(data) {
		let i, l;
		let view = "";

		for (i = 0, l = data.length; i < l; i++) {
			let template = this.defaultTemplate;
			let completed = "";
			let checked = "";

			if (data[i].completed) {
				completed = "completed";
				checked = "checked";
			}

			template = template.replace("{{id}}", data[i].id);
			template = template.replace("{{title}}", escape(data[i].title));
			template = template.replace("{{completed}}", completed);
			template = template.replace("{{checked}}", checked);

			view = view + template;
		}

		return view;
	}

	/**
	 * Displays a counter of how many to dos are left to complete
	 *
	 * @param {number} activeTodos The number of active todos.
	 * @returns {string} String containing the count
	 */
	itemCounter(activeTodos) {
		let plural = activeTodos === 1 ? "" : "s";

		return "<strong>" + activeTodos + "</strong> item" + plural + " left";
	}

	/**
	 * Updates the text within the "Clear completed" button
	 *
	 * @param  {[type]} completedTodos The number of completed todos.
	 * @returns {string} String containing the count
	 */
	clearCompletedButton(completedTodos) {
		if (completedTodos > 0) {
			return "Clear completed";
		} else {
			return "";
		}
	}
}
