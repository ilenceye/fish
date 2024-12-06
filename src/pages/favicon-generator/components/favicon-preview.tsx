import { useEffect, useRef } from 'react';

import CenterJS from '../lib/center.js';
import { useGlobalContext } from './context';

export default function FaviconPreview({ font }: { font: string }) {
  const context = useGlobalContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new CenterJS(canvasRef.current).generate({
        width: 48,
        height: 48,
        shape: context.shape,
        fontColor: context.color,
        backgroundColor: context.bg,
        text: context.text || ' ', // If context.text is an empty string, it will throw an error. I don't know why. But provide " " will fix the error.
        fontFamily: font,
        fontSize: 40,
      });
    }
  }, [context.shape, context.text, context.color, context.bg, font]);

  return <canvas ref={canvasRef}></canvas>;
}
