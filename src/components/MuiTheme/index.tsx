import { extendTheme, ThemeOptions } from "@mui/material/styles";

// 定义主题配置
const extTheme: ThemeOptions = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "hsl(237, 45%, 40%)",
        },
        background: {
          paper: "hsl(240, 15%, 95%)",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "hsl(131, 43%, 46%)",
        },
        background: {
          paper: "hsl(210, 3%, 15%)",
        },
      },
    },
  },
});

export default extTheme;