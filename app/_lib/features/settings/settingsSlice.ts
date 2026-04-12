import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
   theme: "light" | "dark" | "auto";
   accent: "purple" | "green" | "blue" | "orange" | "turquoise";
   textSize: number;
   reduceMotion: boolean;
   selectMultiple: boolean;
}

const defaultSettings: SettingsState = {
   theme: "dark",
   accent: "purple",
   textSize: 16,
   reduceMotion: false,
   selectMultiple: true,
};

const loadSettingsFromStorage = (): SettingsState => {
   if (typeof window === "undefined") return defaultSettings;

   try {
      const stored = localStorage.getItem("settings");
      if (stored) {
         return { ...defaultSettings, ...JSON.parse(stored) };
      }
   } catch (e) {
      console.error("Failed to load settings from localStorage", e);
   }
   return defaultSettings;
};

const saveSettingsToStorage = (settings: SettingsState) => {
   if (typeof window === "undefined") return;

   try {
      localStorage.setItem("settings", JSON.stringify(settings));
   } catch (e) {
      console.error("Failed to save settings to localStorage", e);
   }
};

export const settingsSlice = createSlice({
   name: "settings",
   initialState: loadSettingsFromStorage(),
   reducers: {
      setSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
         return { ...state, ...action.payload };
      },
      changeTheme: (
         state,
         action: PayloadAction<"light" | "dark" | "auto">,
      ) => {
         state.theme = action.payload;
         saveSettingsToStorage(state);
      },
      changeAccent: (
         state,
         action: PayloadAction<
            "purple" | "green" | "blue" | "orange" | "turquoise"
         >,
      ) => {
         state.accent = action.payload;
         saveSettingsToStorage(state);
      },
      changeTextSize: (state, action: PayloadAction<number>) => {
         state.textSize = action.payload;
         saveSettingsToStorage(state);
      },
      changeReduceMotion: (state, action: PayloadAction<boolean>) => {
         state.reduceMotion = action.payload;
         saveSettingsToStorage(state);
      },
      changeSelectMultiple: (state, action: PayloadAction<boolean>) => {
         state.selectMultiple = action.payload;
         saveSettingsToStorage(state);
      },
      resetSettings: () => {
         saveSettingsToStorage(defaultSettings);
         return defaultSettings;
      },
   },
});

export const {
   setSettings,
   changeTheme,
   changeAccent,
   changeTextSize,
   changeReduceMotion,
   changeSelectMultiple,
   resetSettings,
} = settingsSlice.actions;

export const selectSettings = (state: { settings: SettingsState }) =>
   state.settings;
export const selectTheme = (state: { settings: SettingsState }) =>
   state.settings.theme;
export const selectAccent = (state: { settings: SettingsState }) =>
   state.settings.accent;
export const selectTextSize = (state: { settings: SettingsState }) =>
   state.settings.textSize;
export const selectReduceMotion = (state: { settings: SettingsState }) =>
   state.settings.reduceMotion;
export const selectSelectMultiple = (state: { settings: SettingsState }) =>
   state.settings.selectMultiple;

export default settingsSlice.reducer;
