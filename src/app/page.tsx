/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import MonacoEditor from '@/Components/Editor/MonacoEditor';
import { useState, useEffect } from 'react';

const Page = () => {
  const [value, setValue] = useState('print("Hello, World!")');
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('python');

  // Load Pyodide on mount
  useEffect(() => {
    const loadPyodide = async () => {
      setLoading(true);
      // @ts-expect-error: loadPyodide is not typed on window, but is provided by the Pyodide CDN
      const pyodideModule = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
      setPyodide(pyodideModule);
      setLoading(false);
    };
    // Only load if not already loaded
    if (!(window as any).loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      script.onload = loadPyodide;
      document.body.appendChild(script);
    } else {
      loadPyodide();
    }
  }, []);

  // Handler for running code
  const runCode = async () => {
    if (!pyodide) return;
    setOutput('');
    try {
      if (lang === 'python') {
        // @ts-expect-error: runPythonAsync is not typed on the pyodide object
        await pyodide.runPythonAsync(`import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = sys.stdout`);
        // @ts-expect-error: runPythonAsync is not typed on the pyodide object
        await pyodide.runPythonAsync(value);
        // @ts-expect-error: runPythonAsync is not typed on the pyodide object
        const result = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        setOutput(result !== undefined ? result.toString() : '');
      } else {
        setOutput('Code execution only supported for Python.');
      }
    } catch (err: unknown) {
      setOutput(String(err));
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r flex flex-col">
        <MonacoEditor value={value} setValue={setValue} lang={lang} setLang={setLang} />
        <button
          className="m-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={runCode}
          disabled={loading || lang !== 'python'}
        >
          {loading ? 'Loading Pyodide...' : 'Run'}
        </button>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="font-bold mb-2">Output:</h2>
        <pre className="bg-gray-800 p-2 rounded min-h-[100px] whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default Page;
