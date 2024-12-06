import { useState } from 'react';

import About from './components/about';
import Editor from './components/editor';
import Footer from './components/footer';
import Preview from './components/preview';
import { toSnippet } from './lib/snippet';
import { Value } from './types';

const INITIAL_SNIPPET = toSnippet({ name: '', prefix: '', body: '' });

export default function App() {
  const [value, setValue] = useState<Value>({ name: '', prefix: '', body: '' });
  const [snippet, setSnippet] = useState(INITIAL_SNIPPET);

  const handleEditorChange = (value: Value) => {
    setValue(value);
    setSnippet(toSnippet({ ...value }));
  };

  return (
    <>
      <div className="m-auto flex min-h-screen max-w-7xl flex-col p-4">
        <header>
          <h1 className="text-lg">VSCode Snippet Generator</h1>
        </header>
        <div className="mt-4 flex flex-[1_1_0] gap-1">
          <div className="w-1/2 rounded-sm bg-gray-300 p-1">
            <Editor value={value} onChange={handleEditorChange} />
          </div>
          <div className="w-1/2 rounded-sm bg-gray-300 p-1">
            <Preview snippet={snippet} />
          </div>
        </div>
      </div>
      <div className="m-auto flex min-h-[50vh] max-w-7xl flex-col p-4">
        <About />
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
