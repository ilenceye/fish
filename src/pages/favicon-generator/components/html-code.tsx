import { useState } from 'react';

import { Check, Copy } from 'lucide-react';
import { cn } from '~/lib/cn';
import { Button } from '~/ui/button';

const code = `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">`;

export default function HTMLCode() {
  const [copied, setCopied] = useState(false);

  const writeToClipboard = async () => {
    if (copied) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="relative">
      <pre className="rounded bg-zinc-200 p-4">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className={cn('absolute right-4 top-4 size-7', copied && 'bg-accent')}
        onClick={writeToClipboard}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
}
