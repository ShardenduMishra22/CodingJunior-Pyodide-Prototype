'use client'
import { useEffect } from 'react'
import initTurtle from './turtle'

export default function TurtlePage() {
  useEffect(() => {
    initTurtle()
  }, [])

  useEffect(() => {
    import('./turtle').then((mod) => {
      if (typeof mod.default === 'function') {
        mod.default();
      }
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2 text-sm overflow-auto max-h-[90vh]">
          <h4 className="font-semibold">Language API Reference</h4>
          <code className="block whitespace-pre-wrap">
            forward(distance)
            <br />
            right(angle)
            <br />
            left(angle)
            <br />
            goto(x,y)
            <br />
            clear()
            <br />
            penup()
            <br />
            pendown()
            <br />
            reset()
            <br />
            angle(angle)
            <br />
            degToRad(angle)
            <br />
            radToDeg(angle)
            <br />
            width(width)
            <br />
            shape(shape)
            <br />
            colour(r,g,b,a)
            <br />
            color(r,g,b,a)
            <br />
            write(msg)
            <br />
            n = random(low,high)
            <br />
            hideTurtle()
            <br />
            showTurtle()
            <br />
            redrawOnMove(bool)
            <br />
            draw()
            <br />
            repeat(n, action)
            <br />
            wrap(bool)
            <br />
            animate(action,ms)
            <br />
            range(start, end, step=1)
          </code>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col items-center space-y-4">
          <h4 className="font-semibold">Canvas</h4>
          <canvas
            id="turtlecanvas"
            width="300"
            height="300"
            className="border border-red-500 bg-white"
          />
          <canvas
            id="imagecanvas"
            width="300"
            height="300"
            style={{ display: 'none' }}
          />
          <h4 className="font-semibold">Command</h4>
          <input
            id="command"
            type="text"
            placeholder="Use arrow keys to navigate history"
            autoCapitalize="off"
            className="w-72 border rounded px-2 py-1 text-black"
          />
          <div className="space-x-2">
            <button
              id="runButton"
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              Run
            </button>
            <button
              id="resetButton"
              className="px-4 py-1 bg-gray-500 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <h4 className="font-semibold">Definitions</h4>
          <textarea
            id="definitions"
            rows={30}
            defaultValue={`// Define helper functions here.
// For example:

function square(side) {
  repeat(4, function () {
    forward(side);
    right(90);
  });
}

function demo() {
  hideTurtle();
  colour(0, 0, 255, 1);
  for (let s = 100; s > 0; s -= 10) {
    square(s);
    right(36);
  }
}`}
            className="w-72 border rounded p-2 text-black"
          />
        </div>
      </div>

  )
}
