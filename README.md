# svg-maximize
<b>SVG Maximize</b> is a simple utility for resizing the viewBox coordinate system of inline SVGs to cover entire browser viewport.

## Why is this a problem?
Inline SVGs are a powerful native tool for imaging and animation. However, browsers and devices come in all shapes and sizes while SVGs require fixed aspect ratio coordinate systems in order for consistent rendering of the components. This leaves us with a few obvious options when scaling an image to a different aspect ratio:

1. <b>Stretch the image independently on each axis.</b> This is rarely the intended outcome as the image completely changes.
2. <b>Cover the container element, maintaining the SVG aspect ratio.</b> This often results in clipping iportant information from our SVG.
3. <b>Contain the SVG within the container element, maintaining the SVG aspect ratio.</b> This is a pretty good solution in many cases, but it can leave unwanted blank margins around the SVG.

## We can do better!
Since SVGs are image instructions rather than a rendered image, we can modify the SVG to better suit our modified aspect ratio.
