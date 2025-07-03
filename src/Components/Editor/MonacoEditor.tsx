'use client';

import { defineThemes } from './data/theme_loader';
import { JSX, useState } from 'react';
import Editor from '@monaco-editor/react';
import { THEME_OPTIONS } from './data/theme';
import { LANGUAGE_OPTIONS } from './data/language';

type Props = {
  value: string;
  setValue: (val: string) => void;
  lang: string;
  setLang: (lang: string) => void;
};

const MonacoEditor = ({ value, setValue, lang, setLang }: Props): JSX.Element => {
  const [theme, setTheme] = useState<string>('vs-dark');


  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex gap-4 p-2">
        <select
          className="border px-3 py-1 rounded bg-white text-black"
          value={lang}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value)}
        >
          {LANGUAGE_OPTIONS.map((l: string) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-1 rounded bg-white text-black"
          value={theme}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}
        >
          {THEME_OPTIONS.map((t: string) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <Editor
          language={lang}
          value={value}
          theme={theme}
          height="90vh"
          saveViewState
          onChange={(val) => setValue(val || '')}
          options={{
            fontSize: 14,
            
            fontLigatures: true,
            minimap: { enabled: true },
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            tabSize: 2,
            formatOnType: true,
            formatOnPaste: true,
            autoClosingBrackets: 'always',
            matchBrackets: 'always',
            contextmenu: true,
          }}
          onMount={(editor, monaco) => {
            defineThemes(monaco);
          }}

          onValidate={(markers) => console.log('Validation markers:', markers)}
        />
      </div>
    </div>
  );
};

export default MonacoEditor;
