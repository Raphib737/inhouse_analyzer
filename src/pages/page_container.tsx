import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const PageContainer = withStyles((theme) => ({
  root: {
    height: "100%",
    background: theme.palette.background.default,
  },
}))(Container);
