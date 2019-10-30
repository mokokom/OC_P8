/*global NodeList */

/**
 * Manage the events with the DOM through the methods defined
 *
 * @example
 * let myHelpers = new MyHelpers();
 */
class Helpers {
	/**
	 * Act as a querySelector event
	 *
	 * @param {string} selector Represents the class selector to be reach
	 * @param {undefined|object} scope Represente the scope on which to look for the DOM's class selector
	 * @returns {object} Return the element from querySelector
	 */
	qs(selector, scope) {
		return (scope || document).querySelector(selector);
	}

	/**
	 * Act as a querySelectorAll event
	 *
	 * @param {string} selector Represents the element/class DOM selector to be reach
	 * @param {undefined|object} scope Represente the scope on which to look for the DOM's class selector
	 * @returns {object} Return the elements from querySelectorAll
	 */
	qsa(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	}
	/**
	 * Build an event listener according to the arguments passed in
	 *
	 * @param {object} target Represents the targeted HTML tag from the DOM
	 * @param {string} type Represents the type of event
	 * @param {function} callback Represent the callback function attach to this event
	 * @param {boolean} useCapture
	 */
	$on(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	}

	/**
	 *
	 *
	 * @param {object} target Represents the targeted HTML tag from the DOM
	 * @param {string} selector Represents the element/class DOM selector to be reach
	 * @param {string} type Represents the type of event
	 * @param {function} handler Represent the callback function attach to this event
	 */
	$delegate(target, selector, type, handler) {
		self = this;
		function dispatchEvent(event) {
			let targetElement = event.target;
			let potentialElements = self.qsa(selector, target);
			let hasMatch =
				Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		let useCapture = type === "blur" || type === "focus";

		this.$on(target, type, dispatchEvent, useCapture);
	}
	/**
	 * Reach the parent node of a given element
	 *
	 * @param {object} element Represents the element HTML tag that has been clicked from the DOM
	 * @param {string} tagName The tag name to be reach
	 * @return {object} Return the parentNode of a specific tag name (if exist).
	 */
	$parent(element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return this.$parent(element.parentNode, tagName);
	}
}

NodeList.prototype.forEach = Array.prototype.forEach;

let helpers = new Helpers();

export default helpers;
