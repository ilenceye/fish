import { useEffect, useRef, useState } from 'react';

import { useHotkeys } from '../hooks/use-hotkeys';
import { Value } from '../types';

type EditorProps = {
  value: Value;
  onChange: (value: Value) => void;
};

export default function Editor({ value, onChange }: EditorProps) {
  // ===
  // ===
  // ===
  const handleChange =
    (key: keyof Value) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...value, [key]: e.target.value });
    };

  // ===
  // ===
  // ===
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    const textareaEl = textareaRef.current;

    if (textareaEl) {
      textareaEl.setSelectionRange(selection.start, selection.end);
    }
  }, [selection]);

  // Select the word under caret
  useHotkeys(
    'ctrl+d',
    (event) => {
      const { selectionStart } = event.target as HTMLTextAreaElement;

      const before = value.body.slice(0, selectionStart).match(/\w+$/);
      const after = value.body.slice(selectionStart).match(/^\w+/);

      const start = before ? selectionStart - before[0].length : selectionStart;
      const end = after ? selectionStart + after[0].length : selectionStart;

      setSelection({ start, end });
    },
    [value.body],
    textareaRef.current,
  );

  // Insert placeholder
  useHotkeys(
    ['ctrl+0', 'ctrl+1', 'ctrl+2', 'ctrl+3'],
    (event) => {
      const { key } = event;
      const { selectionStart, selectionEnd } =
        event.target as HTMLTextAreaElement;
      const placeholder = key === '0' ? '$0' : `\${${key}:valuable}`;

      const { body } = value;
      const newBody =
        selectionStart === selectionEnd
          ? body.slice(0, selectionStart) +
            placeholder +
            body.slice(selectionStart)
          : body.slice(0, selectionStart) +
            placeholder +
            body.slice(selectionEnd);

      onChange({ ...value, body: newBody });
      setSelection({
        start: key === '0' ? 2 + selectionStart : 4 + selectionStart, // 2 => '$0'.length , 4 => '${1:'.length
        end: key === '0' ? 2 + selectionStart : 12 + selectionStart, // 2 => '$0'.length , 12 => '${1:valuable'.length
      });
    },
    [value.body],
    textareaRef.current,
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1">
        <input
          className="w-full flex-[2_2_0] p-2"
          type="text"
          placeholder="Name..."
          value={value.name}
          onChange={handleChange('name')}
        />
        <input
          className="w-full flex-[1_1_0] p-2"
          type="text"
          placeholder="Prefix..."
          value={value.prefix}
          onChange={handleChange('prefix')}
        />
      </div>
      <textarea
        className="mt-1 h-full resize-none p-2"
        placeholder="Body..."
        value={value.body}
        onChange={handleChange('body')}
        ref={textareaRef}
      ></textarea>
    </div>
  );
}
