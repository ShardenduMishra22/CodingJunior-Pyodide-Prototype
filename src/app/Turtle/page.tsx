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
  }, [])

  const runCommand = (cmd: string) => {
    const input = document.getElementById('command') as HTMLInputElement
    input.value = cmd
    document.getElementById('runButton')?.click()
  }

  const buttons = [
    ['forward', ['distance']],
    ['right', ['angle']],
    ['left', ['angle']],
    ['goto', ['x', 'y']],
    ['angle', ['angle']],
    ['degToRad', ['angle']],
    ['radToDeg', ['angle']],
    ['width', ['width']],
    ['shape', ['shape']],
    ['colour', ['r', 'g', 'b', 'a']],
    ['color', ['r', 'g', 'b', 'a']],
    ['write', ['msg']],
    ['random', ['low', 'high']],
    ['repeat', ['n', 'function']],
    ['animate', ['function', 'ms']],
    ['range', ['start', 'end', 'step']],
    ['wrap', ['true/false']],
    ['redrawOnMove', ['true/false']],
  ]

  const singleCommands = [
    'clear',
    'penup',
    'pendown',
    'reset',
    'hideTurtle',
    'showTurtle',
    'draw'
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2 text-sm overflow-auto max-h-[90vh]">
        <h4 className="font-semibold">Language API Reference</h4>
        {/* same code block omitted for brevity */}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <h4 className="font-semibold">Canvas</h4>
        <canvas id="turtlecanvas" width="300" height="300" className="border border-red-500 bg-white" />
        <canvas id="imagecanvas" width="300" height="300" style={{ display: 'none' }} />

        <h4 className="font-semibold">Command</h4>
        <input id="command" type="text" placeholder="Use arrow keys to navigate history" autoCapitalize="off" className="w-72 border rounded px-2 py-1 text-black" />
        <div className="space-x-2">
          <button id="runButton" className="px-4 py-1 bg-blue-500 text-white rounded">Run</button>
          <button id="resetButton" className="px-4 py-1 bg-gray-500 text-white rounded">Reset</button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-4">
          {buttons.map(([cmd, args]) => (
            <button
              key={String(cmd)}
              onClick={() => {
                const argArray = Array.isArray(args) ? args : [args];
                const values = argArray.map(a => prompt(`${cmd}(${argArray.join(', ')}): enter ${a}`) ?? '').join(', ')
                runCommand(`${cmd}(${values})`)
              }}
              className="px-2 py-1 text-xs bg-green-600 text-white rounded"
            >
              {cmd}()
            </button>
          ))}
          {singleCommands.map(cmd => (
            <button
              key={cmd}
              onClick={() => runCommand(`${cmd}()`)}
              className="px-2 py-1 text-xs bg-purple-600 text-white rounded"
            >
              {cmd}()
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Definitions</h4>
        <textarea
          id="definitions"
          rows={30}
          defaultValue={`// Define helper functions here.\n// For example:\n\nfunction square(side) {\n  repeat(4, function () {\n    forward(side);\n    right(90);\n  });\n}\n\nfunction demo() {\n  hideTurtle();\n  colour(0, 0, 255, 1);\n  for (let s = 100; s > 0; s -= 10) {\n    square(s);\n    right(36);\n  }\n}`}
          className="w-72 border rounded p-2 text-black"
        />
      </div>
    </div>
  )
}
