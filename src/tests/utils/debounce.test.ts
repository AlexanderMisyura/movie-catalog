import { changeEventDebounceWrapper } from '@/utils/debounce';

describe('changeEventDebounceWrapper', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should call the function once after the timeout', () => {
    const TIMEOUT = 5000;
    const func = vi.fn();
    const debouncedFunc = changeEventDebounceWrapper(func, TIMEOUT);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(TIMEOUT);

    expect(func).toHaveBeenCalledTimes(1);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(TIMEOUT);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should call the function with last specified arguments', () => {
    const TIMEOUT = 5000;
    const func = vi.fn();
    const debouncedFunc = changeEventDebounceWrapper(func, TIMEOUT);

    debouncedFunc(1, 2, 3);
    debouncedFunc(4, 5, 6);
    debouncedFunc(7, 8, 9);

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(TIMEOUT);

    expect(func).toHaveBeenCalledWith(7, 8, 9);
  });
});
