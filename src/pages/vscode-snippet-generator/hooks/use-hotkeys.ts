import { useEffect } from 'react';

export const useHotkeys = (
  hotkey: string | string[],
  callback: (event: KeyboardEvent) => void,
  deps: unknown[],
  target: HTMLInputElement | HTMLTextAreaElement | null,
) => {
  const handler = (event: Event) => {
    if (event instanceof KeyboardEvent && isHotkey(hotkey, event)) {
      event.preventDefault();
      callback(event);
    }
  };

  useEffect(() => {
    if (!target) return;

    target.addEventListener('keydown', handler);

    return () => {
      target.removeEventListener('keydown', handler);
    };
  }, deps);
};

const isHotkey = (hotkey: string | string[], event: KeyboardEvent) => {
  if (typeof hotkey === 'string') {
    return hotkey === getHotkey(event);
  } else {
    return hotkey.includes(getHotkey(event));
  }
};

const getHotkey = (event: KeyboardEvent) => {
  const MODIFIER_KEYS = ['ctrl'];

  const hotkey = MODIFIER_KEYS.filter(
    (modifier) => event[`${modifier}Key` as keyof KeyboardEvent],
  )
    .concat(event.key)
    .join('+');

  return hotkey;
};
