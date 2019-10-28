/*global NodeList */
export default class Helpers {
	qs(selector, scope) {
		return (scope || document).querySelector(selector);
	}

	qsa(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	}

	$on(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	}

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
