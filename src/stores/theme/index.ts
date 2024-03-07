import { detectOS, isDesktop } from "../../utils/platform";

interface DataContextProps {
  activeTheme: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  appBackground: string;
  pageBackground: string;
  activeNavMenu: string;
}

const themes = {
  Green: {
    "50": "#f5f8f7",
    "100": "#dfe8e6",
    "200": "#bfd0cd",
    "300": "#98b0ae",
    "400": "#728f8d",
    "500": "#577572",
    "600": "#445d5b",
    "700": "#394c4a",
    "800": "#313e3d",
    "900": "#2b3635",
  },
  Blue: {
    "50": "#d4e6f4",
    "100": "#a9cee9",
    "200": "#7fa7db",
    "300": "#5480cd",
    "400": "#2e5cc0",
    "500": "#1b45a7",
    "600": "#15378a",
    "700": "#122c70",
    "800": "#0f235a",
    "900": "#0c1e4b",
  },
  Red: {
    "50": "#f9eae9",
    "100": "#f2cfcf",
    "200": "#e8a3a2",
    "300": "#dd7674",
    "400": "#d74d4b",
    "500": "#c53330",
    "600": "#ad2829",
    "700": "#962121",
    "800": "#7f1a1a",
    "900": "#6c1414",
  },
  Pink: {
    "50": "#fceef6",
    "100": "#f7cfe0",
    "200": "#f1a9ca",
    "300": "#eb82b3",
    "400": "#e55d9d",
    "500": "#da407f",
    "600": "#bd325e",
    "700": "#a62949",
    "800": "#8f2140",
    "900": "#7b1a37",
  },
  Orange: {
    "50": "#fdf2e7",
    "100": "#fbe0c5",
    "200": "#f8c79e",
    "300": "#f4ad75",
    "400": "#f19754",
    "500": "#e97b39",
    "600": "#cc652e",
    "700": "#af5327",
    "800": "#934421",
    "900": "#7a371b",
  },
  Violet: {
    "50": "#f3f0f7",
    "100": "#dfd2e1",
    "200": "#c3aac7",
    "300": "#a881ad",
    "400": "#8c5c97",
    "500": "#733f7f",
    "600": "#5c2f68",
    "700": "#4a2454",
    "800": "#3d1d45",
    "900": "#351a3a",
  },
  Gray: {
    "50": "#e1e1e1",
    "100": "#c9c9c9",
    "200": "#b0b0b0",
    "300": "#979797",
    "400": "#7f7f7f",
    "500": "#666666",
    "600": "#4d4d4d",
    "700": "#333333",
    "800": "#1a1a1a",
    "900": "#000000",
  },
};

function useTheme() {
  let activeTheme = themes.Gray;
  let appBackground = isDesktop ? `${activeTheme[100]}80` : activeTheme[50];
  let pageBackground = isDesktop ? "#ffffff" : "#ffffff60";
  let activeNavMenu = isDesktop ? "#ffffff" : activeTheme[100];
  let headerStyle = { paddingLeft: isDesktop && detectOS() === "Mac OS" ? 75 : "", paddingRight: isDesktop && detectOS() !== "Mac OS" ? 160 : "" };

  return {
    activeTheme,
    appBackground,
    pageBackground,
    activeNavMenu,
    headerStyle,
  };
}
export default useTheme;
