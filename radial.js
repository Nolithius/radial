function Radial (size, index)
{
    /**
     * Private
     */
    var pixels = new Array();

    __construct = function ()
    {
        var totalSize = size * size;
        for (var i = 0; i < totalSize; i++)
        {
            var mask = 1 << i;
            pixels.push(index & mask);
        }
    }()


    /**
     * Public
     */
    this.getPixelAt = function(x, y)
    {
        var actualX = x;
        var actualY = y;

        // Top-left quadrant
        if (x < size && y < size)
        {
            actualX = x;
            actualY = y;
        }
        // Top-right quadrant
        else if (x >= size && y < size)
        {
            actualX = y;
            actualY = size - 1 - (x - size);
        }
        else if (x < size && y >= size)
        {
            actualX = size - 1 - (y - size);
            actualY = x;
        }
        // Bottom-right quadrant
        else if (x >= size && y >= size)
        {
            actualX = size - 1 - (x - size);
            actualY = size - 1 - (y - size);
        }

        return pixels[actualY*size + actualX];
    }

    this.index = index;
}