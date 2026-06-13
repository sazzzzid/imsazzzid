export const THEME_CHANGE_EVENT = "theme-change";

export function getStoredTheme(): "dark" | "light" | null {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

export function prefersDarkColorScheme(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveDarkMode(): boolean {
  const stored = getStoredTheme();
  if (stored) return stored === "dark";
  return prefersDarkColorScheme();
}

export function applyDarkMode(dark: boolean): void {
  document.documentElement.classList.toggle("dark", dark);
}

export function notifyThemeChange(): void {
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function subscribeToTheme(onStoreChange: () => void): () => void {
  const onThemeChange = () => onStoreChange();
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
  window.addEventListener("storage", onThemeChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
    window.removeEventListener("storage", onThemeChange);
  };
}

export function getDarkModeSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}
