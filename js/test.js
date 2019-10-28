export default class Helpers {
	constructor() {
		this.qs = function(selector, scope) {
			return (scope || document).querySelector(selector);
		};
		this.qsa = function(selector, scope) {
			return (scope || document).querySelectorAll(selector);
		};
		this.$on = function(target, type, callback, useCapture) {
			target.addEventListener(type, callback, !!useCapture);
		};
		this.$delegate = function(target, selector, type, handler) {
			function dispatchEvent(event) {
				let targetElement = event.target;
				let potentialElements = this.qsa(selector, target);
				let hasMatch =
					Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

				if (hasMatch) {
					handler.call(targetElement, event);
				}
			}

			// https://developer.mozilla.org/en-US/docs/Web/Events/blur
			let useCapture = type === "blur" || type === "focus";

			this.$on(target, type, dispatchEvent, useCapture);
		};
		this.$parent = function(element, tagName) {
			if (!element.parentNode) {
				return;
			}
			if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
				return element.parentNode;
			}
			return this.$parent(element.parentNode, tagName);
		};
	}
	/* qs(selector, scope) {
		console.log("ok");
		return (scope || document).querySelector(selector);
	} */
}
