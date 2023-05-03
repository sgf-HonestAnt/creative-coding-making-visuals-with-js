import React from "react";
import Canvas from "../components/Canvas";

const settings = {
  width: 600,
  height: 600,
};


const Boxes = () => {
  const { width, height } = settings;

  const draw = (context) => {
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

  return <Canvas draw={draw} height={height} width={width} />;
}

export default Boxes;

