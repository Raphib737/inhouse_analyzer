import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#263238", contrastText: "#F5F5F5" },
  secondary: { main: "#FFD54F", contrastText: "#616161" },
};

export const THEME = createMuiTheme({ palette });
