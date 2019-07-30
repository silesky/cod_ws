var canvas = document.getElementById('app');
var canvasWidth  = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext('2d');
var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

var buf = new ArrayBuffer(imageData.data.length);
var buf8 = new Uint8ClampedArray(buf);
var data = new Uint32Array(buf);

for (var y = 0; y < canvasHeight; ++y) {
    for (var x = 0; x < canvasWidth; ++x) {
        var value = x * y & 0xff;

        data[y * canvasWidth + x] =
            (255   << 24) |    // alpha
            (value << 16) |    // blue
            (value <<  8) |    // green
             value;            // red
    }
}

imageData.data.set(buf8);

ctx.putImageData(imageData, 0, 0);
