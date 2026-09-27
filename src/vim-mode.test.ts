import { describe, expect, test } from "bun:test";
import { applyVimMode, DEFAULT_SETTINGS } from "./vim-mode";

function fakeStore(vimMode: unknown) {
  const writes: unknown[] = [];
  return {
    writes,
    getConfig: () => vimMode,
    setConfig: (key: string, value: unknown) => {
      expect(key).toBe("vimMode");
      writes.push(value);
    },
  };
}

describe("applyVimMode", () => {
  test("defaults enable vim on desktop", () => {
    const store = fakeStore(false);
    applyVimMode(store, DEFAULT_SETTINGS, false);
    expect(store.writes).toEqual([true]);
  });

  test("defaults disable vim on mobile", () => {
    const store = fakeStore(true);
    applyVimMode(store, DEFAULT_SETTINGS, true);
    expect(store.writes).toEqual([false]);
  });

  test("honours custom settings", () => {
    const store = fakeStore(false);
    applyVimMode(store, { desktop: false, mobile: true }, true);
    expect(store.writes).toEqual([true]);
  });

  test("skips the write when already correct, avoiding sync churn", () => {
    const store = fakeStore(true);
    applyVimMode(store, DEFAULT_SETTINGS, false);
    expect(store.writes).toEqual([]);
  });
});
