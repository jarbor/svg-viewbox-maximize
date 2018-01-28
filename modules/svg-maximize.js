
(function(root, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		/* AMD module. */
		define(['modules/verge'], function(verge) {
			return (root.SvgMaximize = factory(verge));
		});
	}
	else if (typeof module === 'object' && module.exports) {
		/* CommonJS module. */
		module.exports = (root.SvgMaximize = factory(require('verge')));
	} else {
		/* Browser globals. */
		root.SvgMaximize = factory(root.verge);
	}
}(this, function(verge) {

	class SvgMaximize {
		constructor(element) {
			this.element = element;
			
			this.original = {};
			[this.original.originX, this.original.originY, this.original.width, this.original.height] =
				this.element.getAttribute('viewBox').split(' ').map(Number);

			this.current = Object.assign({}, this.original);

			this.resize();
			window.addEventListener('resize', this.resize.bind(this));
		}

		resize() {
			let windowRatio = verge.viewportW() / verge.viewportH(); // 16/9
			let svgRatio = this.original.width / this.original.height; // 340/530

			if (windowRatio > svgRatio) { // Window wider than SVG
				this.current.width = this.original.height * windowRatio;
				this.current.originX = this.original.originX + (this.original.width - this.current.width) / 2;
			}
			else if (windowRatio < svgRatio) { // Window taller than SVG
				this.current.height = this.original.width / windowRatio;
				this.current.originY = this.original.originY + (this.original.height - this.current.height) / 2;
			}

			// Perform the resize
			this.element.setAttribute('viewBox', `${this.current.originX} ${this.current.originY} ${this.current.width} ${this.current.height}`);
		}
	}

	return SvgMaximize;
}));
