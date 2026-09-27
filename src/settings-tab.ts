import {
  type App,
  PluginSettingTab,
  type SettingDefinitionItem,
} from "obsidian";
import type VimModePerDevicePlugin from "./main";

export class VimModeSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private readonly plugin: VimModePerDevicePlugin,
  ) {
    super(app, plugin);
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        name: "Vim key bindings on desktop",
        desc: "Applied when Obsidian starts on macOS, Windows or Linux.",
        aliases: ["vim mode"],
        control: { type: "toggle", key: "desktop" },
      },
      {
        name: "Vim key bindings on mobile",
        desc: "Applied when Obsidian starts on a phone or tablet.",
        aliases: ["vim mode"],
        control: { type: "toggle", key: "mobile" },
      },
    ];
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    await super.setControlValue(key, value);
    this.plugin.applyVimMode();
  }
}
