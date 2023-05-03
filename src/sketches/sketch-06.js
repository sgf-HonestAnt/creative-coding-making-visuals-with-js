const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048],
};

const Colors = {
  1: "#004E64",
  2: "#00A5CF",
  3: "#9FFFCB",
  4: "#25A18E",
  5: "#7AE582",
};

let text = "A";
let fontSize = 1200;
let fontFamily = "serif";
let fontWeight = "";
let fontStyle = "";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 60;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, width, height);

    fontSize = cols * 1.2;

    typeContext.fillStyle = "white";
    typeContext.font = `${fontWeight} ${fontStyle} ${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = Colors[3];

    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      //console.log(`rgba(${r}, ${g}, ${b}, ${a})`);

      context.fillStyle = Colors[2];

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      context.beginPath();
      const { fillStyle, cellSize } = getArc(r);
      context.fillStyle = fillStyle;
      if (fillStyle) context.arc(0, 0, cell * cellSize, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  };
};

function getArc(v) {
  // v is a value between 0 and 255
  let fillStyle;
  let division = 1;
  switch (true) {
    case v > 250:
      fillStyle = Colors[1];
      division = 0.9;
      break;
    case v > 200:
      fillStyle = Colors[3];
      division = 0.9;
      break;
    case v > 150:
      fillStyle = Colors[4];
      division = 0.9;
      break;
    case v > 100:
      fillStyle = Colors[5];
      division = 0.9;
      break;
    case v > 50:
      fillStyle = Colors[1];
      division = 0.9;
      break;
    case v > 0:
      fillStyle = Colors[3];
      division = 0.8;
      break;
    default:
      fillStyle = Colors[2];
      division = 0;
      break;
  }
  const cellSize = 0.5 * division;
  return { fillStyle, cellSize };
}

canvasSketch(sketch, settings);
