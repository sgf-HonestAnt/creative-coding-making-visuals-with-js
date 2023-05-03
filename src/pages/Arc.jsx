import React from "react";
import Canvas from "../components/Canvas";

const settings = {
  width: 600,
  height: 600,
};

const Arc = () => {
  const { width, height } = settings;

  const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const degToRad = (degrees) => {
    return (degrees / 180) * Math.PI;
  };

  const draw = (context) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5; // center x
    const cy = height * 0.5; // center y
    let x, y;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 40;

    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(randomRange(0.1, 2), randomRange(0.2, 0.5));

      context.beginPath();
      context.rect(randomRange(0.1, 2), randomRange(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.lineWidth = randomRange(5, 20);
      context.rotate(-angle);
      context.beginPath();
      context.arc(
        0,
        0,
        radius * randomRange(0.7, 1.3),
        slice * randomRange(1, -8),
        slice * randomRange(1, 5)
      );
      context.stroke();
      context.restore();
    }
  };

  return <Canvas draw={draw} height={height} width={width} />;
};

export default Arc;
