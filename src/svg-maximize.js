import verge from 'verge';

class SvgMaximize {
	constructor(config) {
		this.element = config.element;
		this.container = config.container || config.element.parentElement;
		this.resized = config.resized;

		this.original = {};
		[this.original.left, this.original.top, this.original.width, this.original.height] =
			this.element.getAttribute('viewBox').split(' ').map(Number);
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
		this.element.setAttribute('viewBox', `${this.current.left} ${this.current.top} ${this.current.width} ${this.current.height}`);

		// Perform the callback
		this.resized && this.resized.call(this);
	}

	get containerRatio() {
		return this.container.clientWidth / this.container.clientHeight;
	}

	svgX(viewportX) {
		return this.current.left + this.containerRatio * this.current.width;
	}

	svgY(viewportY) {
		return this.current.top + this.containerRatio * this.current.height;
	}

	rectangle(element) {
		let rectangle = verge.rectangle(element);
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