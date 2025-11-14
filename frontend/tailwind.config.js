/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        letteram_light: {
          "primary": "#A3B087",        // Приглушенный зеленый (для кнопок и акцентов)
          "primary-content": "#FFFFFF", // Белый текст на primary
          "secondary": "#D9CFC7",      // Серо-бежевый
          "secondary-content": "#313647", // Темный текст на secondary
          "accent": "#435663",         // Серо-синий
          "accent-content": "#FFFFFF",  // Белый текст на accent
          "neutral": "#313647",        // Темно-синий
          "neutral-content": "#EFE9E3", // Светлый текст на neutral
          "base-100": "#FFFFFF",       // Белый фон
          "base-200": "#F9F8F6",       // Очень светлый бежевый
          "base-300": "#EFE9E3",       // Светло-бежевый
          "base-content": "#313647",   // Текст темный
          "info": "#A3B087",           // Приглушенный зеленый
          "info-content": "#FFFFFF",
          "success": "#A3B087",        // Приглушенный зеленый
          "success-content": "#FFFFFF",
          "warning": "#D9CFC7",        // Серо-бежевый
          "warning-content": "#313647",
          "error": "#C9B59C",          // Светло-коричневый
          "error-content": "#313647",
        },
        letteram_dark: {
          "primary": "#A3B087",        // Приглушенный зеленый (для отправленных сообщений)
          "primary-content": "#313647", // Темный текст на primary
          "secondary": "#435663",      // Серо-синий
          "secondary-content": "#EFE9E3", // Светлый текст на secondary
          "accent": "#FFF8D4",         // Светло-желтый
          "accent-content": "#313647",  // Темный текст на accent
          "neutral": "#313647",        // Темно-синий
          "neutral-content": "#EFE9E3", // Светлый текст на neutral
          "base-100": "#313647",       // Темно-синий фон
          "base-200": "#3d4554",       // Чуть светлее
          "base-300": "#4a5263",       // Еще светлее
          "base-content": "#EFE9E3",   // Текст светлый
          "info": "#A3B087",           // Приглушенный зеленый
          "info-content": "#313647",
          "success": "#A3B087",        // Приглушенный зеленый
          "success-content": "#313647",
          "warning": "#FFF8D4",        // Светло-желтый
          "warning-content": "#313647",
          "error": "#435663",          // Серо-синий
          "error-content": "#EFE9E3",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};