import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  inputLabelShrink: {
    "&.MuiInputLabel-outlined": {
      transform: `translate(14px, -4px) scale(0.75)`,
    },
  },
}));
