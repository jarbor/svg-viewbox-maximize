import ElementCoordinates from 'element-coordinates';

class SvgMaximize {
	constructor(config) {
		if (typeof config.svg === 'string') {
			this.svg = document.querySelector(config.svg);
		}
		else {
			this.svg = config.svg;
		}
		this.container = config.container || this.svg;
		this.resized = config.resized;

		this.original = {};
		[this.original.left, this.original.top, this.original.width, this.original.height] =
			this.svg.getAttribute('viewBox').split(' ').map(Number);
		this.original.bottom = this.original.top + this.original.height;
		this.original.right = this.original.left + this.original.width;

		this.current = Object.assign({}, this.original);

		this.resize();
		window.addEventListener('resize', this.resize.bind(this));
	}

	resize() {
		let svgRatio = this.original.width / this.original.height;
		let containerRatio = this.containerRatio;
		
		if (containerRatio > svgRatio) { // Window wider than SVG
			this.current.width = this.original.height * containerRatio;
			this.current.left = this.original.left + (this.original.width - this.current.width) / 2;
			this.current.right = this.current.left + this.current.width;
		}
		else if (containerRatio < svgRatio) { // Window taller than SVG
			this.current.height = this.original.width / containerRatio;
			this.current.top = this.original.top + (this.original.height - this.current.height) / 2;
			this.current.bottom = this.current.top + this.current.height;
		}

		// Perform the resize
		this.svg.setAttribute('viewBox', `${this.current.left} ${this.current.top} ${this.current.width} ${this.current.height}`);

		// Perform the callback
		this.resized && this.resized.call(this);
	}

	get containerRatio() {
		return this.container.clientWidth / this.container.clientHeight;
	}

	svgX(viewportX) {
		let fractionX = viewportX / (document.body.clientWidth || document.width);
		return this.current.left + fractionX * this.current.width;
	}

	svgY(viewportY) {
		let fractionY = viewportY / (document.body.clientHeight || document.height);
		return this.current.top + fractionY * this.current.height;
	}

	rectangle(element) {
		let rectangle = new ElementCoordinates(element).paddingBox;
		return {
			top: this.svgY(rectangle.top),
			bottom: this.svgY(rectangle.bottom),
			left: this.svgX(rectangle.left),
			right: this.svgX(rectangle.right),
			height: this.svgY(rectangle.height),
			width: this.svgX(rectangle.width)
		};
	}
}

export default SvgMaximize;