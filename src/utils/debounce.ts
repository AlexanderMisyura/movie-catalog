import type { ChangeEvent } from 'react';

export function changeEventDebounceWrapper<
  T extends (event: ChangeEvent<HTMLInputElement>) => void,
>(func: T, timeoutMs = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, timeoutMs);
  };
}
