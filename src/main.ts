import { Platform, Plugin } from "obsidian";
import { VimModeSettingTab } from "./settings-tab";
import {
  applyVimMode,
  DEFAULT_SETTINGS,
  type VimModeSettings,
} from "./vim-mode";

export default class VimModePerDevicePlugin extends Plugin {
  settings: VimModeSettings = { ...DEFAULT_SETTINGS };

  async onload(): Promise<void> {
    const saved = (await this.loadData()) as Partial<VimModeSettings> | null;
    this.settings = { ...DEFAULT_SETTINGS, ...saved };
    this.addSettingTab(new VimModeSettingTab(this.app, this));
    this.applyVimMode();
  }

  applyVimMode(): void {
    applyVimMode(this.app.vault, this.settings, Platform.isMobile);
  }
}
