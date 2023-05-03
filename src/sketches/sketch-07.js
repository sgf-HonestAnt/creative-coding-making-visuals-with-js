const canvasSketch = require("canvas-sketch");
const load = require("load-asset");

const settings = {
  dimensions: [1080, 1080],
};

const imageCanvas = document.createElement("canvas");
const imageContext = imageCanvas.getContext("2d");

const pixelCanvas = document.createElement("canvas");
const pixelContext = pixelCanvas.getContext("2d");

const sketch = async ({ update, width, height }) => {
  const image = await load("./images/rainbow.jpg");

  update({
    dimensions: [image.width, image.height],
  });

  // get pixel data

  const cell = 5;
  const cols = Math.floor(image.width / cell);
  const rows = Math.floor(image.height / cell);
  const numCells = cols * rows;

  pixelContext.fillStyle = "black";
  pixelCanvas.width = cols;
  pixelCanvas.height = rows;

  return ({ context, width, height }) => {
    imageContext.drawImage(image, 0, 0);

    const imageData = imageContext.getImageData(0, 0, width, height); // returns height, width, data (array of pixels)
    const { data, height: ih, width: iw } = imageData;

    pixelContext.drawImage(imageCanvas, 0, 0);
    pixelContext.putImageData(imageData, 0, 0);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cell;
      const y = row * cell;
      const r = data[i * 4 + 0];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      pixelContext.save();
      pixelContext.translate(x, y);
      pixelContext.translate(cell * 0.5, cell * 0.5);
      pixelContext.beginPath();
      pixelContext.fillStyle = `rgb(${r}, ${g}, ${b})`
      pixelContext.arc(0, 0, 1.1, 0, Math.PI * 2);
      pixelContext.fill();
      pixelContext.restore();
    }

    //context.drawImage(pixelCanvas, 0, 0);
    
    context.drawImage(imageCanvas, 0, 0)
  };
};

canvasSketch(sketch, settings);
