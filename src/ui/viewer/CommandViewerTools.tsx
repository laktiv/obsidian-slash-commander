import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { useSettingStore } from "@/data/stores/useSettingStore";
import ObsidianIcon from "@/ui/components/obsidianIconComponent";
import BindingEditorModal from "@/ui/modals/BindingEditorModal";
import ConfirmRestoreModal from "@/ui/modals/ConfirmRestoreModal";

/**
 * Render the command list tools (full version).
 * Uses Zustand store for accessing plugin and command functions.
 */
export function CommandViewerToolsBottom(): ReactElement {
    const { t } = useTranslation();
    const { plugin, addCommand, restoreDefault } = useSettingStore();

    const handleRestoreDefault = async (): Promise<void> => {
        if (plugin) {
            await new ConfirmRestoreModal(plugin, async () => {
                await restoreDefault();
            }).didChooseRestore();
        }
    };

    return (
        <div className="cmdr-viewer-tools-bottom">
            <button
                className="mod-cta"
                onClick={async (): Promise<void> => {
                    if (plugin) {
                        const command = await new BindingEditorModal(plugin).awaitSelection();
                        if (command) {
                            await addCommand(command);
                        }
                    }
                }}
            >
                {t("bindings.add")}
            </button>
            <ObsidianIcon
                className="cmdr-icon clickable-icon"
                icon="rotate-ccw"
                size="var(--icon-m)"
                aria-label={t("bindings.restore_default")}
                onClick={handleRestoreDefault}
            />
        </div>
    );
}

/**
 * Render the command list tools (short version).
 * Uses Zustand store for accessing plugin and command functions.
 * This is a more compact version used in different contexts than CommandTools.
 */
export function CommandViewerToolsBar(): ReactElement {
    const { t } = useTranslation();
    const { plugin, addCommand, restoreDefault } = useSettingStore();

    const handleRestoreDefault = async (): Promise<void> => {
        if (plugin) {
            await new ConfirmRestoreModal(plugin, async () => {
                await restoreDefault();
            }).didChooseRestore();
        }
    };

    return (
        <div className="cmdr-viewer-tools-bar">
            <ObsidianIcon
                className="cmdr-icon clickable-icon"
                icon="plus-circle"
                size="var(--icon-m)"
                aria-label={t("bindings.add")}
                onClick={async (): Promise<void> => {
                    if (plugin) {
                        const command = await new BindingEditorModal(plugin).awaitSelection();
                        if (command) {
                            await addCommand(command);
                        }
                    }
                }}
            />
            <ObsidianIcon
                className="cmdr-icon clickable-icon"
                icon="rotate-ccw"
                size="var(--icon-m)"
                aria-label={t("bindings.restore_default")}
                onClick={handleRestoreDefault}
            />
        </div>
    );
}
