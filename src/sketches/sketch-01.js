const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080], // 'A4', //[600, 600],
  // pixelsPerInch: 300,
  // orientation: 'landscape',
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.lineWidth = width * 0.01;

    const w = width * 0.1; // width
    const h = height * 0.1; // height
    const g = width * 0.03; // gap
    const ix = width * 0.17; // initial x
    const iy = height * 0.17; // initial y

    const off = width * 0.02; // offset

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + g) * i;
        y = iy + (h + g) * j;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
