# svg-viewbox-maximize
<b>SVG ViewBox Maximize</b> is a utility for resizing the viewbox coordinate system of an inline SVG so that it covers the entire browser viewbox (or a container element) <i>without</i> resizing the SVG's contents.

## Why is this a problem?
Inline SVGs are a powerful native tool for imaging and animation. However, browsers and devices come in all shapes and sizes while SVGs require fixed aspect ratio coordinate systems to ensure consistent rendering of the components. This leaves us with a few obvious options when scaling an image to a different aspect ratio using the `preserveAspectRatio` attribute of an SVG:

| ![Stretched SVG](examples/images/stretched-rendered.png) |
|:--:| 
| `none` - <b>Stretch the image independently on each axis.</b> This is rarely the intended outcome as the image completely changes. |

| ![Covered SVG](examples/images/covered-rendered.png) |
|:--:| 
| `xMidYMid slice` - <b>Cover the container element, maintaining the SVG aspect ratio.</b> This often results in clipping important information from our SVG. |

| ![Contained SVG](examples/images/contained-rendered.png) |
|:--:| 
| `xMidYMid meet` - <b>Contain the SVG within the container element, maintaining the SVG aspect ratio.</b> This is a pretty good solution in many cases, but it can leave unwanted blank margins around the SVG. Furthermore, since most SVGs contain a clipping mask around the viewbox, these margins aren't usable if you want to move (animate) the internal SVG elements into the blank regions. |

<i>Note: Amelia Bellamy-Royds gives a great primer on SVG scaling over at [CSS Tricks](https://css-tricks.com/scale-svg/).</i>

## We can do better!
Since SVGs are image instructions rather than a rendered image, we can modify the SVG to better suit our modified aspect ratio by scaling specific objects in the SVG differently than the SVG viewbox.

| ![Contained SVG](examples/images/resized-rendered.png) |
|:--:|
| `xMidYMid slice` is still being used here, but with the help of this library, the viewbox is resized along with the background and the clipping mask. |

### Can't individual object scaling be accomplished by nesting SVGs with different `preserveAspectRatio` settings?
Yes! If you can appropriately break apart your SVG into sub-SVGs to control the element scaling and you have no need for complex animation, then that is a preferrable approach as no JavaScript is required to perform the resizing. Again, see the [CSS Tricks primer on SVG scaling](https://css-tricks.com/scale-svg/) for more information on the nested SVG approach.

This library exists to allow you to scale the SVG viewbox while <i>selectively</i> scaling the internal SVG elements.

## Installation
```
yarn add svg-viewbox-maximize
```

### ES6
```js
import ElementCoordinates from 'svg-viewbox-maximize';
```

### CommonJS
```js
var ElementCoordinates = require('svg-viewbox-maximize');
```

### Global Script Include
```html
<script src="svg-viewbox-maximize.js">
```

## Usage
To begin using SvgViewboxMaximize, invoke the constructor with a config object containing a reference to the SVG to be managed and a callback which will update the internal elements of the SVG on resize:
```js
var svg = new SvgViewboxMaximize({
  svg: $('svg#my-svg'),
  resized: function() {
    // Resize SVG internals as desired... access updated viewbox coordinates via this.current
  }
});
```

This will cause the viewbox to be recalculated anytime the SVG element is forced to resize due to the browser viewport changing. The updated viewbox coordinates can be accessed inside the `resized` callback via `this.current` or outside the callback using the saved instance - `svg.current`.

### API
#### `new SvgViewboxMaximize({ svg, resized, container })`
Constructor - begins monitoring of SVG. Config parameters:
* [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or String `svg` - SVG element in the DOM to monitor and resize. If a String is provided, it is treated as a CSS selector which finds an element with [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).
* Function `resized` - Callback function which is invoked at page load and anytime window is resized.
* Element `container` - If provided, SVG viewbox is sized to `container` instead of itself.

#### `svg.containerRatio`
Returns the current ratio of height / width of the SVG container.

#### `svg.svgX(viewportX)`
Converts window viewport x-coordinate to SVG viewbox x-coordinate.

#### `svg.svgY(viewportY)`
Converts window viewport y-coordinate to SVG viewbox y-coordinate.

#### `svg.rectangle(element)`
For a DOM element, returns the SVG coordinate rectangle (top, bottom, left, right, height, width).
