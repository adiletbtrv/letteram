import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("letteram-theme") || "letteram_light",
  setTheme: (theme) => {
    localStorage.setItem("letteram-theme", theme);
    set({ theme });
  },
}));