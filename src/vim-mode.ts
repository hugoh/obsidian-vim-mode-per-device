export interface VimModeSettings {
  desktop: boolean;
  mobile: boolean;
}

export const DEFAULT_SETTINGS: VimModeSettings = {
  desktop: true,
  mobile: false,
};

export interface ConfigStore {
  getConfig(key: string): unknown;
  setConfig(key: string, value: unknown): void;
}

const VIM_MODE_KEY = "vimMode";

// Writing only on change keeps the shared app.json from bouncing between synced devices.
export function applyVimMode(
  store: ConfigStore,
  settings: VimModeSettings,
  isMobile: boolean,
): void {
  const wanted = isMobile ? settings.mobile : settings.desktop;
  if (store.getConfig(VIM_MODE_KEY) !== wanted) {
    store.setConfig(VIM_MODE_KEY, wanted);
  }
}
