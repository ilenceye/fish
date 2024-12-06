import { useState } from 'react';

export default function Preview({ snippet }: { snippet: string }) {
  const [copied, setCopied] = useState(false);

  const writeToClipboard = async () => {
    if (copied) return;

    await navigator.clipboard.writeText(snippet);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="relative h-full bg-white p-2">
      <div className="whitespace-pre-wrap">{snippet}</div>
      <button
        className="absolute bottom-1 right-1 w-32 py-2"
        type="button"
        onClick={writeToClipboard}
      >
        {copied ? 'Copied √' : 'Copy snippet'}
      </button>
    </div>
  );
}
