function RadialGen (size, scale, spacing, columns, rows, offset)
{
    /**
     * Private
     */
    var _radialCount = columns * rows;
    var _radialWidth = size * 2;
    var _radialHeight = size * 2;

    var _canvas;
    var _context;

    var _radials = new Array();

    function getCanvasWidth ()
    {
        return columns * (_radialWidth * scale + spacing) + spacing;
    }

    function getCanvasHeight ()
    {
        return Math.floor(_radialCount / columns) * (_radialHeight * scale + spacing) + spacing;
    }

    function initCanvas ()
    {
        _canvas = document.createElement('canvas');
        _canvas.width = getCanvasWidth();
        _canvas.height = getCanvasHeight();

        _context = _canvas.getContext('2d');
        _context.fillStyle = '#000000';
        _context.fillRect(0, 0, _canvas.width, _canvas.height);

        document.body.appendChild(_canvas);
    }

    function drawRadials (colorizer)
    {
        for (var i = 0; i < _radials.length; i++)
        {
            radial = _radials[i];

            var radialX = i % columns;
            var radialY = Math.floor(i / columns);

            _context.fillStyle = colorizer(radialX, radialY, radial.index);

            for (var ix = 0; ix < _radialWidth; ix++)
            {
                for (var iy = 0; iy < _radialHeight; iy++)
                {
                    if (radial.getPixelAt(ix, iy))
                    {
                        _context.fillRect(
                            radialX*_radialWidth*scale + radialX*spacing + ix*scale + spacing,
                            radialY*_radialHeight*scale + radialY*spacing + iy*scale + spacing,
                        scale, scale);
                    }
                }
            }
        }
    }


    /**
     * Public
     */
    this.generate = function ()
    {
        for (var i = 0; i < _radialCount; i++)
        {
            _radials.push(new Radial(size, i + offset));
        }
    }


    this.draw = function (colorizer)
    {
        initCanvas();
        drawRadials(colorizer);
    }
}