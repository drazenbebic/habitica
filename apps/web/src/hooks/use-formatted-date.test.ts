import { renderHook, waitFor } from '@testing-library/react';

import { useFormattedDate } from './use-formatted-date';

describe('useFormattedDate', () => {
  // Save the original navigator to restore it later
  const originalNavigator = global.navigator;

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).navigator = originalNavigator;
  });

  it('should format date correctly using default options (en-US)', async () => {
    // Mock navigator to be en-US
    Object.defineProperty(global, 'navigator', {
      value: { language: 'en-US' },
      writable: true,
    });

    const date = new Date('2026-01-13T12:00:00Z');
    const { result } = renderHook(() => useFormattedDate(date));

    // Wait for the useEffect to fire
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Note: The actual output depends on the timezone of the test runner environment.
    // We check that it returns a non-empty string and looks generally correct.
    expect(result.current.formattedDate).not.toBe('');
    expect(result.current.formattedDate).toContain('Jan 13');
  });

  it('should format date correctly using a different locale (de-DE)', async () => {
    // Mock navigator to be German
    Object.defineProperty(global, 'navigator', {
      value: { language: 'de-DE' },
      writable: true,
    });

    const date = new Date('2026-01-13T12:00:00Z');
    const { result } = renderHook(() => useFormattedDate(date));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // In German locale, month often comes second or looks different (e.g. "13. Jan.")
    // We check for the day "13" and the German short month "Jan"
    expect(result.current.formattedDate).toContain('13');
    expect(result.current.formattedDate).toContain('Jan');
  });

  it('should accept custom Intl options', async () => {
    Object.defineProperty(global, 'navigator', {
      value: { language: 'en-US' },
      writable: true,
    });

    const date = new Date('2026-01-13T12:00:00Z');
    const customOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
    };

    const { result } = renderHook(() => useFormattedDate(date, customOptions));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.formattedDate).toContain('Tuesday');
    expect(result.current.formattedDate).toContain('2026');
  });

  it('should fallback to en-US if locale throws an error', async () => {
    // Mock navigator with an invalid language to trigger the catch block
    Object.defineProperty(global, 'navigator', {
      value: { language: 'invalid-LOCALE-123' },
      writable: true,
    });

    const date = new Date('2026-01-13T12:00:00Z');
    const { result } = renderHook(() => useFormattedDate(date));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // It should have fallen back to en-US format
    expect(result.current.formattedDate).toContain('Jan 13');
  });
});
