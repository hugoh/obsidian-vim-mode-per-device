import "obsidian";

// Undocumented but long-standing Vault methods backing the app's own settings (app.json).
declare module "obsidian" {
  interface Vault {
    getConfig(key: string): unknown;
    setConfig(key: string, value: unknown): void;
  }
}
