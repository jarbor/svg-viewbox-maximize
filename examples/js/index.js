
let $ = document.querySelector.bind(document);
let $$ = el => Array.from(document.querySelectorAll(el));

$('.stretch svg').setAttribute('preserveAspectRatio', 'none');
$('.contain svg').setAttribute('preserveAspectRatio', 'xMidYMid meet');
$('.cover svg').setAttribute('preserveAspectRatio', 'xMidYMid slice');
$('.svg-maximize svg').setAttribute('preserveAspectRatio', 'xMidYMid meet');

// Prefix SVG IDs
$$('svg').forEach((svg, index) => {
	svg.querySelectorAll('[id]').forEach(element => {
		let id = element.getAttribute('id');

		// Change the ID
		element.setAttribute('id', `${index}_${id}`);

		// Change clipping references
		svg.querySelectorAll(`[clip-path]`).forEach(clip => {
			let ref = `url(#${id})`;
			if (clip.getAttribute('clip-path') === ref) {
				clip.setAttribute('clip-path', `url(#${index}_${id})`);
			}
		});
	});
});

new SvgMaximize({
	svg: $('.svg-maximize svg'),
	resized: function() {
		let boundary = this.current;

		$$('.svg-maximize svg rect').forEach(rect => {
			rect.setAttribute('y', boundary.top);
			rect.setAttribute('x', boundary.left);
			rect.setAttribute('width', boundary.width);
			rect.setAttribute('height', boundary.height);
		});
	}
});