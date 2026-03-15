/**
 * Check if sidebar toggle is visible in desktop layout
 * @returns {boolean} Always true for desktop layout
 */
export const isSidebarToggleVisible = (): boolean => true;

/**
 * Get the display mode label for the app rail
 * @param displayMode - The display mode ("icon_only" or "icon_with_label")
 * @returns {string} Human-readable label for the display mode
 */
export const getDisplayModeLabel = (displayMode: "icon_only" | "icon_with_label"): string => {
  return displayMode === "icon_with_label" ? "Icon with name" : "Icon only";
};

/**
 * Get workspace abbreviation from name
 * @param name - The workspace name
 * @param maxLength - Maximum length of abbreviation (default: 3)
 * @returns {string} Abbreviated workspace name in uppercase
 */
export const getWorkspaceAbbreviation = (name: string | undefined, maxLength: number = 3): string => {
  if (!name || name.length === 0) return "WS";
  return name.substring(0, maxLength).toUpperCase();
};

/**
 * Get user abbreviation from display name or email
 * @param displayName - The user's display name
 * @param email - The user's email
 * @param maxLength - Maximum length of abbreviation (default: 3)
 * @returns {string} Abbreviated user identifier in uppercase
 */
export const getUserAbbreviation = (
  displayName: string | undefined,
  email: string | undefined,
  maxLength: number = 3
): string => {
  const name = displayName || email || "U";
  return name.substring(0, maxLength).toUpperCase();
};
